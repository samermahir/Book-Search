import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;
