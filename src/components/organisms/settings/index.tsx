import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import {
  Box,
  Button,
  Flex,
  Show,
  Switch,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import Profile from "../../molecules/profile";
import { useTranslation } from "next-i18next";
import { useChangeLocale } from "../../customhooks/useChangeLocale";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { useApolloClient } from "@apollo/client";
import CreateProjectModalPresenter from "../../templates/createProjectModal/createProjectModal.presnter";
import { useRef } from "react";

interface ISettingsProps {
  drawerOnClose?: () => void;
}

export default function Settings({ drawerOnClose }: ISettingsProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [userLoggedInInfo, setUserLoggedInInfo] = useRecoilState(userState);
  const { t } = useTranslation();
  const changeLocale = useChangeLocale();
  const router = useRouter();
  const toast = useToast();
  const client = useApolloClient();
  const btnRef = useRef<HTMLButtonElement>();

  const onClickRouterPushNCloseDrawer = (path: string) => {
    if (drawerOnClose) {
      drawerOnClose();
    }
    router.push(path);
  };

  const onClickSignOut = () => {
    setUserLoggedInInfo(null);
    Cookie.remove("refreshToken");
    if (drawerOnClose) {
      drawerOnClose();
    }

    toast({
      status: "success",
      title: userLoggedInInfo.name + t("signOutButtonToastText"),
    });
    router.push("/");
    client.clearStore();
  };

  return (
    <VStack w="100%" gap="0.5rem" fontSize="1rem">
      <Profile
        onClickMyProfileBtn={() => onClickRouterPushNCloseDrawer("/me")}
      />

      <Show below="md">
        {userLoggedInInfo && (
          <>
            <Flex w="100%" justifyContent="flex-start" display="none">
              <CreateProjectModalPresenter
                isMd={false}
                btnRefFromParents={btnRef}
              />
            </Flex>
            <Button
              w="100%"
              fontWeight="semibold"
              variant="ghost"
              colorScheme="gray"
              p={0}
              justifyContent="flex-start"
              onClick={() => {
                btnRef?.current.click();
                // drawerOnClose();
              }}
              mt="0.5rem"
            >
              {t("headerStartANewProjectBtn")}
            </Button>
          </>
        )}
      </Show>

      <Flex
        w="100%"
        justifyContent="space-between"
        mt={{ base: !userLoggedInInfo && "0.5rem", md: "0.5rem" }}
      >
        <Flex fontWeight="semibold" alignItems="center">
          {t("settingsModalDarkMode")}
        </Flex>
        <Switch
          size="lg"
          defaultChecked={colorMode === "dark" ? true : false}
          onChange={toggleColorMode}
          colorScheme="teal"
        />
      </Flex>

      <Flex w="100%" justifyContent="space-between">
        <Flex fontWeight="semibold" alignItems="center">
          {t("settingsModalLanguage")}
        </Flex>
        <Tabs
          colorScheme="teal"
          variant="solid-rounded"
          borderRadius="0px"
          defaultIndex={router.locale === "en" ? 0 : 1}
        >
          <TabList>
            <Tab
              borderRadius="12px"
              fontWeight="semibold"
              onClick={() => changeLocale("en")}
            >
              {t("settingsModalLanguageBtn1")}
            </Tab>
            <Tab
              borderRadius="12px"
              fontWeight="semibold"
              onClick={() => changeLocale("ko")}
            >
              {t("settingsModalLanguageBtn2")}
            </Tab>
          </TabList>
        </Tabs>
      </Flex>

      <Button
        w="100%"
        fontWeight="semibold"
        variant="ghost"
        colorScheme="gray"
        p={0}
        justifyContent="flex-start"
        onClick={() => onClickRouterPushNCloseDrawer("/how-it-works")}
      >
        {t("profilePopoverHowItWorksBtn")}
      </Button>
      <Button
        w="100%"
        fontWeight="semibold"
        variant="ghost"
        colorScheme="gray"
        p={0}
        justifyContent="flex-start"
        onClick={() => onClickRouterPushNCloseDrawer("/for-charities")}
      >
        {t("profilePopoverForCharitiesBtn")}
      </Button>
      <Button
        w="100%"
        fontWeight="semibold"
        variant="ghost"
        colorScheme="gray"
        p={0}
        justifyContent="flex-start"
        onClick={() => onClickRouterPushNCloseDrawer("/help-center")}
      >
        {t("profilePopoverHelpCenterBtn")}
      </Button>

      <Button
        w="100%"
        colorScheme={userLoggedInInfo ? "red" : "teal"}
        fontWeight="semibold"
        onClick={
          userLoggedInInfo
            ? onClickSignOut
            : () => onClickRouterPushNCloseDrawer("/signIn")
        }
      >
        {t(
          `${
            userLoggedInInfo
              ? "settingsModalSignOutBtn"
              : "profilePopoverSignInBtn"
          }`
        )}
      </Button>
    </VStack>
  );
}
