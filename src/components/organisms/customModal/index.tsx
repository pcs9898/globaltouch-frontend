import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Show,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIosNew, Close } from "@mui/icons-material";
import { useRouter } from "next/router";
import { ReactNode, cloneElement, useEffect, useRef } from "react";

interface ICustomModalProps {
  children: ReactNode;
  modalTxtBtnTxt?: string;
  modalBtnTxt?: string;
  modalHeaderTxt: string;
  modalHeaderBtn?: ReactNode;
  onClickModalHeaderBtn?: any;
  isMd?: boolean;
  isOnClickModalHeaderBtnValid?: boolean;
  isLoading?: boolean;
  isTealColorBtn?: boolean;
  closeModalBoolean?: boolean;
  isBoth?: boolean;
  isHide?: boolean;
}

export default function CustomModal({
  children,
  modalBtnTxt,
  modalHeaderTxt,
  modalHeaderBtn,
  onClickModalHeaderBtn,
  isMd,
  isOnClickModalHeaderBtnValid,
  isLoading,
  modalTxtBtnTxt,
  isTealColorBtn,
  closeModalBoolean,
  isBoth,
  isHide,
}: ICustomModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const breakpoint = useBreakpointValue({ base: "base", md: "md" });
  const scrollBehavior = useBreakpointValue({ base: "outside", md: "inside" });
  const router = useRouter();

  useEffect(() => {
    onClose();
  }, [router.asPath]);

  useEffect(() => {
    onClose();
  }, [closeModalBoolean]);

  return (
    <>
      {modalTxtBtnTxt ? (
        <Text
          mt="0.5rem"
          decoration="underline"
          onClick={onOpen}
          cursor="pointer"
          fontSize="1rem"
          fontWeight="semibold"
        >
          {modalTxtBtnTxt}
        </Text>
      ) : isMd === true ? (
        <Show above="md">
          <Button
            onClick={onOpen}
            variant={isTealColorBtn ? "solid" : "ghost"}
            colorScheme={isTealColorBtn ? "teal" : "gray"}
          >
            {modalBtnTxt}
          </Button>
        </Show>
      ) : (
        <Show below="md">
          <Button
            display={isHide && "none"}
            onClick={onOpen}
            variant={isTealColorBtn ? "solid" : "ghost"}
            colorScheme={isTealColorBtn ? "teal" : "gray"}
            w="100%"
            h="100%"
          >
            {modalBtnTxt}
          </Button>
        </Show>
      )}
      {isBoth === true && (
        <Button
          onClick={onOpen}
          // variant={isTealColorBtn ? "solid" : "ghost"}
          colorScheme={isTealColorBtn ? "teal" : "gray"}
          // w="100%"
          // h="100%"
        >
          {modalBtnTxt}
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        /* @ts-ignore */
        scrollBehavior={scrollBehavior}
        size={{ base: "full", md: "3xl" }}
      >
        <ModalOverlay />
        <ModalContent
          height={{ md: "auto" }}
          maxH={{ md: "80%" }}
          my={{ md: "auto" }}
          h={{ base: "100vh", md: "80%" }}
          position="relative"
        >
          <ModalHeader
            p="1rem"
            w="100%"
            position="sticky"
            top={0}
            zIndex={1}
            bg="white"
          >
            <Flex width="100%" alignItems="center">
              {(modalHeaderBtn ||
                (!modalHeaderBtn && breakpoint === "base")) && (
                <IconButton
                  icon={<ArrowBackIosNew />}
                  aria-label="Go back"
                  onClick={onClose}
                  variant="ghost"
                  zIndex="1"
                  colorScheme="black"
                  display="flex"
                  justifyContent="flex-start"
                />
              )}

              <Heading
                fontSize="1.25rem"
                textAlign="center"
                position="absolute"
                left="0"
                right="0"
              >
                {modalHeaderTxt}
              </Heading>

              {modalHeaderBtn ? (
                <>
                  <Button
                    marginLeft="auto"
                    type="submit"
                    isDisabled={!isOnClickModalHeaderBtnValid}
                    isLoading={isLoading}
                    onClick={onClickModalHeaderBtn}
                  >
                    {modalHeaderBtn}
                  </Button>
                  {/* <Button
                    w="100%"
                    type="submit"
                    isLoading={isLoading}
                    isDisabled={!isOnClickModalHeaderBtnValid}
                  >
                    submit
                  </Button> */}
                </>
              ) : (
                <Show above="md">
                  <IconButton
                    aria-label="close"
                    icon={<Close />}
                    onClick={onClose}
                    variant="ghost"
                    colorScheme="black"
                    display="flex"
                    justifyContent="flex-end"
                    marginLeft="auto"
                  />
                </Show>
              )}
            </Flex>
          </ModalHeader>

          <ModalBody px="1rem" pt="0px" pb="1rem" h="100%" overflow="hidden">
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
