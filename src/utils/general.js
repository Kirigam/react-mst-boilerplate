import { isNil } from 'ramda';
import storageService from './storageService';

export const isProd = () => process.env.NODE_ENV === 'production';
export const isLoggedIn = () => !isNil(storageService.get('userId'));