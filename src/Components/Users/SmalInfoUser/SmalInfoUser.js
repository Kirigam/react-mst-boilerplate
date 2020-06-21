import React from "react";
import { Box, Typography, Button, Avatar } from "@material-ui/core";
// import { IconSvg } from "../../svg_icons/svg";
import s from "./SmalInfoUser.module.scss";
import { observer } from 'mobx-react';
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { routes } from "../../../scenes/routes";
import { PrivateRoute, NameStorage } from "../../../Constants/Index";
import { useStore } from "../../../stores/stores";
import { SetingsSVG } from "../../../assetc/svg/setings";
// import { SidePanel } from '../../components/SidePanel/SidePanel'

export const SmalInfoUser = observer(() => {
   
  const {users} = useStore();
  console.log(users );
  console.log(users.authUser );
  
  const AuthUser = users.authUser;
  console.log(AuthUser );
  
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
        <Typography variant="body2">{AuthUser.full_name}</Typography>
        <a href={`mailto:${AuthUser.email}`} className={s.linkMail} >
          <Typography variant="body2">{AuthUser.email}</Typography>
        </a>

        <Link to={PrivateRoute.SETINGS}>
          <Button
            className={s.seting}
            // startIcon={<IconSvg color="#5866a1" name="setings" />}
            startIcon={<SetingsSVG color="#5866a1" width='16px' ></SetingsSVG>}
          >
            Налаштування
          </Button>
        </Link>
      </Box>
    </Box>
  );
});
