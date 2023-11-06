import { useRouter } from "next/router";
import { useChangeLocale } from "../../customhooks/useChangeLocale";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  Show,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const localeObg = {
  en: ["🇺🇸 English", "🇰🇷 Korean"],
  ko: ["🇰🇷 한국어", "🇺🇸 영어"],
};

export default function FooterForStatic() {
  const router = useRouter();
  const changeLocale = useChangeLocale();
  const { t } = useTranslation();

  const [currentLocale, setCurrentLocale] = useState(router.locale);

  useEffect(() => {
    setTimeout(() => {
      setCurrentLocale(router.locale);
    }, 100);
  }, [router.locale]);

  const year = new Date().getFullYear();

  const change = (e) => {
    changeLocale(e.target.value);
  };

  return (
    <Box w="100%" mt="3rem">
      <Divider />
      <Flex
        flexDir={{ base: "column", md: "row" }}
        py="2rem"
        gap={{ base: "1.5rem", md: "0px" }}
      >
        <Text
          color="teal.600"
          fontWeight="bold"
          fontSize="1.25rem"
          w="30%"
          ml={{ base: "1rem", md: "0px" }}
        >
          globalTouch
        </Text>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="space-between"
          w="70%"
          gap={{ base: "1.5rem", md: "0px" }}
        >
          <Flex flexDir="column">
            <Text fontWeight="semibold" ml="1rem" mb="0.25rem">
              Project for
            </Text>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              Medical
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              Emergency
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              Memorial
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              Education
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              Nonprofit
            </Button>
          </Flex>
          <Flex flexDir="column">
            <Text fontWeight="semibold" ml="1rem" mb="0.25rem">
              Learn more
            </Text>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
              as={Link}
              href="/how-it-works"
            >
              {t("profilePopoverHowItWorksBtn")}
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              Why globalTouch
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
              as={Link}
              href="/for-charities"
            >
              {t("profilePopoverForCharitiesBtn")}
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              Common questions
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              Supported countries
            </Button>
          </Flex>

          <Flex flexDir="column">
            <Text fontWeight="semibold" ml="1rem" mb="0.25rem">
              Resources
            </Text>
            <Button
              as={Link}
              href="/help-center"
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("profilePopoverHelpCenterBtn")}
            </Button>
            <Button
              as={Link}
              href="/blog"
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("footerLinkBlog")}
            </Button>
            <Button
              as={Link}
              href="/jobs"
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("footerLinkJobs")}
            </Button>
            <Button
              as={Link}
              href="/about"
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("footerLinkAbout")}
            </Button>
            <Button
              as={Link}
              href="/about"
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("footerLinkTerms")}
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      <Flex justifyContent="space-between" py="2rem">
        <Flex flexDir="column" justifyContent="space-between" gap="1rem">
          <Flex gap="1rem">
            <Menu matchWidth={true}>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={Button}
                    colorScheme="gray"
                    variant="outline"
                    isActive={isOpen}
                  >
                    {localeObg[currentLocale][0]}
                  </MenuButton>
                  <MenuList maxW="150px">
                    <MenuOptionGroup defaultValue={currentLocale} type="radio">
                      <MenuItemOption
                        value={currentLocale}
                        fontWeight="semibold"
                      >
                        {localeObg[currentLocale][0]}
                      </MenuItemOption>
                      <MenuItemOption
                        value={currentLocale === "en" ? "ko" : "en"}
                        onClick={() =>
                          changeLocale(currentLocale === "en" ? "ko" : "en")
                        }
                        fontWeight="semibold"
                      >
                        {localeObg[currentLocale][1]}
                      </MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
          <Show below="md">
            <Flex flexDir="column" gap="1.5rem">
              <Flex justifyContent="space-between">
                <FacebookIcon />
                <YouTubeIcon />
                <TwitterIcon />
                <InstagramIcon />
                <WhatsAppIcon />
                <LinkedInIcon />
              </Flex>
              <Flex gap="0.25rem">
                <Image src="https://d25oniaj7o2jcw.cloudfront.net/img-play-store-v2.png" />
                <Image src="	https://d25oniaj7o2jcw.cloudfront.net/img-app-store-v2.png" />
              </Flex>
            </Flex>
          </Show>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            alignItems={{ md: "center" }}
          >
            <Text color="gray" ml={{ base: "1rem", md: "0px" }}>
              © {year} globalTouch
            </Text>
            <Button
              as={Link}
              href={"/about"}
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("footerLinkAbout")}
            </Button>
            <Button
              as={Link}
              href={"/terms"}
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("footerLinkTerms")}
            </Button>
            <Button
              as={Link}
              href={"/privacy"}
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("footerLinkPrivacy")}
            </Button>
            <Button
              as={Link}
              href={"/jobs"}
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("footerLinkJobs")}
            </Button>
            <Button
              as={Link}
              href={"/blog"}
              variant="ghost"
              colorScheme="gray"
              fontWeight="normal"
              justifyContent="flex-start"
            >
              {t("footerLinkBlog")}
            </Button>
          </Flex>
        </Flex>
        <Show above="md">
          <Flex flexDir="column" gap="1.5rem">
            <Flex justifyContent="space-between">
              <FacebookIcon />
              <YouTubeIcon />
              <TwitterIcon />
              <InstagramIcon />
              <WhatsAppIcon />
              <LinkedInIcon />
            </Flex>
            <Flex gap="0.25rem">
              <Image src="https://d25oniaj7o2jcw.cloudfront.net/img-play-store-v2.png" />
              <Image src="	https://d25oniaj7o2jcw.cloudfront.net/img-app-store-v2.png" />
            </Flex>
          </Flex>
        </Show>
      </Flex>
    </Box>
  );
}
