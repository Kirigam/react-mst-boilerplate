import { apiRequest } from './utils';
import storageService from '../utils/storageService';

const setUserToStorage = ({ data: { key, user } }) => {
  storageService.set('userId', user.id);
  storageService.set('user_info', JSON.stringify(user));
  return user;
};

export const login = ({ email, password }) => {
  return apiRequest({
    method: 'POST',
    url: 'https://puz.supply/api/dj-rest-auth/login/',
    data: { email, password },
  });
};
export const getUser = (id) => {
  return apiRequest({
    method: 'GET',
    url: `https://puz.supply/api/project_users/${id}/`,
  });
};
export const registration = (data) => {
  return apiRequest({
    method: 'POST',
    url: 'https://puz.supply/api/dj-rest-auth/registration/',
    data,
  });
};

export const restorePassword = (data) => {
  return apiRequest({
    method: 'POST',
    url: '/auth/restore-password',
    data,
  });
}
export const setUserData = (id,userData) => {
  return apiRequest({
    method: 'PATCH',
    url: `/api/project_users/${id}/`,
    data:userData[0],
  });
};
  
