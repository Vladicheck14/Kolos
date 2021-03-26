import { React, useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../ContextProvider";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost/">
        Memories
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const classes = useStyles();
  const [login, setLogin] = useState("");
  const history = useHistory();
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const { authToken, isLoggedIn } = useContext(GlobalContext);
  const [authTokenValue, setAuthTokenValue] = authToken;
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedInValue, setIsLoggedInValue] = isLoggedIn;
  const loginHangler = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/login", {
        email: login,
        password: pass,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedInValue(true);
          const token = response.headers["auth-token"];
          setAuthTokenValue(token);
          localStorage.setItem("authToken", token);
          history.push("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        const data = error.response.data;
        switch (data.errorStatus) {
          case "SHORTPASSWORD":
          case "LONGPASSWORD":
          case "EMPTYPASSWORD":
            setBadPassword(true);
            setPass("");
            break;
          case "SHORTEMAIL":
          case "LONGEMAIL":
          case "BADEMAIL":
          case "USERNOTEXIST":
          case "EMPTYEMAIL":
            setBadEmail(true);
            setLogin("");
            break;
          default:
            break;
        }
        setErrorMessage(data.errorMessage);
      });
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={badEmail}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onFocus={() => {
                setBadEmail(false);
              }}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              id="password"
              error={badPassword}
              onFocus={() => {
                setBadPassword(false);
              }}
              autoComplete="current-password"
            />
            {errorMessage !== "" && (
              <Typography
                variant={"body1"}
                align="center"
                color="error"
                style={{ marginTop: "24px" }}
              >
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submit}
              onClick={(e) => loginHangler(e)}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <RouterLink to="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
