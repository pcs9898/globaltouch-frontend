import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  IconButton,
  Show,
  Spinner,
  Text,
} from "@chakra-ui/react";
import CardList from "../../organisms/cardList";
import { IProject } from "@/src/commons/types/generated/types";
import CustomTab from "../../molecules/customTab";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EndMessage from "../../molecules/infiniteScroll/endMessage";
import CustomSkeleton from "../../molecules/customSkeleton";
import CustomCard from "../../molecules/customCard";
import { useCountryCodeToLocaleCountryName } from "../../customhooks/useCountryCodeToLocaleCountryName";
import { useTranslation } from "next-i18next";
import ReactCountryFlag from "react-country-flag";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ArrowBackIos } from "@mui/icons-material";
import { useRef } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";
import styled from "@emotion/styled";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import GoogleMapMd from "../../molecules/googleMap/googleMap.md";
import GoogleMapBase from "../../molecules/googleMap/googleMap.base";

export interface IHomePresenterProps {
  cardListProps?: {
    onClickTab?: (tab: string) => void;
    loading?: boolean;
    projects?: IProject[];
    fetchMore?: () => any;
    hasMore?: boolean;
    scrollRef?: MutableRefObject<any>;
    scrollRefMobile?: MutableRefObject<any>;
  };
  showProjectsList: boolean;
}

interface ICountriesArray {
  country_code: string;
  korName: string;
  engName: string;
  lat: number;
  lng: number;
}

const CustomBackDrop = styled(Sheet.Backdrop)`
  .react-modal-sheet-backdrop {
    display: "none";
    background-color: rgba(0, 0, 0, 0);
  }
`;

export default function HomePresenter({
  cardListProps: {
    onClickTab,
    projects,
    loading,
    fetchMore,
    hasMore,
    scrollRef,
    scrollRefMobile,
  },
  showProjectsList,
}: IHomePresenterProps) {
  const [height, setHeight] = useState(0);
  const [isOpen, setOpen] = useState(true);
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  return (
    <Flex
      w="100vw"
      h={{ base: "calc(100vh - 3.5rem)", md: "calc(100vh - 5rem)" }}
      flexDir={{ base: "column", md: "row" }}
    >
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
            cardListProps={{
              projects,
              loading,
              fetchMore,
              hasMore,
              scrollRef,
            }}
          />
        </Box>
        <Box id="map" w="50%" h="100%" borderRadius="0px">
          <GoogleMapMd />
        </Box>
      </Show>

      <Show below="md">
        <Box id="map" w="100%" h="100%" borderRadius="0px">
          <GoogleMapBase sheetSnapTo={snapTo} />
        </Box>
        <Sheet
          ref={ref}
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          snapPoints={[450, 40]}
          initialSnap={0}
          style={{ zIndex: 2 }}
        >
          <Sheet.Container
            style={{
              borderRadius: "12px",
            }}
          >
            <Sheet.Header />
            <Sheet.Content>
              <Box>
                <CustomTab
                  categoryKindOption="projectListCategory"
                  onClickTab={onClickTab}
                />
              </Box>
              <Box
                mt="1rem"
                w="100%"
                overflow="auto"
                id="scrollableDiv"
                ref={scrollRefMobile}
                px="1rem"
              >
                <InfiniteScroll
                  dataLength={projects?.length ?? 0}
                  next={fetchMore}
                  hasMore={hasMore}
                  loader={<Spinner />}
                  endMessage={<EndMessage endMessageOptions="project" />}
                  scrollableTarget="scrollableDiv"
                >
                  <Box
                    display={{ base: "flex", xl: "grid" }}
                    gridTemplateColumns={{ xl: "repeat(2, 1fr)" }}
                    gap="1rem"
                    flexDirection="column"
                  >
                    {loading
                      ? Array.from({ length: 8 }, (_, i) => (
                          <CustomSkeleton key={i} skeletonType="projectCard" />
                        ))
                      : projects?.map((project) => (
                          <CustomCard
                            key={project.project_id}
                            project={project}
                          />
                        ))}
                  </Box>
                </InfiniteScroll>
              </Box>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      </Show>
    </Flex>
  );
}
