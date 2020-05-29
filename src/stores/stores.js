import makeInspectable from 'mobx-devtools-mst';

import { isProd } from '../utils/general';

import RootStore from './RootStore';

const createStore = (initialStore = {}) => {
  const store = RootStore.create(initialStore);

  if (!isProd) {
    makeInspectable(store);
  }

  return store;
};

export default createStore;
