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

export type ICreateProjectDto = {
  amount_required: Scalars['Int']['input'];
  cityName: Scalars['String']['input'];
  content: Scalars['String']['input'];
  countryCode: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  projectImageUrls: Scalars['String']['input'];
  project_category?: IProject_Category_Enum;
  title: Scalars['String']['input'];
};

export type ICreateProjectDonationDto = {
  amount: Scalars['Int']['input'];
  imp_uid: Scalars['String']['input'];
  project_id: Scalars['String']['input'];
};

export type ICreateProjectDonationForMobileDto = {
  imp_uid: Scalars['String']['input'];
  project_id: Scalars['String']['input'];
};

export type ICreateProjectDonationResponseDto = {
  __typename?: 'CreateProjectDonationResponseDTO';
  success: Scalars['Boolean']['output'];
};

export type ICreateUpdatedProjectDto = {
  content: Scalars['String']['input'];
  project_id: Scalars['String']['input'];
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

export type IFetchProjectOgResponseDto = {
  __typename?: 'FetchProjectOgResponseDTO';
  content: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type IFetchUserDonatedNCommentedResponseDto = {
  __typename?: 'FetchUserDonatedNCommentedResponseDTO';
  commented: Scalars['Boolean']['output'];
  donated: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
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
  createProject: IProject;
  createProjectComment: IProjectComment;
  createProjectDonation: ICreateProjectDonationResponseDto;
  createProjectDonationForMobile: ICreateProjectDonationResponseDto;
  createUpdatedProject: IUpdatedProject;
  createUser: ICreateUserResponseDto;
  deleteProjectComment: IDeleteProjectCommentResponseDto;
  loginUser: Scalars['String']['output'];
  restoreAccessToken: Scalars['String']['output'];
  updateProjectComment: IProjectComment;
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


export type IMutationCreateProjectDonationForMobileArgs = {
  createProjectDonationForMobileDTO: ICreateProjectDonationForMobileDto;
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

export enum IProject_Donation_Status_Enum {
  Cancel = 'CANCEL',
  Payment = 'PAYMENT'
}

export type IProject = {
  __typename?: 'Project';
  amount_raised: Scalars['Int']['output'];
  amount_required: Scalars['Int']['output'];
  cityName: Scalars['String']['output'];
  content: Scalars['String']['output'];
  countryCode: ICountryCode;
  created_at: Scalars['DateTime']['output'];
  donation_count: Scalars['Int']['output'];
  location: Scalars['String']['output'];
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

export type IProjectComment = {
  __typename?: 'ProjectComment';
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  maxDonationAmount?: Maybe<Scalars['Int']['output']>;
  project: IProject;
  projectComment_id: Scalars['String']['output'];
  user: IUser;
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
  fetchMarkers: Array<IProject>;
  fetchProject: IProject;
  fetchProjectComments: Array<IProjectComment>;
  fetchProjectOg: IFetchProjectOgResponseDto;
  fetchProjects: Array<IProject>;
  fetchProjectsByCountry: Array<IProject>;
  fetchUpdatedProjects: Array<IUpdatedProject>;
  fetchUserDonatedNCommented: IFetchUserDonatedNCommentedResponseDto;
  fetchUserLoggedIn: IFetchUserLoggedInResponseDto;
  fetchUserLoggedInDonations: Array<IProjectDonation>;
  fetchUserLoggedInProjects: Array<IProject>;
  searchProjects: Array<IProject>;
};


export type IQueryFetchMarkersArgs = {
  east: Scalars['Float']['input'];
  north: Scalars['Float']['input'];
  south: Scalars['Float']['input'];
  west: Scalars['Float']['input'];
};


export type IQueryFetchProjectArgs = {
  project_id: Scalars['String']['input'];
};


export type IQueryFetchProjectCommentsArgs = {
  offset: Scalars['Float']['input'];
  project_id: Scalars['String']['input'];
};


export type IQueryFetchProjectOgArgs = {
  project_id: Scalars['String']['input'];
};


export type IQueryFetchProjectsArgs = {
  fetchProjectsOption: Scalars['String']['input'];
  offset: Scalars['Float']['input'];
};


export type IQueryFetchProjectsByCountryArgs = {
  country_code: Scalars['String']['input'];
  offset: Scalars['Float']['input'];
};


export type IQueryFetchUpdatedProjectsArgs = {
  project_id: Scalars['String']['input'];
};


export type IQueryFetchUserDonatedNCommentedArgs = {
  project_id: Scalars['String']['input'];
};


export type IQueryFetchUserLoggedInDonationsArgs = {
  offset: Scalars['Float']['input'];
};


export type IQueryFetchUserLoggedInProjectsArgs = {
  offset: Scalars['Float']['input'];
};


export type IQuerySearchProjectsArgs = {
  offset: Scalars['Float']['input'];
  project_category: Scalars['String']['input'];
  searchTerm: Scalars['String']['input'];
};

export type IUpdateProjectCommentDto = {
  content: Scalars['String']['input'];
  projectComment_id: Scalars['String']['input'];
  project_id: Scalars['String']['input'];
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

export type IUpdatedProject = {
  __typename?: 'UpdatedProject';
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  project: IProject;
  updatedProject_id: Scalars['String']['output'];
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
