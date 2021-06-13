import { gql } from 'apollo-boost';

export const SYNC_CONTACT = gql`
  subscription getContacts {
    contacts {
      id
      name
      phone
    }
  }
`;
