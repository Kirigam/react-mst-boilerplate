import React, { useContext, createContext } from 'react';
// import { useStore } from '../../../stores/createStore';
import { observer } from 'mobx-react';
import { RegisterFormComponent } from './components/RegisterForm';
import bg from './../../../../assetc/img/bg_fonts_1.jpg';
import useStyles from './../AuthStyle.js';
import { useStore } from '../../../../stores/stores';
// import {RootStore} from '../../../../stores/RootStore';
// import UsersStore from '../../../../stores/usersStore';

function RegisterForm() {
  const s = useStyles();
  const store = useStore();
   
  console.log(store );
  


  
  async function onSubmit(values) {
    console.log(values );
    
   

    if (values.password && values.email) {
    //   console.log(store);
    //   await store.auth.register.run({
    //     fullName: values.name,
    //     password: values.password,
    //     email: values.email,
    //   });
    }
  }

  return (
    <>
      <main className={s.auth}>
        <div className={s.auth_main}>
          <div className={s.auth_main__form}>
            <RegisterFormComponent
              // isLoading={store.auth.login.isLoading}
              onSubmit={onSubmit}
            ></RegisterFormComponent>
          </div>
        </div>
        <div className={s.auth_bg}>
          <img src={bg} alt="" />
        </div>
      </main>
    </>
  );
}
export default observer(RegisterForm);
