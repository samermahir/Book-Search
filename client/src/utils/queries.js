import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me($id: String, $username: String) {
    me(id: $id, username: $username) {
      _id
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
