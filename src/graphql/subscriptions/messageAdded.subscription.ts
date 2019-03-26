import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql `
  subscription MessageAdded {
    messageAdded {
      ...Message
    }
  }
  ${fragments.message}
`;
