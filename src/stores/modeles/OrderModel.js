import { types as t } from 'mobx-state-tree';

const manager = t.model('manager', {
  id: t.number,
  name: t.maybeNull(t.string),
  phone: t.maybeNull(t.string),
  email: t.maybeNull(t.string),
});

const nomenclature = t.model('nomenclature', {
  name: t.maybeNull(t.string),
  code: t.maybeNull(t.string),
});
const unit = t.model('unit', {
  id: t.number,
  name: t.maybeNull(t.string),
});

const Nomenclature = t.model('Nomenclature', {
  id: t.number,
  address: t.maybeNull(t.string),
  amount: t.number,
  code: t.maybeNull(t.string),
  date: t.maybeNull(t.string),
  name: t.maybeNull(t.string),
  price: t.maybeNull(t.string),
  nomenclature: t.maybeNull(nomenclature),
  manager: t.maybeNull(manager),
  unit: t.maybeNull(unit),
});

const OrderModel = t
  .model('Order', {
    id: t.number,
    status: t.maybeNull(t.string),
    ordered_nomenclatures: t.optional(t.array(Nomenclature), []),
  })

  .views((store) => ({}));

export default OrderModel;
