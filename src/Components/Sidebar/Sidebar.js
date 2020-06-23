import React from "react";
import { Box, Typography } from "@material-ui/core";
// import { SmalInfoUser } from "../Users/SmalInfoUser/SmalInfoUser";
import { ButtonOrder } from "./component/buttonOrder/buttonOrder";
// import {  IconSvg } from "../svg_icons/svg";
import { Link } from "react-router-dom";
import useStyles from "./style";

import "./style_1.css";
import LogoutUser from "./component/LogoutUser/LogoutUser";
import { SmalInfoUser } from "../Users/SmalInfoUser/SmalInfoUser";
import { PrivateRoute } from "../../Constants/Index";

export const Sidebar = () => {
    var classes = useStyles();

    
  return (
    <>
      <Box className={classes.Sidebar} >
        {/* 1. Component User */}
        <SmalInfoUser />
        <ButtonOrder />
      
        <div className="SidebarGroup">
          <div className="SidebarGroupHeader">
            {/* <IconSvg className="Icon" name="my_orders" /> */}
            <Typography className="Title" variant="body1">
              Заявки
            </Typography>
          </div>
          <div className="SidebarGroupMain">
            <Link to={PrivateRoute.CREATEORDER} className="Item">Активні</Link>
            <Link to="" disabled className="Item">Архів заявок</Link>
          </div>
        </div>
        {/* <div className="SidebarGroup">
          <div className="SidebarGroupHeader">
             <Typography className="Title" variant="body1">
              Менеджери
            </Typography>
          </div>
          <div className="SidebarGroupMain">
            <Link to="" className="Item">Усі менеджери</Link>
            <Link to="" className="Item">Запити на створення</Link>
          </div>
        </div> */}

   
      </Box>
       <LogoutUser></LogoutUser>
    </>
  );
};
