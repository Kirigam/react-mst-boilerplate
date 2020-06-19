import React from "react";
import { Box, Typography, Button, Avatar } from "@material-ui/core";
// import { IconSvg } from "../../svg_icons/svg";
import useStyles from "./style";
import { observer } from 'mobx-react';
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { routes } from "../../../scenes/routes";
import { PrivateRoute, NameStorage } from "../../../Constants/Index";
import { useStore } from "../../../stores/stores";
// import { SidePanel } from '../../components/SidePanel/SidePanel'

export const SmalInfoUser = observer(() => {
  var classes = useStyles();
  const store = useStore();
  console.log( store.users);
  
  let User_info;
  User_info = JSON.parse(window.localStorage.getItem(NameStorage.USERID));
  // console.log(User_info);
  useEffect(() => {});

  return (
    <Box display="flex">
      <Box mr={2}>
        {/* User Photo */}
        <Avatar
          style={{
            width: 40,
            height: 40,
            transition: "0.3s",
          }}
        />
      </Box>
      <Box>
        <Typography variant="body2">Григорович Василь </Typography>
        <a href={`mailto:Vasa@gamil.com`}>
          <Typography variant="body2">Vasa@gamil.com</Typography>
        </a>

        <Link to={PrivateRoute.SETINGS}>
          <Button
            className={classes.seting}
            // startIcon={<IconSvg color="#5866a1" name="setings" />}
          >
            Налаштування
          </Button>
        </Link>
      </Box>
    </Box>
  );
});
