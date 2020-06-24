import useStyles from "./style";
import React from "react";
import { Button, Modal, Fade, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PrivateRoute } from "../../../../Constants/Index";
// import { Icon_svg } from "../../../svg_icons/svg";
// import useStyles from './style';
// import { Link } from "react-router-dom";
// import { SidePanel } from '../../components/SidePanel/SidePanel'


export const ButtonOrder = () => {
    var classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Link to={PrivateRoute.CREATEORDER} >
    <Button 
    // onClick={handleOpen}
    
        variant="outlined"
        style={{ fontWeight: "600", margin: "30px 0px" }}
      >
        Офромити замовлення
      </Button>

    </Link>
      

      
    </>
  );
};
