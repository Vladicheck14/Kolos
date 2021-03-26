import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  bg: {
    height: "100vh",
    width: "100vw",
    backgroundImage:
      "url(https://images.theconversation.com/files/76631/original/image-20150331-1256-mz95ed.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "0.05",
    position: "absolute",
    top: "0",
    right: "0",
  },
  paper: {
    marginTop: theme.spacing(8),
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
