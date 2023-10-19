import CustomCard from "@/src/components/molecules/customCard";
import DonationCard from "@/src/components/molecules/customCard";
import CustomSkeleton from "@/src/components/molecules/customSkeleton";
import CustomTab from "@/src/components/molecules/customTab";
import Profile from "@/src/components/molecules/profile";
import SignForm from "@/src/components/molecules/signForm";
import SignGreetingSection from "@/src/components/molecules/signGreetingSection";

import { Flex, Stack, Progress, Box, Skeleton } from "@chakra-ui/react";
import Head from "next/head";
import { CircleFlag } from "react-circle-flags";

const testData = {
  email: "afinaosdo@ndoaida.cpm",
  name: "ihanssooo",
  profile_image_url: "",
  countryCode: {
    country_code: "US",
  },
};
const testData2 = {
  project_id: "193871h391r3",
  title: "hirooo jp",
  amount_raised: 5000,
  amount_required: 17000,
  countryCode: {
    country_code: "KR",
  },
  projectImages: {
    image_url:
      "https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
};

const onClickTab = () => {
  console.log("hi");
};

const onSubmit = (data) => {
  console.log(data);
};

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Flex
        margin="16px 16px "
        height="calc(100vh - 32px)"
        flexDir={{ base: "column", md: "row" }}
        gap="2rem"
        justifyContent="center"
      >
        <SignGreetingSection signGreetingSectionOption="updateCountryCode" />
        <SignForm isBtnLoading={false} onSignInSubmit={onSubmit} />
      </Flex>
    </>
  );
}
