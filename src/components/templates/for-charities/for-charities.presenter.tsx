import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import FooterForStatic from "../../organisms/footerForStatic";
import { useRecoilValue } from "recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";

export default function ForCharitiesPresenter() {
  const router = useRouter();
  const user = useRecoilValue(userState);

  return (
    <>
      <Head>
        <title>For charities</title>
      </Head>

      {router.locale === "en" ? (
        <Flex
          w="100%"
          h={{ base: "calc(100vh - 3.5rem)", md: "calc(100vh - 5rem)" }}
          overflowY="auto"
          overflowX="hidden"
          flexDir="column"
          alignItems="center"
          pt="4rem"
        >
          <Flex flexDir="column">
            <Heading fontSize="2rem">
              Make a difference with fundraising for nonprofits
            </Heading>
            <Text mt="1rem" fontSize="1.5rem" color="gray">
              The fast and easy way to raise money for the nonprofits you care
              about.
            </Text>
            <Text
              color="gray"
              fontWeight="semibold"
              fontSize="0.875rem"
              mt="2rem"
            >
              START FUNDRAISING FOR YOUR FAVORITE NONPROFIT
            </Text>
            <InputGroup pointerEvents="none" mt="1rem">
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input
                placeholder="Find nonprofits by name or EIN..."
                variant="filled"
              />
            </InputGroup>
            <Flex overflow="hidden" justifyContent="space-around" mt="3rem">
              <Image
                w="4rem"
                objectFit="cover"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/acs-logo.png"
              />
              <Image
                objectFit="cover"
                w="4rem"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/HRCLogo.png"
              />
              <Image
                w="4rem"
                objectFit="cover"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/american-red-cross-logo.png"
              />
              <Image
                w="4rem"
                objectFit="cover"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/Stand_up_to_Cancer_logo.png"
              />
              <Image
                w="4rem"
                objectFit="cover"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/unicef-logo.png"
              />
            </Flex>
          </Flex>
          <Flex flexDir="column" mt="4rem" zIndex={1} justifyContent="center">
            <Heading fontSize="1.5rem">
              How to fundraise for a nonprofit on globalTouch for
            </Heading>
            <Stepper
              index={0}
              orientation="vertical"
              gap="3rem"
              mt="2rem"
              w="90%"
            >
              <Step key={0}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box h="100%" w="100%">
                  <StepTitle>
                    <Text>Choose a nonprofit</Text>
                  </StepTitle>
                  <StepDescription>
                    <Text>
                      {" "}
                      Choose from our list of registered 501(c)(3) charities.
                    </Text>
                  </StepDescription>
                </Box>

                <StepSeparator />
              </Step>
              <Step key={1}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box h="100%" w="100%">
                  <StepTitle>
                    <Text>Launch your fundraiser</Text>
                  </StepTitle>
                  <StepDescription>
                    <Text>
                      Easily share your fundraiser with friends and family to
                      raise donations.
                    </Text>
                  </StepDescription>
                </Box>

                <StepSeparator />
              </Step>
              <Step key={2}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box h="100%" w="100%">
                  <StepTitle>
                    <Text>Make a difference</Text>
                  </StepTitle>
                  <StepDescription>
                    <Text>
                      Funds are safely and automatically delivered to the
                      nonprofit.
                    </Text>
                  </StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            </Stepper>

            <Button
              p="1.5rem"
              mt="3rem"
              mb="1rem"
              fontSize="1.125rem"
              onClick={() => {
                if (user) {
                  router.push("/");
                } else {
                  router.push("/signIn");
                }
              }}
            >
              Start a nonprofit project
            </Button>
          </Flex>
          <FooterForStatic />
        </Flex>
      ) : (
        <Flex
          w="100%"
          h={{ base: "calc(100vh - 3.5rem)", md: "calc(100vh - 5rem)" }}
          overflowY="auto"
          overflowX="hidden"
          flexDir="column"
          alignItems="center"
          pt="4rem"
        >
          <Flex flexDir="column">
            <Heading fontSize="2rem">
              비영리 단체를 위한 모금 활동으로 변화를 만들어 보세요
            </Heading>
            <Text mt="1rem" fontSize="1.5rem" color="gray">
              귀하가 관심을 갖고 있는 비영리 단체를 위해 자금을 모으는 빠르고
              쉬운 방법입니다.
            </Text>
            <Text
              color="gray"
              fontWeight="semibold"
              fontSize="0.875rem"
              mt="2rem"
            >
              좋아하는 비영리 단체를 위한 모금 활동을 시작하세요
            </Text>
            <InputGroup pointerEvents="none" mt="1rem">
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input
                placeholder="이름이나 EIN으로 비영리단체를 찾아보세요..."
                variant="filled"
              />
            </InputGroup>
            <Flex overflow="hidden" justifyContent="space-around" mt="3rem">
              <Image
                w="4rem"
                objectFit="cover"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/acs-logo.png"
              />
              <Image
                objectFit="cover"
                w="4rem"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/HRCLogo.png"
              />
              <Image
                w="4rem"
                objectFit="cover"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/american-red-cross-logo.png"
              />
              <Image
                w="4rem"
                objectFit="cover"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/Stand_up_to_Cancer_logo.png"
              />
              <Image
                w="4rem"
                objectFit="cover"
                borderRadius="0px"
                src="https://d25oniaj7o2jcw.cloudfront.net/unicef-logo.png"
              />
            </Flex>
          </Flex>
          <Flex flexDir="column" mt="4rem" zIndex={1} justifyContent="center">
            <Heading fontSize="1.5rem">
              globalTouch에서 비영리 단체를 위한 모금 방법
            </Heading>
            <Stepper index={0} orientation="vertical" gap="3rem" mt="2rem">
              <Step key={0}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>비영리 단체를 선택하세요</StepTitle>
                  <StepDescription>
                    등록된 501(c)(3) 자선단체 목록에서 선택하세요.
                  </StepDescription>
                </Box>

                <StepSeparator />
              </Step>
              <Step key={1}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>모금 행사를 시작하세요</StepTitle>
                  <StepDescription>
                    기부 캠페인을 친구나 가족과 쉽게 공유하여 기부금을
                    모금하세요.
                  </StepDescription>
                </Box>

                <StepSeparator />
              </Step>
              <Step key={2}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>차이를 만드세요</StepTitle>
                  <StepDescription>
                    기금은 비영리 단체에 안전하고 자동으로 전달됩니다.
                  </StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            </Stepper>

            <Button
              p="1.5rem"
              mt="3rem"
              mb="1rem"
              fontSize="1.125rem"
              onClick={() => {
                if (user) {
                  router.push("/");
                } else {
                  router.push("/signIn");
                }
              }}
            >
              비영리 모금 행사를 시작하세요.
            </Button>
          </Flex>
          <FooterForStatic />
        </Flex>
      )}
    </>
  );
}
