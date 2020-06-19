import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  exit: {
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    outline:'none',
    "&:hover": {
      curcor: "pointer",
      color: "#828cb9",
      transition: ".3s",
      transform: "rotate(0deg)",
      "& .MuiButton-startIcon": {
        transform: "rotate(45deg)",
        transition: ".6s",
        color: "#828cb9",
      },
    },
  },
  wrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f5",
  },
  exit_text: {
    color: "#6b6e74",
    fontWeight: "600",
  },
}));
