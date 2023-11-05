import { gql } from "@apollo/client";

export const FETCH_MY_DONATIONS = gql`
  query fetchUserLoggedInDonations($offset: Float!) {
    fetchUserLoggedInDonations(offset: $offset) {
      projectDonation_id
      amount
      created_at
      project {
        project_id
        title
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
  }
`;

export const FETCH_MY_PROJECTS = gql`
  query fetchUserLoggedInProjects($offset: Float!) {
    fetchUserLoggedInProjects(offset: $offset) {
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
