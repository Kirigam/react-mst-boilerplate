import axios from 'axios';
import { pathEq, mergeDeepLeft } from 'ramda';

import storageService from '../utils/storageService';

const apiBaseUrl = process.env.REACT_APP_API_URL;

export const isUnauthorizedError = pathEq(['response', 'status'], 401);

export const apiRequest = axios.create({
  baseURL: apiBaseUrl,
});


export const authRequest = (config) => {
  const token = storageService.get('token');

  const withAuthTokenConfig = mergeDeepLeft(
    config,
    { headers: { Authorization: `Token ${token}` } },
  );

  return apiRequest(withAuthTokenConfig);
};
