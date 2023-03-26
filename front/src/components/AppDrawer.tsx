import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";

type AppDrawerProps = {
  drawerState: boolean;
  sessions: any[];
  setDrawerState: (open: boolean) => void;
};

export const AppDrawer: React.FunctionComponent<AppDrawerProps> = ({
  drawerState,
  sessions,
  setDrawerState,
}) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerState(open);
    };

  return (
    <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
      <List style={{minWidth: 200}}>
        <ListItem>
			<h4> History</h4>
        </ListItem>
          <Divider />
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <ListItem key={session.text}>
              <ListItemButton>
                <ListItemText primary={session.text} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <></>
        )}
        <Divider />
        <ListItem style={{ marginTop: 40 }}>
          <ListItemButton>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
