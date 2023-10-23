import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Hide,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
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
import { useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

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
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBtnRef = useRef();

  const currentLocale = i18n.language;

  const changeLocale = (locale) => {
    Cookies.set("locale", locale);

    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <HStack
      h={{ base: "3.5rem", md: "5rem" }}
      justifyContent="space-between"
      px="0.5rem"
      w="100%"
    >
      {/* have to add shadow up to uri */}
      <Show above="md">
        <HStack gap={0}>
          <Button {...colorProps} as={Link} href="/search" paddingLeft={0}>
            <Box as={Search} fontWeight="semibold" mr="0.25rem" />
            {t("headerSearchBtn")}
          </Button>
          <Button {...colorProps} as={Link} href="how-it-works">
            {t("headerHowItWorksBtn")}
          </Button>
          <Show above="56.25rem">
            <Button {...colorProps} as={Link} href="for-charities">
              {t("headerForCharitiesBtn")}
            </Button>
          </Show>
        </HStack>
      </Show>

      <Show below="md">
        <IconButton
          aria-label="searchIcon"
          icon={<Search />}
          as={Link}
          href="/search"
          variant="ghost"
          colorScheme="gray"
          fontWeight="extrabold"
        />
      </Show>

      <Text
        color="teal.600"
        fontWeight="bold"
        fontSize={{ base: "1.5rem", md: "1.75rem" }}
        position="absolute"
        left={["50%", null, null, null]} // Centering in mobile view
        transform={["translateX(-50%)", null, null, null]} // Centering in mobile view
        zIndex="1"
        as={Link}
        href="/me"
        cursor="pointer"
      >
        globalTouch
      </Text>

      <Show above="md">
        <HStack gap={0}>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={Button}
                  colorScheme="gray"
                  variant="ghost"
                  isActive={isOpen}
                  rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                >
                  {localeObg[currentLocale][0]}
                </MenuButton>
                <MenuList>
                  <MenuOptionGroup defaultValue={currentLocale} type="radio">
                    <MenuItemOption value={currentLocale} fontWeight="semibold">
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
          <Button as={Link} href="/signIn" variant="solid" colorScheme="teal">
            {t("headerSignInBtn")}
          </Button>
        </HStack>
      </Show>

      <Show below="md">
        <IconButton
          aria-label="searchIcon"
          icon={<MenuIcon />}
          variant="ghost"
          colorScheme="gray"
          fontWeight="extrabold"
          ref={drawerBtnRef}
          onClick={onOpen}
        />
      </Show>

      <Drawer
        isOpen={isOpen}
        // placement="end"
        size="full"
        onClose={onClose}
        finalFocusRef={drawerBtnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          {/* navDrawer넣기 */}
        </DrawerContent>
      </Drawer>
    </HStack>
  );
}
