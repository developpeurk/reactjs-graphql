import { gql } from 'apollo-boost';

export const GET_CONTACTS = gql`
  query getContacts {
    contacts {
      id
      name
      phone
    }
  }
`;
