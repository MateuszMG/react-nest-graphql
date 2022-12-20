import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
};

export type DecodedUser = {
  __typename?: 'DecodedUser';
  email: Scalars['String'];
  id: Scalars['String'];
  roles: Array<Scalars['String']>;
  username: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AccessToken;
  register: AccessToken;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  profile: DecodedUser;
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AccessTokenFragment = {
  __typename?: 'AccessToken';
  accessToken: string;
};

export type DecodedUserFragment = {
  __typename?: 'DecodedUser';
  id: string;
  username: string;
  email: string;
  roles: Array<string>;
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'AccessToken'; accessToken: string };
};

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: { __typename?: 'AccessToken'; accessToken: string };
};

export type ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileQuery = {
  __typename?: 'Query';
  profile: {
    __typename?: 'DecodedUser';
    id: string;
    username: string;
    email: string;
    roles: Array<string>;
  };
};

export const AccessTokenFragmentDoc = gql`
  fragment AccessToken on AccessToken {
    accessToken
  }
`;
export const DecodedUserFragmentDoc = gql`
  fragment DecodedUser on DecodedUser {
    id
    username
    email
    roles
  }
`;
export const LoginDocument = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      ...AccessToken
    }
  }
  ${AccessTokenFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      ...AccessToken
    }
  }
  ${AccessTokenFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const ProfileDocument = gql`
  query Profile {
    profile {
      ...DecodedUser
    }
  }
  ${DecodedUserFragmentDoc}
`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(
    ProfileDocument,
    options,
  );
}
export function useProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProfileQuery,
    ProfileQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(
    ProfileDocument,
    options,
  );
}
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<
  ProfileQuery,
  ProfileQueryVariables
>;
