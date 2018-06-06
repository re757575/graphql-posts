import { gql } from 'apollo-boost';

export const getPostsQuery = gql`
  {
    posts {
      id
      title
      context
      user {
        name
      }
    }
  }
`;

export default { getPostsQuery };
