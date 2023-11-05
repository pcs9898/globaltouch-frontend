import { gql } from "@apollo/client";

export const SEARCH_PROJECTS = gql`
  query searchProjects(
    $project_category: String!
    $searchTerm: String!
    $offset: Float!
  ) {
    searchProjects(
      project_category: $project_category
      searchTerm: $searchTerm
      offset: $offset
    ) {
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
