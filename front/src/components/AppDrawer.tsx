import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";

type AppDrawerProps = {
  drawerState: boolean;
  sessions: any[];
  setDrawerState: (open: boolean) => void;
  setCurrentSession: any;
};

export const AppDrawer: React.FunctionComponent<AppDrawerProps> = ({
  drawerState,
  sessions,
  setDrawerState,
  setCurrentSession
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

    const navigate = useNavigate();

  return (
    <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
      <List style={{ minWidth: 200 }}>
        <ListItem>
          <h4> History</h4>
        </ListItem>
        <Divider />
        {sessions.length > 0 ? (
          sessions.map((session, index) => {
            
              console.log(session);
            
            return (
              <ListItem key={index}>
                <ListItemButton onClick={() => {setCurrentSession(session)}}>
                  <ListItemText primary={session.prompt} />
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <></>
        )}
        <Divider />
        <ListItem style={{ marginTop: 40 }}>
          <ListItemButton onClick={() => {
              localStorage.clear();
              navigate("/");
          }
          }>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
