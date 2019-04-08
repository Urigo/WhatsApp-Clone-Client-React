import gql from 'graphql-tag';

export default gql`
  mutation signUp(
    $name: String!
    $username: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    signUp(
      name: $name
      username: $username
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      id
    }
  }
`;
