import { Box, Grid, TextField } from "@mui/material";
import { AppBody } from "./AppBody";
import { AppHeader } from "./AppHeader";
import background from "../imgs/background.jpg"

export const Dashboard = () => {
  return (

    <Grid container>
      <AppHeader />
      <Box sx={{height: 100}}/>
      <AppBody />
    </Grid>
  );
};
