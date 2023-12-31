import { Box, Flex, Spinner, useColorMode, useToast } from "@chakra-ui/react";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  MarkerClustererF,
  OverlayViewF,
} from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  IProject,
  IQuery,
  IQueryFetchMarkersArgs,
} from "@/src/commons/types/generated/types";
import { myDarkThemeStyles, myLightThemeStyles } from "./googleMap.styles";
import { FETCH_MARKERS } from "./googleMap.queries";
import { ISelectedMarker } from "./googleMap.interface";
import MapCard from "../../molecules/mapCard";
import MapMarkerLoader from "../../molecules/mapMarkerLoader";
import { debounce } from "lodash";
import { useRecoilState } from "recoil";
import { exSelectedMarkerState } from "@/src/commons/libraries/recoil/home.recoil";

const markerIconUrls = {
  Medical: `${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL}/markerIcon/medical.png`,
  Emergency: `${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL}/markerIcon/emergencyNCrisisRelief.png`,
  Memorial: `${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL}/markerIcon/memorial.png`,
  Education: `${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL}/markerIcon/education.png`,
  "Crisis Relief": `${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL}/markerIcon/emergencyNCrisisRelief.png`,
  Nonprofit: `${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL}/markerIcon/nonprofit.png`,
  Selected: `${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL}/markerIcon/selectedIcon.png`,
};

export default function GoogleMapMd() {
  const toast = useToast();
  const mapRef = useRef(null);
  const [bounds, setBounds] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [markers, setMarkers] = useState<IProject[]>();
  const [selectedMarker, setSelectedMarker] = useState<ISelectedMarker>();
  const [zoom, setZoom] = useState(6);
  const [markerLoadingVisible, setMarkerLoadingVisible] = useState(false);
  const { colorMode } = useColorMode();
  const [exSelectedMarker, setExSelectedMarker] = useRecoilState(
    exSelectedMarkerState
  );
  const {
    data,
    loading: markerLoading,
    error,
  } = useQuery<Pick<IQuery, "fetchMarkers">, IQueryFetchMarkersArgs>(
    FETCH_MARKERS,
    {
      variables: {
        east: bounds?.east,
        north: bounds?.north,
        south: bounds?.south,
        west: bounds?.west,
      },
    }
  );

  useEffect(() => {
    if (data) {
      setMarkers((prevMarkers) => {
        if (!Array.isArray(prevMarkers)) {
          prevMarkers = [];
        }

        const newMarkers = data.fetchMarkers.filter(
          (marker) =>
            !prevMarkers.find((m) => m.project_id === marker.project_id)
        );
        if (!prevMarkers) {
          return newMarkers;
        }

        return [...prevMarkers, ...newMarkers];
      });
    }
  }, [data]);

  useEffect(() => {
    if (!markerLoading) {
      const timer = setTimeout(() => {
        setMarkerLoadingVisible(false);
      }, 750); // 1초 후에 로딩 상태 종료

      return () => clearTimeout(timer); // 컴포넌트 unmount 시 타이머 제거
    }
  }, [markerLoading]);

  useEffect(() => {
    if (exSelectedMarker) {
      handleMarkerClick({ ...exSelectedMarker });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          // 위치 정보를 가져오는 데 실패했을 때의 처리
          console.error("Error getting geolocation", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleLoad = (map) => {
    mapRef.current = map; // 지도 인스턴스 저장
  };

  const handleBoundsChanged = debounce(() => {
    setMarkerLoadingVisible(true);

    const bounds2 = mapRef.current.getBounds().toJSON();

    const expandedBounds = {
      east: bounds2.east + 5,
      north: bounds2.north + 5,
      south: bounds2.south - 5,
      west: bounds2.west - 5,
    };

    setBounds(expandedBounds);
  }, 300);

  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      if (newZoom === 4) {
        setSelectedMarker(null);
      }
      setZoom(newZoom);
    }
  };

  const handleMarkerClick = ({ project, position }) => {
    setSelectedMarker({ project: project, position });

    if (window.innerWidth <= 1000) {
      setCenter({ ...position, lng: position.lng + 1.9 });
    } else {
      setCenter(position);
    }
    setZoom(6);
  };

  if (loadError) {
    toast({
      status: "error",
      title: "Error occur when loading map",
    });

    return (
      <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
        <Spinner size="xl" colorScheme="teal" />
      </Flex>
    );
  }

  return !isLoaded ? (
    <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
      <Spinner size="xl" colorScheme="teal" />
    </Flex>
  ) : (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
        borderRadius: "0px",
        position: "relative",
      }}
      center={center}
      zoom={zoom}
      options={{
        styles: colorMode === "light" ? myLightThemeStyles : myDarkThemeStyles,
        gestureHandling: "greedy",
        restriction: {
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
          strictBounds: true,
        },
        minZoom: 3, // 최소 줌 레벨 설정
        maxZoom: 6,
        disableDefaultUI: true,
        keyboardShortcuts: false,
      }}
      onLoad={handleLoad} // 지도가 로드되었을 때의 이벤트 핸들러
      onBoundsChanged={handleBoundsChanged}
      onZoomChanged={handleZoomChanged}
      onClick={() => setSelectedMarker(null)}
    >
      {markerLoadingVisible && <MapMarkerLoader />}
      <MarkerClustererF
        options={{
          imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
          maxZoom: 4,
        }}
      >
        {(clusterer) => (
          <>
            {markers?.map((marker: IProject, index) => {
              const str = marker.location;
              const coordinates = str.slice(6, -1).split(" ");
              const lat = parseFloat(coordinates[0]);
              const lng = parseFloat(coordinates[1]);
              const position = { lat, lng };

              const basicIcon = {
                url: markerIconUrls[marker.projectCategory.project_category],
                scaledSize: new window.google.maps.Size(30, 40), // 기본 크기
              };

              const selectedIcon = {
                url: markerIconUrls["Selected"],
                scaledSize: new window.google.maps.Size(35, 50), // 기본 크기
              };

              return (
                <MarkerF
                  key={`${marker.project_id}-${
                    selectedMarker?.project.project_id === marker.project_id
                  }`}
                  position={position}
                  icon={
                    selectedMarker?.project.project_id === marker.project_id
                      ? selectedIcon
                      : basicIcon
                  } // 텍스트를 원하는 값으로 교체하세요.
                  clusterer={clusterer}
                  onClick={() =>
                    handleMarkerClick({ project: marker, position })
                  }
                />
              );
            })}
          </>
        )}
      </MarkerClustererF>
      {selectedMarker && (
        <OverlayViewF
          position={{
            lat: selectedMarker.position.lat,
            lng: selectedMarker.position.lng,
          }}
          mapPaneName="floatPane"
        >
          <MapCard
            project={selectedMarker.project}
            position={selectedMarker.position}
            isMd={true}
          />
        </OverlayViewF>
      )}
    </GoogleMap>
  );
}
