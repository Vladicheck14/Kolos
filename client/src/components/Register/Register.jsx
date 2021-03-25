import { React, useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
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
export default function Register() {
  const history = useHistory();
  const classes = useStyles();
  const [formFirstName, setFormFirstName] = useState(""),
    [formLastName, setFormLastName] = useState(""),
    [formEmail, setFormEmail] = useState(""),
    [formPassword, setFormPassword] = useState("");
  const { firstName, lastName, email, authToken, isLoggedIn } = useContext(
    GlobalContext
  );
  const [firstNameValue, setFirstNameValue] = firstName;
  const [authTokenValue, setAuthTokenValue] = authToken;
  const [isLoggedInValue, setIsLoggedInValue] = isLoggedIn;
  const [lastNameValue, setLastNameValue] = lastName;
  const [emailValue, setEmailValue] = email;
  const registerHandler = async (e) => {
    e.preventDefault();
    const ip = await axios.get("https://ipinfo.io/json?token=da153d332a0738");
    axios
      .post("http://localhost:8000/api/register", {
        firstName: formFirstName,
        lastName: formLastName,
        email: formEmail,
        password: formPassword,
        ipAddress: ip.data.ip,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedInValue(true);
          const token = response.headers["auth-token"];
          setAuthTokenValue(token);
          const data = response.data;
          console.log(data);
          setFirstNameValue(data.firstName);
          setLastNameValue(data.lastName);
          setEmailValue(data.email);
          localStorage.setItem("authToken", token);
          history.push("/");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                onChange={(e) => {
                  setFormFirstName(e.target.value);
                }}
                value={formFirstName}
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={(e) => {
                  setFormLastName(e.target.value);
                }}
                value={formLastName}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => {
                  setFormEmail(e.target.value);
                }}
                value={formEmail}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => {
                  setFormPassword(e.target.value);
                }}
                value={formPassword}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => registerHandler(e)}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/Login" variant="body2">
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
