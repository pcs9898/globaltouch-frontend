export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type ICountryCode = {
  __typename?: 'CountryCode';
  country_code: Scalars['String']['output'];
};

export type ICreateProjectCommentDto = {
  content: Scalars['String']['input'];
  project_id: Scalars['String']['input'];
};

export type ICreateProjectCommentResponseDto = {
  __typename?: 'CreateProjectCommentResponseDTO';
  success: Scalars['Boolean']['output'];
};

export type ICreateProjectDto = {
  amount_required: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  projectImageUrls: Scalars['String']['input'];
  project_category?: IProject_Category_Enum;
  title: Scalars['String']['input'];
};

export type ICreateProjectDonationDto = {
  amount: Scalars['Int']['input'];
  imp_uid: Scalars['String']['input'];
  project_id: Scalars['String']['input'];
};

export type ICreateProjectDonationResponseDto = {
  __typename?: 'CreateProjectDonationResponseDTO';
  success: Scalars['Boolean']['output'];
};

export type ICreateProjectResponseDto = {
  __typename?: 'CreateProjectResponseDTO';
  project_id: Scalars['String']['output'];
};

export type ICreateUpdatedProjectDto = {
  content: Scalars['String']['input'];
  project_id: Scalars['String']['input'];
};

export type ICreateUpdatedProjectResponseDto = {
  __typename?: 'CreateUpdatedProjectResponseDTO';
  success: Scalars['Boolean']['output'];
};

export type ICreateUserDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ICreateUserResponseDto = {
  __typename?: 'CreateUserResponseDTO';
  accessToken: Scalars['String']['output'];
};

export type IDeleteProjectCommentDto = {
  projectComment_id: Scalars['String']['input'];
  project_id: Scalars['String']['input'];
};

export type IDeleteProjectCommentResponseDto = {
  __typename?: 'DeleteProjectCommentResponseDTO';
  success: Scalars['Boolean']['output'];
};

export type IFetchProjectCommentsDto = {
  offset: Scalars['Int']['input'];
  project_id: Scalars['String']['input'];
};

export type IFetchProjectCommentsResponseDto = {
  __typename?: 'FetchProjectCommentsResponseDTO';
  amount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  projectComment_id: Scalars['String']['output'];
  user: IUser;
};

export type IFetchProjectCommentsWithTotalResponseDto = {
  __typename?: 'FetchProjectCommentsWithTotalResponseDTO';
  projectComments: Array<IFetchProjectCommentsResponseDto>;
  total: Scalars['Int']['output'];
};

export type IFetchProjectDto = {
  project_id: Scalars['String']['input'];
};

export type IFetchProjectOgDto = {
  project_id: Scalars['String']['input'];
};

