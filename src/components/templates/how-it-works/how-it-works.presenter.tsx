import {
  AspectRatio,
  Box,
  Button,
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
import FooterForStatic from "../../organisms/footerForStatic";
import { useRecoilValue } from "recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";

export default function HowItWorksPresenter() {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useRecoilValue(userState);

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

          <Button
            my="3rem"
            p="1.5rem"
            fontSize="1.125rem"
            onClick={() => {
              if (user) {
                router.push("/");
              } else {
                router.push("/signIn");
              }
            }}
          >
            Start a globalTouch
          </Button>

          <FooterForStatic />
        </Flex>
      ) : (
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
                globalTouch 작동 방식
              </Heading>
            </Center>
            <Center mt="1rem">
              <Text color="gray" display="inline-block">
                globalTouch는 귀하가 개인이든, 그룹이든, 조직이든 관계없이
                귀하가 관심을 갖고 있는 것에 대한 기금을 모금할 수 있는 최고의
                장소입니다.
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
                  1. 모금 프로젝트를 시작하세요
                </Text>
                <UnorderedList>
                  <ListItem color="gray" mb="1rem">
                    {" "}
                    모금 목표 설정
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    당신의 이야기를 들려주세요
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    사진이나 비디오 추가
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
                  2. 친구들과 공유
                </Text>
                <UnorderedList>
                  <ListItem color="gray" mb="1rem">
                    이메일 보내기
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    문자 메시지 보내기
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    소셜 미디어에 공유
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
                  3. 기부금 관리
                </Text>

                <UnorderedList>
                  <ListItem color="gray" mb="1rem">
                    기부 수락
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    기부자에게 감사를 표하세요
                  </ListItem>
                  <ListItem color="gray" mb="1rem">
                    자금 인출
                  </ListItem>
                </UnorderedList>
              </Flex>
            </Flex>
          </Flex>

          <Button
            my="3rem"
            p="1.5rem"
            fontSize="1.125rem"
            onClick={() => {
              if (user) {
                router.push("/");
              } else {
                router.push("/signIn");
              }
            }}
          >
            globalTouch를 시작하세요
          </Button>
          <FooterForStatic />
        </Flex>
      )}
    </>
  );
}
