import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  query Me {
    me {
      ...User
    }
  }
  ${fragments.user}
`;
