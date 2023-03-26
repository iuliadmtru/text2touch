import { Button, Divider, Grid, IconButton, Menu } from "@mui/material";
import logo from "../imgs/tactile-images-logo.png";
import MenuIcon from '@mui/icons-material/Menu';

type AppHeaderProps = {
  setDrawerState: (open: boolean) => void;
}

export const AppHeader: React.FunctionComponent<AppHeaderProps> = ({setDrawerState}) => {
  return (
    <Grid container>
      <Grid container item xs={12} style={{ padding: 10 }} alignItems="center ">
        <IconButton onClick={() => {setDrawerState(true)}} style={{marginRight: 20}}>
            <MenuIcon />
        </IconButton>
        {/* TODO make image high res */}
        <a href="https://tactileimages.org/en/home/">
          <img src={logo} alt="Tactile Logo" />
        </a>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};
