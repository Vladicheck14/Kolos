import { React, useState } from "react";
import { TextField, Grid, Button, Typography } from "@material-ui/core";
import axios from "axios";
import styles from "./styles";

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
  const postData = (data) => {
    console.log(data);
    axios
      .post("http://localhost:8000/posts/create", data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          setPosts([...posts, response.data]);
        }
      })
      .catch((error) => console.log(error));
  };
  const classes = styles();
  const [selectedFile, setSelectedFile] = useState(undefined),
    [title, setTitle] = useState(""),
    [name, setName] = useState(""),
    [message, setMessage] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    postData({
      title: title,
      creator: name,
      message: message,
      selectedFile: selectedFile,
    });
  };
  return (
    <Grid container direction="column">
      <Typography variant="h4" align="center">
        NEW POST
      </Typography>
      <form noValidate autoComplete="off">
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
              className={classes.field}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Title"
              variant="outlined"
              className={classes.field}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Message"
              variant="outlined"
              className={classes.field}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
        <Grid item container alignItems="center">
          <Grid item>
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload Picture
              </Button>
            </label>
          </Grid>

          {selectedFile !== undefined && (
            <Grid item style={{ width: "35px", height: "35px" }}>
              <img
                src={selectedFile}
                alt="preview"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  marginLeft: "5px",
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
            onClick={(e) => handleFormSubmit(e)}
          >
            Post
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default Form;
