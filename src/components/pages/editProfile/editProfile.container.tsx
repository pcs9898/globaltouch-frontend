import { ChangeEvent, useState } from "react";
import EditProfilePresenter from "../../templates/editProfile/editProfile.presenter";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "./editProfile.queries";
import {
  IMutation,
  IMutationUpdateUserArgs,
} from "@/src/commons/types/generated/types";
import { useRecoilState } from "recoil";
import { userState } from "@/src/commons/libraries/recoil/global.recoil";
import { useToast } from "@chakra-ui/react";
import { app } from "@/src/commons/libraries/firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function EditProfileContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [user, setUser] = useRecoilState(userState);
  const toast = useToast();
  const [closeModal, setCloseModal] = useState(false);

  const [updateUser] = useMutation<
    Pick<IMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER);

  const onClickModalHeaderBtn = async () => {
    if (name === "" && !selectedFile) {
      return;
    }
    setCloseModal(false);
    setIsLoading(true);

    try {
      if (name && !selectedFile) {
        const result = await updateUser({
          variables: {
            updateUserDTO: {
              name,
            },
          },
        });

        setUser((prev) => {
          return { ...prev, ...result.data.updateUser };
        });

        setCloseModal(true);
      } else if (!name && selectedFile) {
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + selectedFile.name);
        await uploadBytes(storageRef, selectedFile);

        const imageUrl = await getDownloadURL(storageRef);

        const result = await updateUser({
          variables: {
            updateUserDTO: {
              profile_image_url: imageUrl,
            },
          },
        });
        setUser((prev) => {
          return { ...prev, ...result.data.updateUser };
        });

        setCloseModal(true);
      } else {
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + selectedFile.name);
        await uploadBytes(storageRef, selectedFile);

        const imageUrl = await getDownloadURL(storageRef);

        const result = await updateUser({
          variables: {
            updateUserDTO: {
              profile_image_url: imageUrl,
              name,
            },
          },
        });
        setUser((prev) => {
          return { ...prev, ...result.data.updateUser };
        });

        setCloseModal(true);
      }
    } catch (error) {
      toast({
        status: "error",
        title: error.message,
      });
    } finally {
      setIsLoading(false);
      setIsValid(false);
    }
  };

  const onChangeNameInput = (changedName: string) => {
    if (changedName === "") {
      setName("");
      setIsValid(false);
      return;
    }
    setName(changedName);
    setIsValid(true);
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // <input type="file" multiple /> 에서 multiple 속성으로 여러개 드래그 가능
    if (!file) return;

    setIsValid(true);

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

  return (
    <EditProfilePresenter
      onClickModalHeaderBtn={onClickModalHeaderBtn}
      isLoading={isLoading}
      isValid={isValid}
      onChangeNameInput={onChangeNameInput}
      onChangeFile={onChangeFile}
      previewImage={previewImage}
      closeModal={closeModal}
    />
  );
}
