import gql from 'graphql-tag';
import * as fragments from '../fragments';

export default gql`
  subscription ChatAdded {
    chatAdded {
      ...Chat
    }
  }
  ${fragments.chat}
`;
