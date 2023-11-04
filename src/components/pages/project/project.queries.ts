import { gql } from "@apollo/client";

export const FETCH_PROJECT = gql`
  query fetchProject($project_id: String!) {
    fetchProject(project_id: $project_id) {
      project_id
      title
      content
      amount_required
      amount_raised
      donation_count
      cityName
      created_at
      user {
        name
        profile_image_url
        user_id
      }
      projectCategory {
        project_category
      }
      countryCode {
        country_code
      }
      projectImages {
        image_url
      }
    }
  }
`;

export const FETCH_UPDATED_PROJECTS = gql`
  query fetchUpdatedProjects($project_id: String!) {
    fetchUpdatedProjects(project_id: $project_id) {
      updatedProject_id
      content
      created_at
    }
  }
`;

export const FETCH_USER_DONATED_N_COMMENTED = gql`
  query fetchUserDonatedNCommented($project_id: String!) {
    fetchUserDonatedNCommented(project_id: $project_id) {
      donated
      commented
    }
  }
`;

export const CREATE_PROJECT_COMMENT = gql`
  mutation createProjectComment(
    $createProjectCommentDTO: CreateProjectCommentDTO!
  ) {
    createProjectComment(createProjectCommentDTO: $createProjectCommentDTO) {
      projectComment_id
      content
      maxDonationAmount
      created_at
      user {
        user_id
        name
        profile_image_url
      }
    }
  }
`;

export const FETCH_PROJECT_COMMENTS = gql`
  query fetchProjectComments($project_id: String!, $offset: Float!) {
    fetchProjectComments(project_id: $project_id, offset: $offset) {
      projectComment_id
      content
      maxDonationAmount
      created_at
      user {
        user_id
        name
        profile_image_url
      }
    }
  }
`;

export const DELETE_PROJECT_COMMENT = gql`
  mutation deleteProjectComment(
    $deleteProjectCommentDTO: DeleteProjectCommentDTO!
  ) {
    deleteProjectComment(deleteProjectCommentDTO: $deleteProjectCommentDTO) {
      success
    }
  }
`;
