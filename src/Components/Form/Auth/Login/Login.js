import React from 'react';
// import { LoginForm } from "./components/LoginForm";
// import { useStore } from "../../../stores/createStore";
import { observer } from "mobx-react";
// // import { BrowserRouter, Redirect } from "react-router-dom";
// import { routes } from "../../routes";
// import { isLogin } from "../../../utils/Auth";
// import { useHistory } from "react-router-dom";
import bg from './../../../../assetc/img/bg_fonts_1.jpg'
import useStyles from './../AuthStyle.js';
import { LoginFormComponent } from './components/LoginForm';

// import { Switch } from '@material-ui/core';
function LoginForm (){
  const s = useStyles();
  // const store = RootStore();
  // let history = useHistory();
  // if (isLogin()) {
  //   history.push(routes.home);
  // }



  async function onSubmit(values) {
    

  //   if (values.password && values.email) {
  //     await store.auth.login.run({
  //       password: values.password,
  //       email: values.email,
  //     });
  //   }
  }

  return (
    <>
      <main className={s.auth}>
        <div className={s.auth_main}>
          <div className={s.auth_main__form}>
          <LoginFormComponent
        // isLoading={store.auth.login.isLoading}
        onSubmit={onSubmit}
      ></LoginFormComponent>
          </div>
        </div>
        <div className={s.auth_bg}>
          <img src={bg} alt="" />
        </div>
      </main>
      
    </>
  );
};
export default observer(LoginForm);
