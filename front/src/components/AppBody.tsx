import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  CircularProgress,
  createTheme,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import test1 from "../imgs/test1.jpg";
import test2 from "../imgs/test2.jpg";
import test3 from "../imgs/test3.jpg";
import test4 from "../imgs/test3.jpg";

export const AppBody = () => {
  const [images, setImages] = useState([test1, test2, test3, test4]);
  const [selected, setSelected] = useState([false, false, false, false]);
  const [perspective, setPerspective] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [dataArrived, setDataArrived] = useState(true);

  const perspectives = ["front", "left", "right", "back"];

  const handleChange = (event: SelectChangeEvent) => {
    setPerspective(event.target.value as string);
  };

  return (
    <Grid container direction={"column"} spacing={3}>
      <Grid
        container
        item
        justifyContent="center"
        spacing={5}
        alignItems="flex-end"
      >
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
        <Grid item>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="perspective-label">
                Select a perspective
              </InputLabel>
              <Select
                value={perspective}
                label="Select perspective"
                onChange={handleChange}
              >
                {perspectives.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        {!dataArrived ? (
          <CircularProgress
            style={{
              padding: "15px",
              color: "#47E5BC",
            }}
          />
        ) : (
          <Button
            className="myButton"
            variant="contained"
            style={{
              padding: "15px",
              backgroundColor: "#47E5BC",
              fontFamily: "Arial",
              fontWeight: "bold",
              borderRadius: 12,
            }}
            onClick={() => {
              setDataArrived(false);
              setImages([]);
              setSelected([]);
              setSelectedIndex(-1);
            }}
          >
            Create image
          </Button>
        )}
      </Grid>
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        spacing={10}
        style={{ padding: 100 }}
      >
        {images.map((image, index) => (
          <Grid
            item
            container
            xs={3}
            justifyContent="center"
            alignContent="center"
          >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  sx={
                    selected[index]
                      ? {
                          maxHeight: 300,
                          borderColor: "#47E5BC",
                          borderWidth: 3,
                        }
                      : { maxHeight: 300 }
                  }
                  variant="outlined"
                >
                  <CardActionArea
                    onClick={() => {
                      const newSelected = [...selected];
                      newSelected.map((item, index1) =>
                        index1 === index
                          ? (newSelected[index1] = !newSelected[index1])
                          : (newSelected[index1] = false)
                      );
                      setSelected(newSelected);
                      // it can be a problem
                      setSelectedIndex(index);
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="test"
                      height="100%"
                      image={image}
                    />
                  </CardActionArea>
                </Card>
              </motion.div>
          </Grid>
        ))}
      </Grid>
      <Grid container item justifyContent="center">
        {selected.filter((item) => item === true).length !== 0 && (
          <Button
            onClick={() => {
              console.log(selectedIndex);
            }}
          >
            Click me{" "}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
