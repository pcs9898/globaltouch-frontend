import React, { useEffect, useRef, useState } from "react";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import styled from "@emotion/styled";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { IProject } from "@/src/commons/types/generated/types";
import { useRouter } from "next/router";

const countriesInfo = require("/public/countriesInfo.json");
const countriesArray: ICountriesArray[] = Object.entries(countriesInfo).map(
  ([key, value]) => ({
    country_code: key,
    // @ts-ignore
    ...value,
  })
);

interface ICountriesArray {
  country_code: string;
  korName: string;
  engName: string;
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "100vh",
  borderRadius: "0px",
};

const myStyles = [
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }, { visibility: "on" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.province",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "landscape",
    stylers: [{ color: "#CCCCCC" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.locality",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const myOptions = {
  maxZoom: 6,
  minZoom: 2.5,
  disableDefaultUI: true,
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      west: -180,
      east: 180,
    },
    strictBounds: true,
  },
};

const center = {
  lat: 37.5575,
  lng: 126.924,
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: "100%";
  height: "100vh";
`;

interface IGoogleMapProps {
  onClickCountryFlagMarker: (string) => Promise<IProject[]>;
  showProjectsList: boolean;
}

export default function GoogleMap({
  onClickCountryFlagMarker,
  showProjectsList,
}: IGoogleMapProps) {
  const googleMapRef = useRef(null);
  const markersRef = useRef({});
  const prevMarkers = useRef({});
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [newMap, setNewMap] = useState(null);
  const [activeCounty, setActiveCounty] = useState();

  // 초기 맵과 마커 설정
  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      createGoogleMap();
    });
  }, []);

  let map;

  useEffect(() => {
    if (showProjectsList && newMap) {
      // 클릭된 마커를 다시 표시
      if (activeCounty && markersRef.current[activeCounty]) {
        // @ts-ignore
        markersRef.current[activeCounty].setMap(newMap);
      }

      // 활성화된 국가 코드 초기화
      activeCountryCode = null;
      setActiveCounty(null);

      //국가 스타일 초기화
      newMap.data.setStyle({
        // fillColor: "rgba(128,128,128,0.8)", // 회색 투명도 80%
        // strokeWeight: 0,
      });

      // 맵의 중심 위치와 줌 레벨 초기화
      newMap.setZoom(5);

      // 프로젝트 마커 제거
      for (const key in prevMarkers.current) {
        if (prevMarkers.current[key]) {
          prevMarkers.current[key].setMap(null);
        }
      }
      prevMarkers.current = {};
    }
  }, [showProjectsList]);

  // 구글 맵 생성
  const createGoogleMap = async () => {
    map = new window.google.maps.Map(googleMapRef.current, {
      zoom: 5,
      ...myOptions,
      styles: myStyles,
      center: {
        lat: Number(center.lat),
        lng: Number(center.lng),
      },
      disableDefaultUI: true,
    });

    createMarker(map);
    await new Promise((resolve) =>
      map.data.loadGeoJson("/countries.geojson", {}, resolve)
    );
    setNewMap(map);

    map.data.setStyle({
      // fillColor: "transparent",
      // strokeWeight: 0,
    });
  };

  // 마커 생성
  const createMarker = async (map) => {
    // 기존 국가 마커 생성 로직
    let markersArray = [];

    countriesArray.forEach((country) => {
      let marker = new window.google.maps.Marker({
        position: { lat: Number(country.lat), lng: Number(country.lng) },
        map,
        icon: {
          url: `${
            process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL
          }/countriesFlagSvg/${country.country_code.toLowerCase()}.svg`,
          scaledSize: new window.google.maps.Size(30, 30),
        },
      });
      markersRef.current[country.country_code] = marker;

      markersRef.current[country.country_code].addListener("click", () =>
        handleMarkerClick(country.country_code)
      );

      markersArray.push(marker);
    });
    new MarkerClusterer(map, markersArray, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
  };

  // 마커 클릭 이벤트 핸들러
  let activeCountryCode;

  const handleMarkerClick = async (countryCode) => {
    const projectList = await onClickCountryFlagMarker(countryCode);

    setActiveCounty(countryCode);

    if (activeCountryCode && markersRef.current[activeCountryCode])
      markersRef.current[activeCountryCode].setMap(map);

    if (markersRef.current[countryCode])
      markersRef.current[countryCode].setMap(null);

    activeCountryCode = countryCode;

    const activeCountryName = countriesInfo[activeCountryCode].engName;

    let position = markersRef.current[countryCode].getPosition();

    // 모든 feature 스타일 초기화
    map.data.setStyle({
      fillColor: "rgba(128,128,128,0.8)", // 회색 투명도 80%
      strokeWeight: 0,
    });

    // 선택된 국가의 feature만 스타일 변경
    map.data.setStyle((feature) => {
      let countryName = feature.h.ADMIN;

      if (countryName === activeCountryName) {
        return {
          fillColor: "transparent",
          strokeWeight: 2,
        };
      } else {
        return {};
      }
    });

    map.setCenter(position);
    map.setZoom(6);

    // console.log(newMarkers);
    for (const key in prevMarkers.current) {
      if (prevMarkers.current[key]) {
        prevMarkers.current[key].setMap(null);
      }
    }
    prevMarkers.current = {};
    projectList?.forEach((project) => {
      const marker = new window.google.maps.Marker({
        position: { lat: Number(project.lat), lng: Number(project.lng) },
        map,
        // icon: {
        //   url: `/countriesFlagSvg/ac.svg`, // 프로젝트 마커로 사용할 이미지 파일의 URL을 입력하세요.
        //   scaledSize: new window.google.maps.Size(30, 30),
        // },
      });

      prevMarkers.current[project.project_id] = marker; // 생성한 마커를 prevMarkers에 저장합니다.

      prevMarkers.current[project.project_id].addListener("click", () =>
        router.push(`/project/${project.project_id}`)
      );
      // markersRef.current[country.country_code].addListener("click", () =>
      //   handleMarkerClick(country.country_code)
    });
  };

  return loading ? (
    <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
      <Spinner size="xl" colorScheme="teal" />
    </Flex>
  ) : (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{ width: "100%", height: "100%", borderRadius: "0px" }}
    />
  );
}
