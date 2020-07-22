import { gql } from 'apollo-boost';
import client from '../client';

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const login = async (params) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN,
      variables: { username: params.userName, password: params.password },
    });

    if (data.login.token) {
      const { token } = data.login;
      localStorage.setItem('sparrow-user-token', token);
    }

    return data.login;
  } catch (error) {
    return null;
  }
};
