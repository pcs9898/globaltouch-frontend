import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation Login($loginDTO: LoginDTO!) {
    loginUser(loginDTO: $loginDTO)
  }
`;

export const FETCH_USER_LOGGED_IN_QUERY = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      name
      profile_image_url
      user_id
    }
  }
`;
