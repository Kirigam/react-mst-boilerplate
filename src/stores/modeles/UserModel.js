import { types as t } from 'mobx-state-tree';


const Company = t.model('Company',{
  id:t.identifier,
  name: t.maybeNull(t.string),
  edrpou: t.maybeNull(t.string),
  concluded: t.maybeNull(t.boolean),
})

const Profile = t.model('Profile', {
  id: t.maybeNull(t.integer),
  company: t.maybeNull(Company),
  has_free_order: t.maybeNull(t.boolean),
  is_admin: t.maybeNull(t.boolean),
  full_name: t.maybeNull(t.string),
  address: t.maybeNull(t.string),
  site: t.maybeNull(t.string),
 
});


const UserModel = t
  .model('User', {
    id: t.identifier,
    email: t.maybeNull(t.string),
    role: t.maybeNull(t.string),
    full_name: t.maybeNull(t.string),
    phone_number: t.maybeNull(t.string),
    photo: t.maybeNull(t.string),
    is_superuser: t.boolean,
    client_profile: t.maybeNull(Profile),
    manager_profile: t.maybeNull(t.string),
  })
 
  .views((store) => ({
    get fullName() {
      return `${store.profile.firstName} ${store.profile.firstName}`;
    },
  }));
 


export default UserModel;
