import React from "react";
import useStyles from "./style";
// import { IconSvg } from "../../../svg_icons/svg";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { routes } from "../../../../scenes/routes";
import { PublicRoute } from "../../../../Constants/Index";

export const LogoutUser = () => {
  var classes = useStyles();
  let history = useHistory();

  function onClick() {
    localStorage.removeItem("user_info");
    localStorage.removeItem("userId");
    // localStorage.removeItem("___User");

  
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
