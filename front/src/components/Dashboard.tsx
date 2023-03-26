import { Box, Grid, TextField } from "@mui/material";
import { AppBody } from "./AppBody";
import { AppHeader } from "./AppHeader";
import background from "../imgs/background.jpg";
import { useEffect, useState } from "react";
import { AppDrawer } from "./AppDrawer";
import { useNavigate } from "react-router";
import { API_URL } from "./constants";
import { Buffer } from "buffer";
import test1 from "../imgs/test1.jpg";
import test2 from "../imgs/test2.jpg";
import test3 from "../imgs/test3.jpg";
import test4 from "../imgs/this_svg.svg";


type storage = string | null;

export const Dashboard = () => {

  const navigate = useNavigate();

  const [drawerState, setDrawerState] = useState(false);
  const [sessions, setSessions] = useState([
    {
      text: "Text1",
    },
    {
      text: "Text 2",
    },
    {
      text: "Text3",
    },
  ]);

  interface img {
    data: string,
    id: number
  }

  const username = localStorage.getItem("user");
  const pass = localStorage.getItem("password");

  const [images, setImages] = useState([]);

  const [currentSession, setCurrentSession] = useState({
    created: '0',
    id: -1,
    images: [],
    method: "x",
    prompt: "x",
    url: "",
    user: "",
  });


   const base64encodedData = Buffer.from(
     `${username}:${pass}`
   ).toString("base64");

  useEffect(() => {
    fetch(API_URL + "/api/prompts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64encodedData,
      },
    }).then(data => data.json()).then(json => {
      console.log(json);
      setSessions(json)});
  }, []);

  useEffect(() => {
    setImages(currentSession.images);
  }, [currentSession]);
  return (

    <Grid container>
      <AppDrawer
        drawerState={drawerState}
        sessions={sessions}
        setDrawerState={setDrawerState}
        setCurrentSession={setCurrentSession}
      />
      <AppHeader setDrawerState={setDrawerState}/>
      <Box sx={{ height: 100 }} />
      <AppBody images={images} setImages={setImages}/>
    </Grid>
  );
};
