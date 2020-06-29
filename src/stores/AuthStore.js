import { pathOr } from 'ramda';
import { types, getRoot } from 'mobx-state-tree';

import * as authApi from '../api/auth';
import createFlow from './helpers/createFlow';
import storageService from '../utils/storageService';

function loginUser(flow, store) {
  return function* loginUser({ email, password }) {
    try {
      flow.start();

      const user = yield authApi.login({
        email,
        password,
      });
      const rootStore = getRoot(store);

      rootStore.users.addUser(user);

      flow.success();
    } catch (err) {
      // TO DO: Андрій коли приведете помилки до єдиного форматy то перенеси логіку формування помилки у createFlow
      const formattedError = {
        status: pathOr(
          null,
          ['response', 'data', 'status_code'],
          err,
        ),
        reason: pathOr(null, ['response', 'data', 'reason'], err),
        message: pathOr(
          err.message,
          ['response', 'data', 'non_field_errors', 0],
          err,
        ),
      };

      flow.failed(formattedError);
    }
  };
}

function registerUser(flow, store) {
  return function* registerUser(data) {
    try {
      flow.start();

      const user = yield authApi.registration(data);
      const rootStore = getRoot(store);

      rootStore.users.addUser(user);

      flow.success();
    } catch (err) {
      const formattedError = {
        status: pathOr(
          null,
          ['response', 'data', 'status_code'],
          err,
        ),
        reason: pathOr(null, ['response', 'data', 'reason'], err),
        message: pathOr(
          err.message,
          ['response', 'data', 'email', 0],
          err,
        ),
      };

      flow.failed(formattedError);
    }
  };
}

function resetPassword(flow, store) {
  return function* resetPassword({ email }) {
    try {
      flow.start();

      yield store.Api.resetPassword({ email });
      flow.success();
    } catch (err) {
      flow.failed();
    }
  };
}

const AuthStore = types
  .model('AuthStore', {
    loginUser: createFlow(loginUser),
    registerUser: createFlow(registerUser),
    resetPassword: createFlow(resetPassword),
  })
  .actions((store) => ({
    logout() {
      const rootStore = getRoot(store);

      rootStore.clearStore();
      storageService.clearStorage();
    },
  }));

export default AuthStore;
