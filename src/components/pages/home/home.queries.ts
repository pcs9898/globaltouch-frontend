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

export const FETCH_PROJECTS_BY_COUNTRY = gql`
  query fetchProjectsByCountry($country_code: String!, $offset: Float!) {
    fetchProjectsByCountry(country_code: $country_code, offset: $offset) {
      project_id
      title
      content
      amount_required
      amount_raised
      cityName
      lat
      lng
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
