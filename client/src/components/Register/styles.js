import { makeStyles } from "@material-ui/core/styles";
import bg from "../../images/bg.png";

export const useStyles = makeStyles((theme) => ({
  bg: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    paddingTop: theme.spacing(8),
  },
  paper: {
    display: "flex",
    opacity: "1",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
