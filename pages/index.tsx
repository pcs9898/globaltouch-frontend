import {
  Flex,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  IconButton,
  Button,
  Heading,
  Switch,
  useColorMode,
  Box,
  MenuItem,
  Card,
} from "@chakra-ui/react";
import Head from "next/head";

import { withTranslations } from "@/src/commons/utils/withTranslations";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import CardList from "@/src/components/organisms/cardList";
import CustomModal from "@/src/components/organisms/customModal";
import { useTranslation } from "next-i18next";
import LoremIpsum from "react-lorem-ipsum";
import { ArrowBackIosNew } from "@mui/icons-material";
import Header from "@/src/components/organisms/header";
import CustomCard from "@/src/components/molecules/customCard";

const cardListTestData = {
  total: 6,
  projects: [
    {
      amount_raised: 500,
      amount_required: 1500,
      countryCode: {
        country_code: "KR",
      },
      project_id: "apdsa09u02933",
      project_image_url:
        "https://images.unsplash.com/photo-1658932447761-8a59cd02d201?auto=format&fit=crop&q=80&w=880&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "helloajdie",
    },
    {
      amount_raised: 500,
      amount_required: 1500,
      countryCode: {
        country_code: "KR",
      },
      project_id: "apdsa09u02933",
      project_image_url: "oainfodiafoi@fgaga.com",
      title: "helloajdie",
    },
    {
      amount_raised: 500,
      amount_required: 1500,
      countryCode: {
        country_code: "KR",
      },
      project_id: "apdsa09u02933",
      project_image_url: "oainfodiafoi@fgaga.com",
      title: "helloajdie",
    },
    {
      amount_raised: 500,
      amount_required: 1500,
      countryCode: {
        country_code: "KR",
      },
      project_id: "apdsa09u02933",
      project_image_url: "oainfodiafoi@fgaga.com",
      title: "helloajdie",
    },
    {
      amount_raised: 500,
      amount_required: 1500,
      countryCode: {
        country_code: "KR",
      },
      project_id: "apdsa09u02933",
      project_image_url: "oainfodiafoi@fgaga.com",
      title: "helloajdie",
    },
    {
      amount_raised: 500,
      amount_required: 1500,
      countryCode: {
        country_code: "KR",
      },
      project_id: "apdsa09u02933",
      project_image_url: "oainfodiafoi@fgaga.com",
      title: "helloajdie",
    },
  ],
};
const testData2 = {
  amount_raised: 500,
  amount_required: 1500,
  countryCode: {
    country_code: "KR",
  },
  project_id: "apdsa09u02933",
  project_image_url:
    "https://images.unsplash.com/photo-1658932447761-8a59cd02d201?auto=format&fit=crop&q=80&w=880&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "helloajdie",
};

const onClickTab = (data) => {
  console.log(data);
};

const onSubmit = (data) => {
  console.log(data);
};

export const getStaticProps = withTranslations();

export default function HomePage({ onClose }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();

  const changeLocale = (locale) => {
    // Save the selected locale in a cookie
    Cookies.set("locale", locale);
    // Redirect to the current page with new locale
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <CustomCard projectData={testData2} />
    </>
  );
}
