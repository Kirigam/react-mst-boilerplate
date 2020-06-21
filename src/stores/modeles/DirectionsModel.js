import { types as t } from 'mobx-state-tree';

const DirectionsMode = t
  .model('Directions', {
    id: t.identifier,
    code: t.maybeNull(t.string),
    name: t.maybeNull(t.string),
  });
 


export default DirectionsMode;