export type IFetchProjectOgResponseDto = {
  __typename?: 'FetchProjectOgResponseDTO';
  content: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type IFetchProjectResponseDto = {
  __typename?: 'FetchProjectResponseDTO';
  amount_raised: Scalars['Int']['output'];
  amount_required: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  countryCode: ICountryCode;
  created_at: Scalars['DateTime']['output'];
  donation_count: Scalars['Int']['output'];
  projectCategory: IProjectCategory;
  projectImages: Array<IProjectImage>;
  project_id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user: IUser;
};

export type IFetchProjectsByCountryDto = {
  country_code: Scalars['String']['input'];
  offset: Scalars['Int']['input'];
  project_category?: IProject_Category_With_All_Enum;
};

export type IFetchProjectsByCountryResponseDto = {
  __typename?: 'FetchProjectsByCountryResponseDTO';
  amount_raised: Scalars['Int']['output'];
  amount_required: Scalars['Int']['output'];
  countryCode: ICountryCode;
  project_id: Scalars['String']['output'];
  project_image_url: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type IFetchProjectsByCountryWithTotalResponseDto = {
  __typename?: 'FetchProjectsByCountryWithTotalResponseDTO';
  projects: Array<IFetchProjectsByCountryResponseDto>;
  total: Scalars['Int']['output'];
};

export type IFetchProjectsNewestDto = {
  offset: Scalars['Int']['input'];
};

export type IFetchProjectsNewestResponseDto = {
  __typename?: 'FetchProjectsNewestResponseDTO';
  amount_raised: Scalars['Int']['output'];
  amount_required: Scalars['Int']['output'];
  countryCode: ICountryCode;
  project_id: Scalars['String']['output'];
  project_image_url: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type IFetchProjectsNewestWithTotalResponseDto = {
  __typename?: 'FetchProjectsNewestWithTotalResponseDTO';
  projects: Array<IFetchProjectsNewestResponseDto>;
  total: Scalars['Int']['output'];
};

export type IFetchProjectsTrendingDto = {
  offset: Scalars['Int']['input'];
};

export type IFetchProjectsTrendingResponseDto = {
  __typename?: 'FetchProjectsTrendingResponseDTO';
  amount_raised: Scalars['Int']['output'];
  amount_required: Scalars['Int']['output'];
  countryCode: ICountryCode;
  project_id: Scalars['String']['output'];
  project_image_url: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type IFetchProjectsTrendingWithTotalResponseDto = {
  __typename?: 'FetchProjectsTrendingWithTotalResponseDTO';
  projects: Array<IFetchProjectsTrendingResponseDto>;
  total: Scalars['Int']['output'];
};

export type IFetchUpdatedProjectsDto = {
  project_id: Scalars['String']['input'];
};

export type IFetchUpdatedProjectsResponseDto = {
  __typename?: 'FetchUpdatedProjectsResponseDTO';
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
};

export type IFetchUserLoggedInDonationsDto = {
  offset: Scalars['Int']['input'];
};

export type IFetchUserLoggedInDonationsResponseDto = {
  __typename?: 'FetchUserLoggedInDonationsResponseDTO';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  project: IProject;
  project_image_url: Scalars['String']['output'];
};

export type IFetchUserLoggedInDonationsWithTotalResponseDto = {
  __typename?: 'FetchUserLoggedInDonationsWithTotalResponseDTO';
  donations: Array<IFetchUserLoggedInDonationsResponseDto>;
  total: Scalars['Int']['output'];
};

export type IFetchUserLoggedInProjectsDto = {
  offset: Scalars['Int']['input'];
};

export type IFetchUserLoggedInProjectsResponseDto = {
  __typename?: 'FetchUserLoggedInProjectsResponseDTO';
  amount_raised: Scalars['Int']['output'];
  amount_required: Scalars['Int']['output'];
  countryCode: ICountryCode;
  project_id: Scalars['String']['output'];
  project_image_url: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type IFetchUserLoggedInProjectsWithTotalResponseDto = {
  __typename?: 'FetchUserLoggedInProjectsWithTotalResponseDTO';
  projects: Array<IFetchUserLoggedInProjectsResponseDto>;
  total: Scalars['Int']['output'];
};

export type IFetchUserLoggedInResponseDto = {
  __typename?: 'FetchUserLoggedInResponseDTO';
  name: Scalars['String']['output'];
  profile_image_url?: Maybe<Scalars['String']['output']>;
  user_id: Scalars['String']['output'];
};

export type ILoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type IMutation = {
  __typename?: 'Mutation';
  createProject: ICreateProjectResponseDto;
  createProjectComment: ICreateProjectCommentResponseDto;
  createProjectDonation: ICreateProjectDonationResponseDto;
  createUpdatedProject: ICreateUpdatedProjectResponseDto;
  createUser: ICreateUserResponseDto;
  deleteProjectComment: IDeleteProjectCommentResponseDto;
  loginUser: Scalars['String']['output'];
  restoreAccessToken: Scalars['String']['output'];
  updateProjectComment: IUpdateProjectCommentResponseDto;
  updateUser: IUpdateUserResponseDto;
};


export type IMutationCreateProjectArgs = {
  createProjectDTO: ICreateProjectDto;
};


export type IMutationCreateProjectCommentArgs = {
  createProjectCommentDTO: ICreateProjectCommentDto;
};


export type IMutationCreateProjectDonationArgs = {
  createProjectDonationDTO: ICreateProjectDonationDto;
};


export type IMutationCreateUpdatedProjectArgs = {
  createUpdatedProjectDTO: ICreateUpdatedProjectDto;
};


export type IMutationCreateUserArgs = {
  createUserDTO: ICreateUserDto;
};


export type IMutationDeleteProjectCommentArgs = {
  deleteProjectCommentDTO: IDeleteProjectCommentDto;
};


export type IMutationLoginUserArgs = {
  loginDTO: ILoginDto;
};


export type IMutationUpdateProjectCommentArgs = {
  updateProjectCommentDTO: IUpdateProjectCommentDto;
};


export type IMutationUpdateUserArgs = {
  updateUserDTO: IUpdateUserDto;
};

export enum IProject_Category_Enum {
  CrisisRelief = 'CrisisRelief',
  Education = 'Education',
  Emergency = 'Emergency',
  Medical = 'Medical',
  Memorial = 'Memorial',
  Nonprofit = 'Nonprofit'
}

export enum IProject_Category_With_All_Enum {
  All = 'All',
  CrisisRelief = 'CrisisRelief',
  Education = 'Education',
  Emergency = 'Emergency',
  Medical = 'Medical',
  Memorial = 'Memorial',
  Nonprofit = 'Nonprofit'
}

export enum IProject_Donation_Status_Enum {
  Cancel = 'CANCEL',
  Payment = 'PAYMENT'
}

export type IProject = {
  __typename?: 'Project';
  amount_raised: Scalars['Int']['output'];
  amount_required: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  countryCode: ICountryCode;
  created_at: Scalars['DateTime']['output'];
  donation_count: Scalars['Int']['output'];
  projectCategory: IProjectCategory;
  projectImages: Array<IProjectImage>;
  project_id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user: IUser;
};

export type IProjectCategory = {
  __typename?: 'ProjectCategory';
  project_category: Scalars['String']['output'];
};

export type IProjectDonation = {
  __typename?: 'ProjectDonation';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  imp_uid: Scalars['String']['output'];
  project: IProject;
  projectDonation_id: Scalars['String']['output'];
  status: IProject_Donation_Status_Enum;
  user: IUser;
};

export type IProjectImage = {
  __typename?: 'ProjectImage';
  image_index: Scalars['Int']['output'];
  image_url: Scalars['String']['output'];
  project: IProject;
  projectImage_id: Scalars['String']['output'];
};

export type IQuery = {
  __typename?: 'Query';
  fetchProject: IFetchProjectResponseDto;
  fetchProjectComments: IFetchProjectCommentsWithTotalResponseDto;
  fetchProjectOg: IFetchProjectOgResponseDto;
  fetchProjectsByCountry: IFetchProjectsByCountryWithTotalResponseDto;
  fetchProjectsNewest: IFetchProjectsNewestWithTotalResponseDto;
  fetchProjectsTrending: IFetchProjectsTrendingWithTotalResponseDto;
  fetchUpdatedProjects: Array<IFetchUpdatedProjectsResponseDto>;
  fetchUserLoggedIn: IFetchUserLoggedInResponseDto;
  fetchUserLoggedInDonations: IFetchUserLoggedInDonationsWithTotalResponseDto;
  fetchUserLoggedInProjects: IFetchUserLoggedInProjectsWithTotalResponseDto;
  searchProjects: ISearchProjectWithTotalResponseDto;
};


export type IQueryFetchProjectArgs = {
  fetchProjectDTO: IFetchProjectDto;
};


export type IQueryFetchProjectCommentsArgs = {
  fetchProjectCommentsDTO: IFetchProjectCommentsDto;
};


export type IQueryFetchProjectOgArgs = {
  fetchProjectOgDTO: IFetchProjectOgDto;
};


export type IQueryFetchProjectsByCountryArgs = {
  fetchProjectsByCountryDTO: IFetchProjectsByCountryDto;
};


export type IQueryFetchProjectsNewestArgs = {
  fetchProjectsNewestDTO: IFetchProjectsNewestDto;
};


export type IQueryFetchProjectsTrendingArgs = {
  fetchProjectsTrendingDTO: IFetchProjectsTrendingDto;
};


export type IQueryFetchUpdatedProjectsArgs = {
  fetchUpdatedProjectsDTO: IFetchUpdatedProjectsDto;
};


export type IQueryFetchUserLoggedInDonationsArgs = {
  fetchUserLoggedInDonationsDTO: IFetchUserLoggedInDonationsDto;
};


export type IQueryFetchUserLoggedInProjectsArgs = {
  fetchUserLoggedInProjectsDTO: IFetchUserLoggedInProjectsDto;
};


export type IQuerySearchProjectsArgs = {
  searchProjectsDTO: ISearchProjectDto;
};

export type ISearchProjectDto = {
  offset: Scalars['Int']['input'];
  project_category?: IProject_Category_With_All_Enum;
  searchTerm: Scalars['String']['input'];
};

export type ISearchProjectResponseDto = {
  __typename?: 'SearchProjectResponseDTO';
  amount_raised: Scalars['Int']['output'];
  amount_required: Scalars['Int']['output'];
  countryCode: ICountryCode;
  project_id: Scalars['String']['output'];
  project_image_url: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ISearchProjectWithTotalResponseDto = {
  __typename?: 'SearchProjectWithTotalResponseDTO';
  searchProjects: Array<ISearchProjectResponseDto>;
  total: Scalars['Int']['output'];
};

export type IUpdateProjectCommentDto = {
  content: Scalars['String']['input'];
  projectComment_id: Scalars['String']['input'];
  project_id: Scalars['String']['input'];
};

export type IUpdateProjectCommentResponseDto = {
  __typename?: 'UpdateProjectCommentResponseDTO';
  success: Scalars['Boolean']['output'];
};

export type IUpdateUserDto = {
  name?: InputMaybe<Scalars['String']['input']>;
  profile_image_url?: InputMaybe<Scalars['String']['input']>;
};

export type IUpdateUserResponseDto = {
  __typename?: 'UpdateUserResponseDTO';
  name?: Maybe<Scalars['String']['output']>;
  profile_image_url?: Maybe<Scalars['String']['output']>;
};

export type IUser = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  profile_image_url?: Maybe<Scalars['String']['output']>;
  projectDonations: Array<IProjectDonation>;
  projects: Array<IProject>;
  user_id: Scalars['String']['output'];
};
