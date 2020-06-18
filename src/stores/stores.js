import makeInspectable from 'mobx-devtools-mst';

import { isProd } from '../utils/general';

import RootStore from './RootStore';
import { useContext, createContext } from 'react';

export function createStore(initialStore = {}) {
  const store = RootStore.create(initialStore);

  if (!isProd()) {
    makeInspectable(store);
  }

  return store;
}

const MSTContext = createContext(null);

export const Provider = MSTContext.Provider;

export function useStore(mapStateToProps) {
  console.log(MSTContext);

  const store = useContext(MSTContext);

  console.log(store);

  if (typeof mapStateToProps === 'function') {
    return mapStateToProps(store);
  }

  return store;
}
