import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, colorPallette } from "./constants";
import { Buffer } from "buffer";

export const LoginPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [successLogin, setSuccessLogin] = useState(true);

  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Box sx={{ height: "30vh" }} />
      </Grid>
      <Grid item>
        <Typography variant="h6" style={{ color: "gray" }}>
          Tactile Images Generator
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          inputProps={{ style: { fontSize: 20 } }}
          InputLabelProps={{ style: { fontSize: 15 } }}
          required
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
          error={!successLogin}
        />
      </Grid>
      <Grid item>
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          inputProps={{ style: { fontSize: 20 } }}
          InputLabelProps={{ style: { fontSize: 15 } }}
          required
          type="password"
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
          helperText={successLogin ? "" : "Incorrect email or password"}
          error={!successLogin}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          style={{ backgroundColor: colorPallette.cyan }}
          onClick={() => {
            if (userEmail === "" || userPassword === "") {
              setSuccessLogin(false);
            } else {
              console.log(userEmail);
              const base64encodedData = Buffer.from(
                `${userEmail}:${userPassword}`
              ).toString("base64");

              fetch(API_URL + "/api/prompts", {
                method: "GET",
                mode: "no-cors",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Basic ${base64encodedData}`,
                },
              }).then((res) => {
                console.log(res);
                if (res.ok !== true) {
                  setSuccessLogin(false);
                }
              })
              .then((json) => console.log(json));
            }
          }}
        >
          {" "}
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

/* <Grid
          container
          item
          xs={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
            required
          />
        </Grid>
        <Grid
          container
          item
          xs={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 15 } }}
            required
            type="password"
          />
        </Grid>
        <Grid container item justifyContent="center" alignItems="flex-start">
          Hey
        </Grid> */
