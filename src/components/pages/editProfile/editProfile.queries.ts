import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation updateUser($updateUserDTO: UpdateUserDTO!) {
    updateUser(updateUserDTO: $updateUserDTO) {
      name
      profile_image_url
    }
  }
`;
