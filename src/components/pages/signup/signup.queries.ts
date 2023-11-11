import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation createUser($createUserDTO: CreateUserDTO!) {
    createUser(createUserDTO: $createUserDTO) {
      accessToken
    }
  }
`;
