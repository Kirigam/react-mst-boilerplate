import React from "react";
import useStyles from "./style";
// import { IconSvg } from "../../../svg_icons/svg";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { routes } from "../../../../scenes/routes";
import { PublicRoute, NameStorage } from "../../../../Constants/Index";
// import { useStore } from '../../stores/stores.js';
import { observer } from "mobx-react";
// import UsersStore from "../../../../stores/usersStore";
import { useStore } from "../../../../stores/stores";

const LogoutUser = () => {
  var classes = useStyles();
  let history = useHistory();
  const { users } = useStore((store) => ({
    users: store.users,
  }));
  function onClick() {
    localStorage.removeItem(NameStorage.USERID);
    localStorage.removeItem(NameStorage.USERINFO);
    localStorage.removeItem(NameStorage.USERTOKEN);
   
    users.removeUser();
  
    history.push(PublicRoute.LOGIN);

  }

  return (
    <div className={classes.wrap}>
      <button className={classes.exit} onClick={onClick}>
            {/* <IconSvg name="exit" /> */}
        <Typography variant="body2" className={classes.exit_text}>
          Вийти з профілю
        </Typography>
      </button>
    </div>
  );
};
export default observer(LogoutUser)