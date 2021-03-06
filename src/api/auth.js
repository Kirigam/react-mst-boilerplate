import { apiRequest } from './utils';
import { isUnauthorizedError } from './utils';
import storageService from '../utils/storageService';

const setUserToStorage = ({ data: { token, userId, user } }) => {
  storageService.set('token', token);
  storageService.set('userId', userId);

  return user;
};

export const login = ({ email, password }) =>
  apiRequest({
    method: 'POST',
    url: '/auth/login',
    data: { email, password },
  })
    .then(setUserToStorage)
    .catch((error) => {
      const errorMessage = isUnauthorizedError(error)
        ? 'Invalid email or password'
        : 'Server error';
      return Promise.reject(new Error(errorMessage));
    });

export const registration = (data) =>
  apiRequest({
    method: 'POST',
    url: '/auth/registration/',
    data,
  })
  .then(response => { 
    console.log(response.data );
  
    return response;
  })
  .catch(error => {
    return error.response.data;
  });

export const restorePassword = (data) =>
  apiRequest({
    method: 'POST',
    url: '/auth/restore-password',
    data,
  }).then(setUserToStorage);
