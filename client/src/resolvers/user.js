import { gql } from 'apollo-boost';
import client from '../client';

const CURRENT_USER = gql`
  {
    me {
      id
      username
      email
      status
      type
      name
      avatar
    }
  }
`;

export const currentUser = async () => {
  const { data } = await client.query({
    query: CURRENT_USER,
  });
  return data.me;
};
