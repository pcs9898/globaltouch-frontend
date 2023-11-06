import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import CustomModal from "../../organisms/customModal";
import { useTranslation } from "next-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomTab from "../../molecules/customTab";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { app } from "@/src/commons/libraries/firebase/firebase";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateProjectArgs,
} from "@/src/commons/types/generated/types";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { FETCH_PROJECTS } from "../../pages/home/home.queries";

export const createProjectSchema = yup.object().shape({
  title: yup.string().required("Title is required").max(50).min(2),
  amount_required: yup.number().required("Your goal is required").min(1),
  content: yup.string().required("Story is required").max(10000).min(2),
  project_category: yup
    .string()
    .required("Category is required")
    .max(29)
    .min(2),
  countryCode: yup.string().required("City info is required"),
  cityName: yup.string().required("City info is required"),
  lat: yup.number().required("City info is required"),
  lng: yup.number().required("City info is required"),
});

const CREATE_PROJECT_MUTATION = gql`
  mutation createProject($createProjectDTO: CreateProjectDTO!) {
    createProject(createProjectDTO: $createProjectDTO) {
      project_id
    }
  }
`;

export default function CreateProjectModalPresenter() {
  const { t } = useTranslation();
  const btnRef = useRef<HTMLButtonElement>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [createProjectLoading, setCreateProjectLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const [createProjectMutation] = useMutation<
    Pick<IMutation, "createProject">,
    IMutationCreateProjectArgs
  >(CREATE_PROJECT_MUTATION);

  useEffect(() => {
    onClickTab("Medical");
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(createProjectSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setCreateProjectLoading(true);

    let imageUrl;
    if (selectedFile) {
      const storage = getStorage(app);
      const storageRef = ref(storage, "images/" + selectedFile.name);
      await uploadBytes(storageRef, selectedFile);

      imageUrl = await getDownloadURL(storageRef);
    }

    try {
      const result = await createProjectMutation({
        variables: {
          createProjectDTO: {
            amount_required: data.amount_required,
            cityName: data.cityName,
            content: data.content,
            countryCode: data.countryCode,
            lat: data.lat,
            lng: data.lng,
            projectImageUrls: imageUrl,
            title: data.title,
            project_category: data.project_category,
          },
        },
        update(cache, { data }) {
          const newProject = data?.createProject;
          const existingNewProjectList = cache.readQuery({
            query: FETCH_PROJECTS,
            variables: {
              offset: 1,
              fetchProjectsOption: "Newest",
            },
          });

          if (existingNewProjectList) {
            cache.writeQuery({
              query: FETCH_PROJECTS,
              variables: {
                offset: 1,
                fetchProjectsOption: "Newest",
              },
              data: {
                fetchProjects: [
                  newProject,
                  // @ts-ignore
                  ...existingNewProjectList?.fetchProjects,
                ],
              },
            });
          }
        },
      });

      reset();

      setSelectedFile(null);
      setPreviewImage(null);
      setValue("project_category", "Medical");

      router.push(`/project/${result.data.createProject.project_id}`);
    } catch (error) {
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      setCreateProjectLoading(false);
    }
  };

  const onClickTab = (tab: string) => {
    setValue("project_category", tab);
    trigger("project_category");
  };

  const onClickBtnRef = () => {
    btnRef.current.click();
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // <input type="file" multiple /> 에서 multiple 속성으로 여러개 드래그 가능
    if (!file) return;

    // 2. 임시URL 생성 => (진짜URL - 다른 브라우저에서도 접근 가능)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        // 게시판에서 event.target.id 대신 event.currentTarget.id를 썼던 이유: event.target은 태그만을 가르키지 않음
        // 미리보기용

        setPreviewImage(event.target?.result);
        // DB에 넣어주기용
        setSelectedFile(file);
      }
    };
  };

  async function getCityInfo(cityName) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        cityName
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.results.length > 0) {
      const { location } = response.data.results[0].geometry;
      const { lat, lng } = location;

      const addressComponents = response.data.results[0].address_components;
      const countryComponent = addressComponents.find((component) =>
        component.types.includes("country")
      );
      const countryCode = countryComponent ? countryComponent.short_name : null;

      return { lat, lng, countryCode };
    } else {
      setError("cityName", { type: "value", message: "City not exist" });
    }
  }

  const onClickGetCityInfo = async (cityName) => {
    try {
      const result = await getCityInfo(cityName);
      const { lat, lng, countryCode } = result;
      setValue("cityName", cityName);
      setValue("lat", parseFloat(lat));
      setValue("lng", parseFloat(lng));
      setValue("countryCode", countryCode);

      trigger("cityName");
      trigger("lat");
      trigger("lng");
      trigger("countryCode");
    } catch (error) {
      setError("cityName", { type: "value", message: "City not exist" });
    }
  };

  const handleCityInfoInput = (e) => {
    const value = e.target.value;
    if (value === "") {
      return;
    }
    debouncedCityInfoInput(e.target.value);
  };

  const debouncedCityInfoInput = debounce(onClickGetCityInfo, 500);

  return (
    <CustomModal
      modalBtnTxt={t("headerStartANewProjectBtn")}
      modalHeaderTxt={t("createProjectHeaderTitle")}
      modalHeaderBtn={t("createProjectHeaderBtn")}
      onClickModalHeaderBtn={onClickBtnRef}
      isOnClickModalHeaderBtnValid={!!(isValid && previewImage)}
      isLoading={createProjectLoading}
      isMd={true}
    >
      <form
        style={{ width: "100%", height: "100%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <VStack gap="0.75rem" h="100%">
          <FormControl isInvalid={!!errors.title}>
            {/* @ts-ignore */}
            <Input
              placeholder={t("createProjectFormTitle")}
              // @ts-ignore
              {...register("title")}
              variant="filled"
            />
            {/* @ts-ignore */}
            <FormErrorMessage>{String(errors.title?.message)}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.amount_required}>
            <InputGroup>
              <InputLeftAddon>{t("currency")}</InputLeftAddon>
              <Input
                placeholder={t("createProjectFormAmountRequired")}
                type="number"
                {...register("amount_required")}
                variant="filled"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setValue("amount_required", !!value && value);
                }}
              />
            </InputGroup>

            <FormErrorMessage>
              {String(errors.amount_required?.message)}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.cityName}>
            <InputGroup mr="0.5rem">
              <InputLeftAddon>
                {watch("countryCode") === undefined || errors.cityName?.message
                  ? t("createProjectFormCountry") +
                    " ‧ " +
                    t("createProjectFormCity")
                  : watch("countryCode") + " ‧ " + watch("cityName")}
              </InputLeftAddon>
              <Input
                placeholder="cityname"
                onChange={handleCityInfoInput}
                mr="0.5rem"
                variant="filled"
              />
            </InputGroup>
            <FormErrorMessage>
              {String(errors.cityName?.message)}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.amount_required}>
            <CustomTab
              categoryKindOption="createProjectCategory"
              onClickTab={onClickTab}
            />
            <FormErrorMessage>
              {String(errors.project_category?.message)}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content} h="100%">
            <Textarea
              placeholder={t("createProjectFormContent")}
              {...register("content")}
              variant="filled"
              h="100%"
            />
            <FormErrorMessage>
              {String(errors.content?.message)}
            </FormErrorMessage>
          </FormControl>

          <Flex flexDir="column" w="100%">
            <Box w="5rem" h="5rem">
              {previewImage && (
                <Img objectFit="cover" w="100%" h="100%" src={previewImage} />
              )}
            </Box>
            <Flex
              gap="1rem"
              w="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="1rem" fontWeight="semibold" color="gray">
                {t("createProjectFormAddPhotos")}
              </Text>
              <FormLabel
                htmlFor="image-upload"
                h="100%"
                mx="0"
                display="flex"
                alignItems="center"
              >
                <IconButton
                  as="label"
                  htmlFor="image-upload"
                  aria-label="Upload Image"
                  icon={<InsertPhotoIcon />}
                  fontSize="1.25rem"
                  colorScheme="gray"
                  cursor="pointer"
                  variant="ghost"
                />
              </FormLabel>
              <Input
                type="file"
                id="image-upload"
                accept="image/*"
                display="none"
                onChange={(e) => {
                  onChangeFile(e);
                }}
              />
            </Flex>
          </Flex>

          <Button
            w="100%"
            type="submit"
            isDisabled={!isValid}
            display="none"
            ref={btnRef}
          >
            submit
          </Button>
        </VStack>
      </form>
    </CustomModal>
  );
}
