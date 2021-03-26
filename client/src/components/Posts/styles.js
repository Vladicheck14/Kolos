import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  noposts: {
    fontWeight: "bold",
    color: "#989898",
    fontSize: "5em",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "3em",
    },
  },
}));
