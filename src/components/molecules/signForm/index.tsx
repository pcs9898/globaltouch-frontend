import { ICreateUserDto, ILoginDto } from "@/src/commons/types/generated/types";
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
  // updateCountryCodeSchema,
} from "./signForm.yupSchemas";

interface ISignForm {
  onSignInSubmit?: (data: ILoginDto) => void;
  onSignUpSubmit?: (data: ICreateUserDto) => void;
  onSignGoogle: () => void;
  isBtnLoading: boolean;
}

export default function SignForm({
  onSignInSubmit,
  onSignUpSubmit,
  onSignGoogle,
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
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(onSignInSubmit ? signInSchema : signUpSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    if (onSignInSubmit) {
      onSignInSubmit(data);
    } else {
      onSignUpSubmit(data);
    }
    reset();
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="0.75rem">
        {onSignUpSubmit && (
          // @ts-ignore
          <FormControl isInvalid={!!errors.name}>
            {/* @ts-ignore */}
            <Input
              placeholder={t("signUpFormName")}
              // @ts-ignore
              {...register("name")}
              variant="filled"
            />
            {/* @ts-ignore */}
            <FormErrorMessage>{String(errors.name?.message)}</FormErrorMessage>
          </FormControl>
        )}

        <FormControl isInvalid={!!errors.email}>
          <Input
            placeholder={t("signInFormEmail")}
            {...register("email")}
            variant="filled"
          />
          <FormErrorMessage>{String(errors.email?.message)}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <InputGroup size="md">
            <Input
              placeholder={t("signInFormPassword")}
              type={showPassword ? "text" : "password"}
              {...register("password")}
              variant="filled"
            />
            {watch("password") && (
              <InputRightElement
                onClick={handleClickShowPassword}
                w={i18n.language === "ko" && !showPassword ? "7rem" : "4.5rem"}
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

        <Divider />

        <Button
          isLoading={isBtnLoading}
          leftIcon={<FcGoogle />}
          variant="outline"
          textColor={textColor}
          w="100%"
          onClick={onSignGoogle}
        >
          {t("continueWithGoogleBtn")}
        </Button>

        <Flex width="100%" gap="0.5rem">
          <Text fontWeight="medium">
            {t(
              `${onSignInSubmit ? "signInFormSubText1" : "signUpFormSubText1"}`
            )}
          </Text>

          <Link
            color="teal"
            fontWeight="medium"
            as={NextLink}
            href={onSignInSubmit ? "/signUp" : "/signIn"}
          >
            {t(
              `${onSignInSubmit ? "signInFormSubText2" : "signUpFormSubText2"}`
            )}
          </Link>
        </Flex>
      </VStack>
    </form>
  );
}
