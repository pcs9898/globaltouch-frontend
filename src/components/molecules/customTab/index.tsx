import { Tab, TabList, TabPanel, Tabs } from "@chakra-ui/react";
import { Suspense, useEffect, useRef, useState } from "react";

import { useTranslation } from "next-i18next";
import CustomSkeleton from "../customSkeleton";

interface ICustomTabsProps {
  categoryKindOption:
    | "projectListCategory"
    | "createProjectCategory"
    | "projectCategory"
    | "searchProjectCategory"
    | "profileCategory";
  onClickTab: (tab: string) => void;
}

const engCategoryListsInfo = require("/public/locales/en/common.json");

const engCategoryListsForBe = {
  projectListCategory: Array.from(
    { length: 2 },
    (_, i) => engCategoryListsInfo[`projectListCategory${i + 1}`]
  ),
  createProjectCategory: Array.from(
    { length: 6 },
    (_, i) => engCategoryListsInfo[`createProjectCategory${i + 1}`]
  ),
  projectCategory: Array.from(
    { length: 7 },
    (_, i) => engCategoryListsInfo[`projectCategory${i + 1}`]
  ),
  searchProjectCategory: Array.from(
    { length: 3 },
    (_, i) => engCategoryListsInfo[`searchProjectCategory${i + 1}`]
  ),
  profileCategory: Array.from(
    { length: 2 },
    (_, i) => engCategoryListsInfo[`profileCategory${i + 1}`]
  ),
};

const getEngCategoryListsForBe = (categoryKindOption: string): string[] =>
  engCategoryListsForBe[categoryKindOption];

export default function CustomTab({
  categoryKindOption,
  onClickTab,
}: ICustomTabsProps) {
  const { t, ready: tReady } = useTranslation();
  const [isOverflowing, setIsOverflowing] = useState(false);
  const overflowCheckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (overflowCheckRef.current) {
        setIsOverflowing(
          overflowCheckRef.current.offsetWidth <
            overflowCheckRef.current.scrollWidth
        );
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const categoryLists = {
    projectListCategory: Array.from({ length: 3 }, (_, i) =>
      t(`projectListCategory${i + 1}`)
    ),
    createProjectCategory: Array.from({ length: 6 }, (_, i) =>
      t(`createProjectCategory${i + 1}`)
    ),
    projectCategory: Array.from({ length: 7 }, (_, i) =>
      t(`projectCategory${i + 1}`)
    ),
    searchProjectCategory: Array.from({ length: 3 }, (_, i) =>
      t(`searchProjectCategory${i + 1}`)
    ),
    profileCategory: Array.from({ length: 2 }, (_, i) =>
      t(`profileCategory${i + 1}`)
    ),
  };

  const getCategoryList = (categoryKindOption: string): string[] =>
    categoryLists[categoryKindOption];

  return (
    <Tabs
      borderRadius="0px"
      variant="solid-rounded"
      colorScheme="teal"
      width="100%"
      display="flex"
      justifyContent={
        categoryKindOption === "projectListCategory" ? "center" : "flex-start"
      }
      // horizontal scroll setting
      ref={overflowCheckRef}
      overflow="hidden"
      overflowX="scroll"
      sx={
        isOverflowing
          ? {
              "@media (max-width: 32.3125rem)": {
                "::-webkit-scrollbar": {
                  display: "none",
                },
                "::-webkit-scrollbar-thumb": {},
              },
              "@media (min-width: 32.3125rem)": {
                "&:hover": {
                  "::-webkit-scrollbar": {
                    display: "initial",
                    height: "5px",
                    borderRadius: "50px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "50px",
                  },
                },
                "::-webkit-scrollbar": {
                  display: "none",
                },
                "::-webkit-scrollbar-thumb": {},
              },
            }
          : null
      }
    >
      <TabList>
        {getEngCategoryListsForBe(categoryKindOption).map(
          (engCategoryName, i) => (
            <Tab
              key={engCategoryName}
              borderRadius="12px"
              onClick={() => onClickTab(engCategoryName)}
              sx={{ whiteSpace: "nowrap" }}
            >
              {getCategoryList(categoryKindOption)[i]}
            </Tab>
          )
        )}
      </TabList>
    </Tabs>
  );
}
