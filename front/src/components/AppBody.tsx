import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
// import saveAs from "file-saver";
import { saveAs } from "file-saver";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { API_URL } from "./constants";
import { Buffer } from "buffer";


interface img {
  data: string,
  id: number
}

type AppBodyProps = {
  images: img[],
  setImages: any
}

export const AppBody: React.FunctionComponent<AppBodyProps> = ({images, setImages}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const [dataArrived, setDataArrived] = useState(true);
  
  
  const perspectives = ["front", "lateral"];
  const [perspective, setPerspective] = useState("");

  const [prompt, setPrompt] = useState("");

  const engines = ["GPT3", "DALLE2"];
  const [selectedEngine, setSelectedEngine] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPerspective(event.target.value as string);
  };

  useEffect(() => { 
    if (images.length > 0)
      setDataArrived(true);
    setSelectedIndex(-1);
  }, [images])

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
            onChange={(event) => {setPrompt(event.target.value);}}

            id="standard-basic"
            label="Describe your image"
            variant="standard"
            fullWidth
            inputProps={{ style: { fontSize: 35 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="perspective-label">
                Select perspective
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
        <Grid item xs={2}>

          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
              <InputLabel id="perspective-label">
                Select engine
              </InputLabel>
              <Select label="Engine" value={selectedEngine}
                onChange={(event) => {
                  setSelectedEngine(event.target.value);
                  console.log(event.target.value);
                }}>
                {engines.map((engine) => (
                  <MenuItem key={engine} value={engine}>
                    {engine}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        {!dataArrived && images.length === 0 ? (
          <CircularProgress
            style={{
              padding: "15px",
              color: "#47E5BC",
            }}
          />
        ) : (
          <Button
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
              setSelectedIndex(-1);
              
              const username = localStorage.getItem("user");
              const pass = localStorage.getItem("password");

              const base64encodedData = Buffer.from(
                `${username}:${pass}`
              ).toString("base64");
                
              const requestBody = {
                method: "POST",
                headers: {
                  'Content-Type' : 'application/json',
                  'Authorization' : 'Basic ' + base64encodedData
                },
                body: JSON.stringify({
                  "user": localStorage.getItem("url"),
                  "prompt": prompt,
                  "method": selectedEngine
                })
              }
              // console.log(requestBody);
              fetch(API_URL + "/api/prompts/", requestBody).then(data => data.json()).then(json => {setImages(json.images); setSelectedIndex(-1)}).catch(error => alert("Invalid key"));
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
        {images.map((image, index) => {
          return (
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
                  index === selectedIndex
                    ? {
                        maxHeight: 600,
                        borderColor: "#47E5BC",
                        borderWidth: 3,
                      }
                    : { maxHeight: 600 }
                }
                variant="outlined"
              >
                <CardActionArea
                  onClick={() => {
                    images.map((item, index1) =>
                      {if (index1 === selectedIndex) {
                        setSelectedIndex(-1)
                      } else
                      setSelectedIndex(index)
                      }
                    );
                  }}
                >
                  <img height={"100%"} width={"100%"} src={"data:image/svg+xml;base64," + image.data} alt={index + ""} />
                </CardActionArea>
              </Card>
            </motion.div>
          </Grid>
        )
                }
        )}
      </Grid>
      <Grid container item justifyContent="center" alignItems="flex-start">
        {selectedIndex !== -1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <ButtonGroup size="large">
              <Button
                onClick={() => {
                  saveAs("data:image/svg+xml;base64," + images[selectedIndex].data, "image.svg");
                }}
                style={{
                  borderColor: "#47E5BC",
                  color: "#47E5BC",
                  borderWidth: 3,
                  fontWeight: "bold",
                  marginRight: 20,
                }}
              >
                Download Image
              </Button>
              <Button
                onClick={() => {
                  window.open("https://editor.tactileimages.org/draw#import_" + prompt, "_blank");
                }}
                style={{
                  borderColor: "#47E5BC",
                  color: "#47E5BC",
                  borderWidth: 3,
                  fontWeight: "bold",
                }}
              >
                Modify in editor
              </Button>
            </ButtonGroup>
          </motion.div>
        )}
      </Grid>
    </Grid>
  );
};
