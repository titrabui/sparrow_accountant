import { stringify } from 'querystring';
import { history } from 'umi';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { login } from '@/resolvers/login';
import _ from 'lodash';

const extractLogedUser = (token) => {
  if (!token) return null;

  let userObject;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          let decodeToken = c.charCodeAt(0).toString(16);
          decodeToken = `00${decodeToken}`.slice(-2);
          return `%${decodeToken}`;
        })
        .join(''),
    );
    userObject = JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }

  if (!userObject || _.isEmpty({ userObject })) return null;

  return {
    username: userObject.username,
    email: userObject.email,
    type: userObject.type,
    status: userObject.status,
  };
};

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *logout(_action, { put }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      localStorage.removeItem('sparrow-user-token');
      yield put({
        type: 'user/saveCurrentUser',
        payload: {},
      });

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      if (!payload) return { ...state, status: 'error' };

      const data = extractLogedUser(payload.token);
      setAuthority(data.type.toLowerCase());
      return { ...state, status: 'ok' };
    },
  },
};
export default Model;
