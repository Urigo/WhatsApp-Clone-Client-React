import gql from 'graphql-tag';

export default gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      id
    }
  }
`;
