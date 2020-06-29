import { connectReduxDevtools } from 'mst-middlewares';

import { isProd } from '../utils/general';

import RootStore from './RootStore';
import { useContext, createContext } from 'react';

export function createStore(initialStore = {}) {
  const store = RootStore.create(initialStore);

  if (!isProd()) {
    connectReduxDevtools(require('remotedev'), store);
  }

  return store;
}

const MSTContext = createContext(null);

export const MstProvider = MSTContext.Provider;

export function useStore(mapStateToProps) {
  const store = useContext(MSTContext);

  if (typeof mapStateToProps === 'function') {
    return mapStateToProps(store);
  }

  return store;
}
