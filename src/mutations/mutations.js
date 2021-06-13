import { gql } from 'apollo-boost';

export const ADD_CONTACT = gql`
  mutation addContact($name: String!, $phone: numeric) {
    insert_contacts(objects: { name: $name, phone: $phone }) {
      affected_rows
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact($id: uuid!, $name: String!, $phone: numeric!) {
    update_contacts(
      where: { id: { _eq: $id }, name: {} }
      _set: { name: $name, phone: $phone }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation deleContact($id: uuid!) {
    delete_contacts(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
