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
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowBackIosNew, Close } from "@mui/icons-material";
import { ReactNode, cloneElement, useRef } from "react";

interface ICustomModalProps {
  children: ReactNode;
  modalBtnTxt: string;
  modalHeaderTxt: string;
  modalHeaderBtn?: ReactNode;
}

export default function CustomModal({
  children,
  modalBtnTxt,
  modalHeaderTxt,
  modalHeaderBtn,
}: ICustomModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const breakpoint = useBreakpointValue({ base: "base", md: "md" });
  const scrollBehavior = useBreakpointValue({ base: "outside", md: "inside" });

  return (
    <>
      <Button onClick={onOpen}>{modalBtnTxt}</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        /* @ts-ignore */
        scrollBehavior={scrollBehavior}
        size={{ base: "full", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent
          height={{ md: "auto" }}
          maxH={{ md: "70%" }}
          my={{ md: "auto" }}
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
                <Box marginLeft="auto">{modalHeaderBtn}</Box>
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

          <ModalBody px="1rem" pt="0px" pb="1rem">
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
