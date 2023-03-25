import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  createTheme,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import test1 from "../imgs/test1.jpg";
import test2 from "../imgs/test2.jpg";
import test3 from "../imgs/test3.jpg";
import test4 from "../imgs/test3.jpg";

export const AppBody = () => {
  const [images, setImages] = useState([test1, test2, test3, test4]);

  return (
    <Grid container direction={"column"} spacing={3}>
      <Grid container item justifyContent="center">
        <Grid item xs={4}>
          <TextField
            id="standard-basic"
            label="Describe your image"
            variant="standard"
            fullWidth
            inputProps={{ style: { fontSize: 35 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        <Button
          variant="contained"
          style={{
            padding: "15px",
            backgroundColor: "#47E5BC",
            fontFamily: "Arial",
            fontWeight: "bold",
            borderRadius: 12,
          }}
        >
          Create image
        </Button>
      </Grid>
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        spacing={10}
        style={{ padding: 100 }}
      >
        {images.map((image) => (
          <Grid
            item
            container
            xs={3}
            justifyContent="center"
            alignContent="center"
          >
            <Card sx={{ maxHeight: 300 }} variant="outlined">
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="test"
                  height="100%"
                  image={image}
                />
                {/* <img
                src={image}
                style={{ height: "100%", width: "100%" }}
                alt={"test"}
              /> */}
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {/* <Grid
          item
          container
          xs={6}
          justifyContent="center"
          alignContent="center"
        >
          <Card sx={{ width: "50%", height: "50%" }}>
            <img src={images[0]} height={"50%"} width={"60%"} />
          </Card>
        </Grid>
        <Grid
          item
          container
          xs={6}
          justifyContent="center"
          alignContent="center"
        >
          <img src={images[1]} height={"50%"} width={"60%"} />
        </Grid>
        <Grid
          item
          container
          xs={6}
          justifyContent="center"
          alignContent="center"
        >
          <img src={images[2]} height={"50%"} width={"60%"} />
        </Grid>
        <Grid
          item
          container
          xs={6}
          justifyContent="center"
          alignContent="center"
        >
          <img src={images[3]} height={"50%"} width={"60%"} />
        </Grid> */}
      </Grid>
      <Grid container item justifyContent="center">
        <h1> Text field</h1>
      </Grid>
    </Grid>
  );
};
