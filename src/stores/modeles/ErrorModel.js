import { types as t } from 'mobx-state-tree';

const ErrorModel = t.model({
  message: '',
  status: t.maybeNull(t.number),
  reason: t.maybeNull(t.string),
});

export default ErrorModel;