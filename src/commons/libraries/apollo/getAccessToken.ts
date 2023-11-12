import { GraphQLClient, gql } from "graphql-request";
import { IMutation } from "../../types/generated/types";

export const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken
  }
`;

export async function getAccessToken() {
  try {
    const graphqlClient = new GraphQLClient(
      process.env.NEXT_PUBLIC_BACKEND_URI,
      { credentials: "include" }
    );
    const result: any = await graphqlClient.request<
      Pick<IMutation, "restoreAccessToken">
    >(RESTORE_ACCESS_TOKEN);

    // console.log("ihaosdias");
    return result.restoreAccessToken;
  } catch (error) {
    console.log(error.message);
  }
}
