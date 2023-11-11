import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Hide,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Show,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { DarkMode, LightMode, Search } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useChangeLocale } from "../../customhooks/useChangeLocale";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import Settings from "../settings";
import CreateProjectModalPresenter from "../../templates/createProjectModal/createProjectModal.presnter";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

interface IHeaderProps {}

const localeObg = {
  en: ["🇺🇸 English", "🇰🇷 Korean"],
  ko: ["🇰🇷 한국어", "🇺🇸 영어"],
};

const colorProps = {
  colorScheme: "gray",
  variant: "ghost",
};

export default function Header({}: IHeaderProps) {
  const { t } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenPop,
    onOpen: onOpenPop,
    onClose: onClosePop,
  } = useDisclosure();
  const drawerBtnRef = useRef();
  const changeLocale = useChangeLocale(); // useChangeLocale 훅을 호출
  const [userLoggedInInfo, setUserLoggedInInfo] = useRecoilState(userState);

  const currentLocale = router.locale;

  useEffect(() => {
    const handleRouteChange = () => {
      if (isOpen) {
        onClose();
      }
      if (isOpenPop) {
        onClosePop();
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, isOpen, isOpenPop]);

  return (
    <HStack
      h={{ base: "3.5rem", md: "5rem" }}
      justifyContent="space-between"
      px={{ base: "0.5rem", md: "1rem" }}
      w="100%"
      borderRadius="0px"
    >
      {/* have to add shadow up to uri */}
      <Show above="md">
        <HStack gap={0}>
          <Button {...colorProps} as={Link} href="/search" paddingLeft={0}>
            <Box as={Search} fontWeight="semibold" mr="0.25rem" />
            {t("headerSearchBtn")}
          </Button>

          <Button {...colorProps} as={Link} href="/how-it-works">
            {t("headerHowItWorksBtn")}
          </Button>
          <Show above="56.25rem">
            <Button {...colorProps} as={Link} href="/for-charities">
              {t("headerForCharitiesBtn")}
            </Button>
          </Show>
        </HStack>
      </Show>

      <Show below="md">
        <Button p="0.5rem" variant="unstyled" as={Link} href="/search">
          <Center fontSize="1.5rem">
            <Search />
          </Center>
        </Button>
      </Show>

      <Text
        color="teal.600"
        fontWeight="bold"
        fontSize={{ base: "1.5rem", md: "1.75rem" }}
        position="absolute"
        top="50%" // centering in view
        left="50%" // centering in view
        transform="translate(-50%, -50%)" // centering in view
        zIndex="1"
        as={Link}
        href="/"
        cursor="pointer"
        display="flex"
        flexDir="row"
        gap={{ base: "0.4rem", md: "0.5rem" }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_IMAGE_URL}/logo.svg`}
          alt="logo"
          w={{ base: "0.8rem", md: "1.1rem" }}
          onClick={() => router.push("/")}
          cursor="pointer"
        />
        globalTouch
      </Text>

      <HStack gap={0}>
        {userLoggedInInfo && (
          <Box>
            <CreateProjectModalPresenter isMd={true} />
          </Box>
        )}
        <Show above="md">
          {userLoggedInInfo ? (
            <>
              <IconButton
                icon={<NotificationsNoneOutlinedIcon />}
                aria-label="notification icon"
                colorScheme="gray"
                variant="ghost"
                mr="0.5rem"
              />
              <Popover
                isOpen={isOpenPop}
                onOpen={onOpenPop}
                onClose={onClosePop}
              >
                <PopoverTrigger>
                  <Avatar
                    cursor="pointer"
                    src={userLoggedInInfo?.profile_image_url}
                    name={userLoggedInInfo.name}
                    w="2.5rem"
                    h="2.5rem"
                  />
                </PopoverTrigger>
                <PopoverContent zIndex={2}>
                  <PopoverArrow />
                  <PopoverBody p="1rem">
                    <Settings />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Menu matchWidth={true}>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      as={Button}
                      colorScheme="gray"
                      variant="ghost"
                      isActive={isOpen}
                      rightIcon={
                        isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
                      }
                    >
                      {localeObg[currentLocale][0]}
                    </MenuButton>
                    <MenuList maxW="150px" p="0.5rem">
                      <MenuOptionGroup
                        defaultValue={currentLocale}
                        type="radio"
                        p="1rem"
                      >
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
              <IconButton
                aria-label="colorMode"
                icon={colorMode === "light" ? <DarkMode /> : <LightMode />}
                onClick={toggleColorMode}
                colorScheme="gray"
                variant="ghost"
                mr="0.5rem"
              />
              <Button
                as={Link}
                href="/signIn"
                variant="solid"
                colorScheme="teal"
              >
                {t("headerSignInBtn")}
              </Button>
            </>
          )}
        </Show>
      </HStack>

      <Show below="md">
        <IconButton
          aria-label="searchIcon"
          icon={<MenuIcon />}
          variant={{ base: "unstyled", md: "ghost" }}
          colorScheme="gray"
          fontWeight="extrabold"
          ref={drawerBtnRef}
          onClick={onOpen}
        />
      </Show>

      <Drawer
        isOpen={isOpen}
        size="full"
        onClose={onClose}
        finalFocusRef={drawerBtnRef}
      >
        <DrawerOverlay />
        <DrawerContent zIndex={4}>
          <DrawerCloseButton size="lg" />
          <DrawerHeader />
          <DrawerBody>
            <Settings drawerOnClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}
