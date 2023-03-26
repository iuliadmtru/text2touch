import { Box, Grid, TextField } from "@mui/material";
import { AppBody } from "./AppBody";
import { AppHeader } from "./AppHeader";
import background from "../imgs/background.jpg";
import { useState } from "react";
import { AppDrawer } from "./AppDrawer";

export const Dashboard = () => {
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

  return (
    <Grid container>
      <AppDrawer
        drawerState={drawerState}
        sessions={sessions}
        setDrawerState={setDrawerState}
      />
      <AppHeader setDrawerState={setDrawerState}/>
      <Box sx={{ height: 100 }} />
      <AppBody />
    </Grid>
  );
};
