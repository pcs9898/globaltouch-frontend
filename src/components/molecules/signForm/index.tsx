import {
  ICreateUserDto,
  ILoginDto,
  IUpdateCountryCodeDto,
} from "@/src/commons/types/generated/types";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  signInSchema,
  signUpSchema,
  updateCountryCodeSchema,
} from "./signForm.yupSchemas";

interface ISignForm {
  onSignInSubmit?: (data: ILoginDto) => void;
  onSignUpSubmit?: (data: ICreateUserDto) => void;
  onUpdateCountryCodeSubmit?: (data: IUpdateCountryCodeDto) => void;
  isBtnLoading: boolean;
}

const countriesInfo = require("/public/countriesInfo.json");

export default function SignForm({
  onSignInSubmit,
  onSignUpSubmit,
  onUpdateCountryCodeSubmit,
  isBtnLoading,
}: ISignForm) {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const textColor = useColorModeValue("black", "white");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(
      (onSignInSubmit
        ? signInSchema
        : onSignUpSubmit
        ? signUpSchema
        : onUpdateCountryCodeSubmit
        ? updateCountryCodeSchema
        : undefined) as any
    ),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    if (onSignInSubmit) {
      onSignInSubmit(data);
    } else if (onSignUpSubmit) {
      onSignUpSubmit(data);
    } else {
      onUpdateCountryCodeSubmit(data);
    }
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="0.75rem">
        {onSignUpSubmit && (
          <FormControl isInvalid={!!errors.name}>
            <Input placeholder={t("signUpFormName")} {...register("name")} />
            <FormErrorMessage>{String(errors.name?.message)}</FormErrorMessage>
          </FormControl>
        )}

        {(onSignUpSubmit ?? onSignInSubmit) && (
          <FormControl isInvalid={!!errors.email}>
            <Input placeholder={t("signInFormEmail")} {...register("email")} />
            <FormErrorMessage>{String(errors.email?.message)}</FormErrorMessage>
          </FormControl>
        )}

        {(onSignUpSubmit ?? onUpdateCountryCodeSubmit) && (
          <FormControl isInvalid={!!errors.country_code}>
            <Select
              placeholder={t("signUpFormCountry")}
              variant="outline"
              textColor="gray"
              {...register("country_code")}
            >
              {Object.entries(countriesInfo).map(([key, value]: any) => (
                <option value={key} key={key}>
                  {value.engName}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {String(errors.country_code?.message)}
            </FormErrorMessage>
          </FormControl>
        )}

        {(onSignUpSubmit ?? onSignInSubmit) && (
          <FormControl isInvalid={!!errors.password}>
            <InputGroup size="md">
              <Input
                placeholder={t("signInFormPassword")}
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              {watch("password") && (
                <InputRightElement
                  onClick={handleClickShowPassword}
                  w={
                    i18n.language === "ko" && !showPassword ? "7rem" : "4.5rem"
                  }
                >
                  <Button h="1.75rem" size="sm" fontWeight="medium">
                    {showPassword
                      ? t("signInFormPasswordHideBtn")
                      : t("signInFormPasswordShowBtn")}
                  </Button>
                </InputRightElement>
              )}
            </InputGroup>
            <FormErrorMessage>
              {String(errors.password?.message)}
            </FormErrorMessage>
          </FormControl>
        )}

        {onUpdateCountryCodeSubmit && <Divider />}

        <Button
          w="100%"
          type="submit"
          isLoading={isBtnLoading}
          isDisabled={!isValid}
        >
          {t(
            `${!onSignInSubmit ? "signUpFormSignUpBtn" : "signInFormSignInBtn"}`
          )}
        </Button>

        {(onSignUpSubmit ?? onSignInSubmit) && <Divider />}

        {(onSignUpSubmit ?? onSignInSubmit) && (
          <Button
            isLoading={isBtnLoading}
            leftIcon={<FcGoogle />}
            variant="outline"
            textColor={textColor}
            w="100%"
          >
            {t("continueWithGoogleBtn")}
          </Button>
        )}

        {(onSignUpSubmit ?? onSignInSubmit) && (
          <Flex width="100%" gap="0.5rem">
            <Text fontWeight="medium">
              {t(
                `${
                  onSignInSubmit ? "signInFormSubText1" : "signUpFormSubText1"
                }`
              )}
            </Text>

            <Link
              color="teal"
              fontWeight="medium"
              as={NextLink}
              href={onSignInSubmit ? "/signUp" : "/signIn"}
            >
              {t(
                `${
                  onSignInSubmit ? "signInFormSubText2" : "signUpFormSubText2"
                }`
              )}
            </Link>
          </Flex>
        )}
      </VStack>
    </form>
  );
}
