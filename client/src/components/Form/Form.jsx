import { React, useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  FormControl,
} from "@material-ui/core";
import axios from "axios";
import styles from "./styles";
import loading from "../../images/loading.gif";

const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      // console.log("Called", reader);
      baseURL = reader.result;
      // console.log(baseURL);
      resolve(baseURL);
    };
    // console.log(fileInfo);
  });
};
function Form({ posts, setPosts }) {
  const [isLoading, setIsLoading] = useState(false);
  const postData = (data) => {
    setIsLoading(true);
    axios
      .post("http://localhost:8000/posts/create", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setPosts([...posts, response.data]);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  const classes = styles();
  const [selectedFile, setSelectedFile] = useState(undefined),
    [title, setTitle] = useState(""),
    [name, setName] = useState(""),
    [emptyTitle, setEmptyTitle] = useState(false),
    [emptyMessage, setEmptyMessage] = useState(false),
    [emptyName, setEmptyName] = useState(false),
    [message, setMessage] = useState("");
  const handleFormSubmit = (e) => {
    let send = true;
    e.preventDefault();
    if (title === "") {
      setEmptyTitle(true);
      send = false;
    }
    if (message === "") {
      setEmptyMessage(true);
      send = false;
    }
    if (name === "") {
      setEmptyName(true);
      send = false;
    }
    if (send) {
      postData({
        title: title,
        creator: name,
        message: message,
        selectedFile: selectedFile,
      });
    }
  };
  return (
    <Grid container direction="column">
      <Typography variant="h4" align="center">
        NEW POST
      </Typography>
      <FormControl autoComplete="off">
        <Grid
          container
          direction="column"
          justify="space-evenly"
          className={classes.fields}
        >
          <Grid item>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              required
              error={emptyName}
              className={classes.field}
              onChange={(e) => {
                setName(e.target.value);
                setEmptyName(false);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Title"
              variant="outlined"
              required
              error={emptyTitle}
              className={classes.field}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setEmptyTitle(false);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Message"
              variant="outlined"
              required
              error={emptyMessage}
              className={classes.field}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setEmptyMessage(false);
              }}
            />
          </Grid>
        </Grid>
        <input
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={(e) => {
            e.preventDefault();
            setSelectedFile(
              getBase64(e.target.files[0]).then((resolve) =>
                setSelectedFile(resolve)
              )
            );
          }}
        />

        <Grid item container spacing={1} justify="center" alignItems="center">
          <Grid item xs={selectedFile !== undefined ? 10 : 12}>
            <label htmlFor="contained-button-file">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component="span"
              >
                Upload Picture
              </Button>
            </label>
          </Grid>
          {selectedFile !== undefined && (
            <Grid item container justify="center" alignItems="center" xs={2}>
              <img
                src={selectedFile}
                alt="preview"
                onClick={() => {
                  setSelectedFile(undefined);
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              />
            </Grid>
          )}
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            component="span"
            type="submit"
            fullWidth
            style={{ marginTop: "0.7em" }}
            onClick={(e) => handleFormSubmit(e)}
          >
            Post
          </Button>
        </Grid>
        {isLoading && (
          <Grid item container alignItems="center" justify="center">
            <img
              src={loading}
              alt="loading"
              style={{ height: "7em", width: "7em" }}
            />
          </Grid>
        )}
      </FormControl>
    </Grid>
  );
}

export default Form;
