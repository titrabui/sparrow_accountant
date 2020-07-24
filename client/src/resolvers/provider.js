import { gql } from 'apollo-boost';
import client from '../client';

const FETCH_PROVIDERS = gql`
  query fetchProviders(
    $params: fetchProviderParamsInput
    $sorter: fetchProviderSorterInput
    $filter: fetchProviderFilterInput
  ) {
    fetchProviders(params: $params, sorter: $sorter, filter: $filter) {
      data {
        id
        name
        phone
        address
      }
      pageSize
      success
      current
      total
    }
  }
`;

const CREATE_PROVIDER = gql`
  mutation createProvider($name: String!, $phone: String, $address: String) {
    createProvider(name: $name, phone: $phone, address: $address) {
      success
    }
  }
`;

const UPDATE_PROVIDER = gql`
  mutation updateProvider($id: ID!, $name: String!, $phone: String, $address: String) {
    updateProvider(id: $id, name: $name, phone: $phone, address: $address) {
      success
    }
  }
`;

const DELETE_PROVIDER = gql`
  mutation deleteProvider($ids: [ID]!) {
    deleteProvider(ids: $ids) {
      success
    }
  }
`;

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
export const fetchProviders = async (params, sorter, filter) => {
  if (params._timestamp) {
    delete params._timestamp;
  }

  const { data } = await client.query({
    query: FETCH_PROVIDERS,
    variables: { params, sorter, filter },
    fetchPolicy: 'network-only',
  });
  return data.fetchProviders;
};

export const createProvider = async (params) => {
  await client.mutate({
    mutation: CREATE_PROVIDER,
    variables: { name: params.name, phone: params.phone, address: params.address },
  });
};

export const updateProvider = async (params) => {
  await client.mutate({
    mutation: UPDATE_PROVIDER,
    variables: params,
  });
};

export const deleteProvider = async (params) => {
  await client.mutate({
    mutation: DELETE_PROVIDER,
    variables: params,
  });
};
