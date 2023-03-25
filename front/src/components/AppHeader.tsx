import { Divider, Grid } from "@mui/material";
import logo from "../imgs/tactile-images-logo.png";

export const AppHeader = () => {
  return (
    <Grid container>
      <Grid container item xs={12} style={{ padding: 10 }} alignItems="center ">
        {/* TODO make image high res */}
        <img src={logo} alt="Tactile Logo"/>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};
