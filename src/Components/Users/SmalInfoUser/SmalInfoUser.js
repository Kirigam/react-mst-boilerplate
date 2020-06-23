import React from "react";
import { Box, Typography, Button, Avatar } from "@material-ui/core"; 
import s from "./SmalInfoUser.module.scss";
import { observer } from 'mobx-react'; 
import { Link } from "react-router-dom"; 
import { PrivateRoute  } from "../../../Constants/Index";
import { useStore } from "../../../stores/stores";
import { SetingsSVG } from "../../../assetc/svg/setings"; 
export const SmalInfoUser = observer(() => {
   
  const {users} = useStore();

  const AuthUser = users.authUser; 
  
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
        <Typography variant="body2" className={s.infoUser}>{AuthUser.email}</Typography>
        {/* <a href={`mailto:${AuthUser.email}`} className={} >
          
        </a> */}

        <Link  to={PrivateRoute.SETINGS}>
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
