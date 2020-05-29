import { types as t } from 'mobx-state-tree';

const Profile = t.model('Profile', {
  firstName: t.maybe(t.string),
  lastName: t.maybe(t.string),
  avatar: t.maybe(t.string),
});

const UserModel = t
  .model('User', {
    id: t.identifier,
    email: t.string,
    role: t.string,
    profile: t.maybe(Profile),
    createdAt: t.maybe(t.Date),
  })
  .views((store) => ({
    get fullName() {
      return `${store.profile.firstName} ${store.profile.firstName}`;
    },
  }));

export default UserModel;
