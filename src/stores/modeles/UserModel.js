import { types as t } from 'mobx-state-tree';


const Company = t.model('Company',{
  id:t.identifier,
  name: t.maybeNull(t.string),
  edrpou: t.maybeNull(t.string),
})

const Profile = t.model('Profile', {
  id: t.maybeNull(t.string),
  company: t.maybeNull(Company),
  is_admin: t.boolean,
  address: t.maybeNull(t.string),
  site: t.maybeNull(t.string),
});


const UserModel = t
  .model('User', {
    id: t.number,
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
