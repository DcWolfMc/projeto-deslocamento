import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Box, Divider } from "@mui/material";
export default function NestedList() {
  const [openGruop, setOpenGroup] = React.useState([false]);
  const handleClick = (index: number) => {
    setOpenGroup((prev) => [
      ...prev.slice(0, index),
      !prev[index],
      ...prev.slice(index + 1)
    ]);
  };

  return (
    <Box
      sx={{
        zIndex:12,
        position: "fixed",
        backgroundColor: "red",
        display: "flex",
        flexDirection: "row",
        gap:4
      }}
    >
      <List
        sx={{ zIndex: 11, maxWidth: 260, flexGrow: 1, bgcolor: "green" }}
        component="nav"
      >
        <ListItemButton onClick={() => handleClick(1)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="newInbox" />
          {openGruop[1] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={openGruop[1]}
          timeout="auto"
          unmountOnExit
          sx={{ backgroundColor: "inherit",width:"100%", position: "absolute" }}
        >
          <List component="div" disablePadding>
            <Divider />
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              s
              <ListItemText primary="Starred" />
            </ListItemButton>
            <Divider />
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>



      <List
        sx={{ zIndex: 11, maxWidth: 260, flexGrow: 1, bgcolor: "green" }}
        component="nav"
      >
        <ListItemButton onClick={() => handleClick(2)}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="newInbox" />
          {openGruop[2] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={openGruop[2]}
          timeout="auto"
          unmountOnExit
          sx={{ position: "absolute" }}
        >
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
