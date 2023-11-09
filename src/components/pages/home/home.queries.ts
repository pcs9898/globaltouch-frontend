import { gql } from "@apollo/client";

export const FETCH_PROJECTS = gql`
  query fetchProjects($offset: Float!, $fetchProjectsOption: String!) {
    fetchProjects(offset: $offset, fetchProjectsOption: $fetchProjectsOption) {
      project_id
      title
      amount_required
      amount_raised
      cityName
      countryCode {
        country_code
      }
      projectImages {
        image_url
        image_index
      }
    }
  }
`;
