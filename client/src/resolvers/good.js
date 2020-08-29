import { gql } from 'apollo-boost';
import client from '../client';

const FETCH_GOODS = gql`
  query fetchGoods(
    $params: fetchGoodParamsInput
    $sorter: fetchGoodSorterInput
    $filter: fetchGoodFilterInput
  ) {
    fetchGoods(params: $params, sorter: $sorter, filter: $filter) {
      data {
        id
        goodId
        name
        specification
        unit
        provider {
          id
          name
        }
      }
      pageSize
      success
      current
      total
    }
  }
`;

const CREATE_GOOD = gql`
  mutation createGood(
    $goodId: String!
    $name: String!
    $specification: String!
    $unit: String!
    $providerId: ID
  ) {
    createGood(
      goodId: $goodId
      name: $name
      specification: $specification
      unit: $unit
      providerId: $providerId
    ) {
      success
    }
  }
`;

const UPDATE_GOOD = gql`
  mutation updateGood(
    $id: ID!
    $goodId: String!
    $name: String!
    $specification: String!
    $unit: String!
    $providerId: ID
  ) {
    updateGood(
      id: $id
      goodId: $goodId
      name: $name
      specification: $specification
      unit: $unit
      providerId: $providerId
    ) {
      success
    }
  }
`;

const DELETE_GOOD = gql`
  mutation deleteGood($ids: [ID]!) {
    deleteGood(ids: $ids) {
      success
    }
  }
`;

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
export const fetchGoods = async (params, sorter, filter) => {
  if (params._timestamp) {
    delete params._timestamp;
  }

  const { data } = await client.query({
    query: FETCH_GOODS,
    variables: { params, sorter, filter },
    fetchPolicy: 'network-only',
  });
  return data.fetchGoods;
};

export const createGood = async (params) => {
  await client.mutate({
    mutation: CREATE_GOOD,
    variables: params,
  });
};

export const updateGood = async (params) => {
  await client.mutate({
    mutation: UPDATE_GOOD,
    variables: params,
  });
};

export const deleteGood = async (params) => {
  await client.mutate({
    mutation: DELETE_GOOD,
    variables: params,
  });
};
