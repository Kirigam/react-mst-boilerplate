import { apiRequest } from './utils';
import storageService from '../utils/storageService';
import localStorageKeys from '../constants/localStorageKeys';

const setUserToStorage = ({ data: { user, key: accessToken } }) => {
  storageService.set(localStorageKeys.USER_ID, user.id);
  storageService.set(localStorageKeys.ACCESS_TOKEN, accessToken);
  storageService.set(
    localStorageKeys.USER_INFO,
    JSON.stringify(user),
  );

  return user;
};

export const login = ({ email, password }) =>
  apiRequest({
    method: 'POST',
    url: '/dj-rest-auth/login/',
    data: { email, password },
  }).then(setUserToStorage);

export const getUser = (id) => {
  return apiRequest({
    method: 'GET',
    url: `/project_users/${id}/`,
  });
};
export const registration = (data) =>
  apiRequest({
    method: 'POST',
    url: '/dj-rest-auth/registration/',
    data,
  }).then(setUserToStorage);

export const restorePassword = (data) =>
  apiRequest({
    method: 'POST',
    url: '/dj-rest-auth/restore-password',
    data,
  }).then(setUserToStorage);

export const changePassword = (data) =>
  apiRequest({
    method: 'PATCH',
    url: '/change_password/',
    data,
  });

export const updateUser = (data) =>
  apiRequest({
    method: 'PATCH',
    url: '/update_profile/',
    data,
  });
