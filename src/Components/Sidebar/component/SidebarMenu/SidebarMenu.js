import React from "react";
import { Icon_svg } from "../../../svg_icons/svg";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const SidebarMenu = () => {
  return (
    <>
      <div className="SidebarGroup">
        <div className="SidebarGroupHeader">
          <Icon_svg className="Icon" name="my_manager" />
          <Typography className="Title" variant="body1">
            Менеджери
          </Typography>
        </div>
        <div className="SidebarGroupMain">
          <Link className="Item">Усі менеджери</Link>
          <Link className="Item">Запити на створення</Link>
        </div>
      </div>
    </>
  );
};
