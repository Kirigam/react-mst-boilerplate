import { isNil } from 'ramda';
import { flow, getParent, types as t } from 'mobx-state-tree';

import ErrorModel from '../modeles/ErrorModel';

function createFlow(flowDefinition) {
  const flowModel = t
    .model({
      inProgress: t.optional(t.boolean, false),
      error: t.optional(t.maybeNull(ErrorModel), null),
    })
    .views((store) => ({
      get errorMessage() {
        return store.isError ? store.error.message : null;
      },

      get isError() {
        return !isNil(store.error);
      },
    }))
    .actions((store) => ({
      start() {
        store.inProgress = true;
        store.error = null;
      },

      success() {
        store.inProgress = false;
        store.error = null;
      },

      failed(err, throwError) {
        store.inProgress = false;

        store.error = err;

        if (throwError) {
          throw err;
        }
      },

      run: flow(flowDefinition(store, getParent(store))),

      cleanError() {
        store.error = null;
      },
    }));

  return t.optional(flowModel, {});
}

export default createFlow;
