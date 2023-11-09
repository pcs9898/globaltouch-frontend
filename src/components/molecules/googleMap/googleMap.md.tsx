import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
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
import { myStyles } from "./googleMap.styles";
import { FETCH_MARKERS } from "./googleMap.queries";
import { IHoveredMarker } from "./googleMap.interface";
import OverlayMdMapCard from "../overlayMdMapCard";
import PulseLoader from "react-spinners/PulseLoader";
import { debounce } from "lodash";
import MapMarkerLoader from "../mapMarkerLoader";

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
  const [hoveredMarker, setHoveredMarker] = useState<IHoveredMarker>();
  const [zoom, setZoom] = useState(10);
  const [markerLoadingVisible, setMarkerLoadingVisible] = useState(false);

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
        // 새로운 마커만 추가
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

  const handleLoad = (map) => {
    mapRef.current = map; // 지도 인스턴스 저장
  };

  useEffect(() => {
    if (!markerLoading) {
      const timer = setTimeout(() => {
        setMarkerLoadingVisible(false);
      }, 750); // 1초 후에 로딩 상태 종료

      return () => clearTimeout(timer); // 컴포넌트 unmount 시 타이머 제거
    }
  }, [markerLoading]);

  const handleBoundsChanged = () => {
    setMarkerLoadingVisible(true);

    const bounds2 = mapRef.current.getBounds().toJSON();

    const expandedBounds = {
      east: bounds2.east + 5,
      north: bounds2.north + 5,
      south: bounds2.south - 5,
      west: bounds2.west - 5,
    };

    setBounds(expandedBounds);
  };

  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      if (newZoom === 4) {
        setHoveredMarker(null);
      }
      setZoom(newZoom);
    }
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
      zoom={6}
      options={{
        styles: myStyles,

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
      onClick={() => setHoveredMarker(null)}
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
                    hoveredMarker?.project.project_id === marker.project_id
                  }`}
                  position={position}
                  icon={
                    hoveredMarker?.project.project_id === marker.project_id
                      ? selectedIcon
                      : basicIcon
                  } // 텍스트를 원하는 값으로 교체하세요.
                  clusterer={clusterer}
                  onMouseOver={() => {
                    setHoveredMarker({ project: marker, position });
                  }}
                />
              );
            })}
          </>
        )}
      </MarkerClustererF>
      {hoveredMarker && (
        <OverlayViewF
          position={{
            lat: hoveredMarker.position.lat,
            lng: hoveredMarker.position.lng,
          }}
          mapPaneName="floatPane"
        >
          <OverlayMdMapCard
            //@ts-ignore
            project={hoveredMarker.project}
          />
        </OverlayViewF>
      )}
    </GoogleMap>
  );
}
