import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  setings: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "80px",
  },
  conteiner: {
    display: "flex",
    flexDirection: "column",
  },
  SetingAvatar: {
    display: "flex",
    alignItems: "center",
    margin: "35px 0",
    justifyContent: "space-between",
  },
  SetingAvatarFoto:{
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  InpunTitle: {
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#6c6f77",
  },
}));
