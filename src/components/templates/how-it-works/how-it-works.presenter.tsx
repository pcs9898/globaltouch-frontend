import {
  AspectRatio,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  ListItem,
  Select,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Footer from "../../organisms/footer/footer";

export default function HowItWorksPresenter() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>How globalTouch works</title>
      </Head>

      {router.locale === "en" ? (
        <Flex
          w="100%"
          h={{ base: "calc(100vh - 3.5rem)", md: "calc(100vh - 5rem)" }}
          // h="calc(100vh - 10rem)"
          overflowY="auto"
          flexDir="column"
          alignItems="center"
        >
          <Box w="100%" mt={{ base: "2.5rem", md: "4rem" }}>
            <Center>
              <Heading fontSize={{ base: "2rem", md: "2.75rem" }}>
                How globalTouch Works
              </Heading>
            </Center>
            <Center mt="1rem">
              <Text color="gray" display="inline-block">
                globalTouch is the best place to fundraise for what you care
                about, whether you are an individual, group, or organization.
              </Text>
            </Center>
          </Box>

          <AspectRatio
            w="100%"
            p="1rem"
            ratio={16.35 / 9}
            mt={{ base: "2.5rem", md: "4rem" }}
          >
            <iframe
              title="video"
              src="https://www.youtube.com/embed/8EUGN4C33e8?si=z6DzXfuKdi9uyVCz"
              allowFullScreen
            />
          </AspectRatio>

          <Flex
            flexDir={{ base: "column", md: "row" }}
            w={{ base: "100%", md: "80%" }}
            gap="1rem"
            alignItems={{ md: "flex-start" }}
            mt="4rem"
            justifyContent={{ base: "flex-start", md: "space-evenly" }}
          >
            <Flex w="100%">
              <VolunteerActivismOutlinedIcon
                style={{
                  borderRadius: "0px",
                }}
              />

              <Flex flexDir="column" ml="1rem" w="100%">
                <Text
                  fontWeight="semibold"
                  fontSize={{ base: "1.125rem", md: "1.25rem" }}
                  mb="1rem"
                >
                  1. Start your fundraiser
                </Text>
                <UnorderedList>
                  <ListItem color="gray" mb="1rem">
                    {" "}
                    Set your fundraiser goal
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    Tell your story
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    Set your fundraiser goal
                  </ListItem>
                </UnorderedList>
              </Flex>
            </Flex>

            <Flex w="100%">
              <PersonAddOutlinedIcon style={{ borderRadius: "0px" }} />
              <Flex flexDir="column" ml="1rem" w="100%">
                <Text
                  fontWeight="semibold"
                  fontSize={{ base: "1.125rem", md: "1.25rem" }}
                  mb="1rem"
                >
                  2. Share with friends
                </Text>
                <UnorderedList>
                  <ListItem color="gray" mb="1rem">
                    Send emails
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    Send text messages
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    Share on social media
                  </ListItem>
                </UnorderedList>
              </Flex>
            </Flex>
            <Flex w="100%">
              <PieChartOutlineOutlinedIcon style={{ borderRadius: "0px" }} />
              <Flex flexDir="column" ml="1rem" w="100%">
                <Text
                  fontWeight="semibold"
                  fontSize={{ base: "1.125rem", md: "1.25rem" }}
                  mb="1rem"
                >
                  3. Manage donations
                </Text>

                <UnorderedList>
                  <ListItem color="gray" mb="1rem">
                    Accept donations
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    Thank donors
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    Withdraw funds
                  </ListItem>
                </UnorderedList>
              </Flex>
            </Flex>
          </Flex>
          <Box mt="4rem">
            <Footer />
          </Box>
        </Flex>
      ) : (
        <Text>kr</Text>
      )}
    </>
  );
}
