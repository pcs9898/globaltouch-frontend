import { Box, Flex, Show, Spinner, Text } from "@chakra-ui/react";
import CardList from "../../organisms/cardList";
import { IProject } from "@/src/commons/types/generated/types";
import CustomTab from "../../molecules/customTab";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
  MarkerClustererF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Typography } from "@mui/material";
import { CircleFlag } from "react-circle-flags";
const countriesInfo = require("/public/countriesInfo.json");
const countriesArray: ICountriesArray[] = Object.entries(countriesInfo).map(
  ([key, value]) => ({
    country_code: key,
    // @ts-ignore
    ...value,
  })
);

export interface IHomePresenterProps {
  cardListProps: {
    onClickTab: (tab: string) => void;
    loading: boolean;
    projects: IProject[];
    fetchMore?: () => any;
    hasMore: boolean;
    scrollRef: MutableRefObject<any>;
  };
}

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

export default function HomePresenter({
  cardListProps: {
    onClickTab,
    projects,
    loading,
    fetchMore,
    hasMore,
    scrollRef,
  },
}: IHomePresenterProps) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeCountryCode, setActiveCountryCode] = useState<string | null>(
    null
  );

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleClick = ({ lat, lng, country_code }) => {
    if (activeCountryCode === country_code) {
      setActiveCountryCode(null);
    } else {
      setActiveCountryCode(country_code);
    }

    setMap((prev) => {
      if (prev) {
        prev.setCenter({ lat, lng });
        prev.setZoom(6);
      }
      return prev;
    });
  };

  return (
    <Flex>
      <Show above="md">
        <Box
          id="cardList"
          w="50%"
          shadow="base"
          borderRadius="0px"
          px="1rem"
          zIndex={1}
        >
          <CardList
            customTabProps={{
              onClickTab,
              categoryKindOption: "projectListCategory",
            }}
            cardListProps={{ projects, loading, fetchMore, hasMore, scrollRef }}
          />
        </Box>
        <Box id="map" w="50%" borderRadius="0px">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{ ...myOptions, styles: myStyles }}
            >
              <MarkerClusterer options={{ maxZoom: 5 }}>
                {(clusterer) => (
                  <>
                    {countriesArray.map(
                      (country) =>
                        country.country_code !== activeCountryCode && (
                          <MarkerF
                            key={country.country_code}
                            position={{
                              lat: Number(country.lat),
                              lng: Number(country.lng),
                            }}
                            icon={{
                              url: `/countriesFlagSvg/${country.country_code}.svg`,
                              scaledSize: new google.maps.Size(30, 30),
                            }}
                            clusterer={clusterer}
                            onClick={() =>
                              handleClick({
                                lat: Number(country.lat),
                                lng: Number(country.lng),
                                country_code: country.country_code,
                              })
                            }
                          />
                        )
                    )}
                  </>
                )}
              </MarkerClusterer>
            </GoogleMap>
          ) : (
            <Flex
              height="100%"
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner size="xl" colorScheme="teal" />
            </Flex>
          )}
        </Box>
      </Show>
    </Flex>
  );
}
