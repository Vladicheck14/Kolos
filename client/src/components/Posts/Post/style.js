import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {
    width: "21em",
    minHeight: "28em",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: "13em",
    width: "21em",
    marginBottom: "1em",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatarComment: {
    backgroundColor: blue[500],
    margin: "8px",
  },
  margin: {
    margin: theme.spacing(2),
  },
  customBadge: {
    backgroundColor: "#00AFD7",
    color: "white",
  },
}));
