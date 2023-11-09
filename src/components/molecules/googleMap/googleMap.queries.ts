import { gql } from "@apollo/client";

export const FETCH_MARKERS = gql`
  query fetchMarkers(
    $north: Float!
    $south: Float!
    $east: Float!
    $west: Float!
  ) {
    fetchMarkers(north: $north, south: $south, east: $east, west: $west) {
      project_id
      title

      location
      countryCode {
        country_code
      }
      projectImages {
        image_url
        image_index
      }
      projectCategory {
        project_category
      }
    }
  }
`;
