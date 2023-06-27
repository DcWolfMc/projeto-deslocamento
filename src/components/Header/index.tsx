import {
  AppBar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Link from "next/link";

interface NavegationItemType {
  name: string;
  expendedList: { name: string; link: string }[];
}
const drawerWidth = 282;

export const Header: FunctionComponent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGruop, setOpenGroup] = useState([false, false, false, false]);
  const handleExpandListGroup = (index: number) => {
    setOpenGroup((prev) => [
      ...prev.slice(0, index),
      !prev[index],
      ...prev.slice(index + 1),
    ]);
  };
  const handleDrawerToggle = () => {
    console.log("click");
    setMobileOpen((prevState) => !prevState);
  };

  const navItems: NavegationItemType[] = [
    {
      name: "Clientes",
      expendedList: [
        { name: "Listagem de Clientes", link: "/cliente" },
        { name: "Cadastrar Cliente", link: "/cliente/new/" },
      ],
    },
    {
      name: "Condutores",
      expendedList: [
        { name: "Listagem de condutores", link: "/condutor" },
        { name: "Cadastrar condutor", link: "/condutor/new" },
      ],
    },
    {
      name: "Deslocamento",
      expendedList: [
        { name: "Listagem de Deslocamentos", link: "/deslocamento" },
        { name: "Novo Deslocamento", link: "/deslocamento/new" },
      ],
    },
    {
      name: "Veículos",
      expendedList: [
        { name: "Listagem de veículos", link: "/veiculo" },
        { name: "Cadastrar veículo", link: "/veiculo/new" },
      ],
    },
  ];
  const drawer = (
    <Box>
      <Toolbar>
        <Link href={"/"}>
          <Typography variant="h6" noWrap component="div">
            LOGO
          </Typography>
        </Link>
      </Toolbar>
      {navItems.map((item, index) => (
        <Box key={item.name}>
          <Divider />
          <List sx={{ padding: 0 }}>
            <ListItemButton onClick={() => handleExpandListGroup(index)}>
              <ListItemText primary={item.name} />
              {openGruop[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={openGruop[index]}
              timeout="auto"
              unmountOnExit
              sx={{ bgcolor: "secondary.dark" }}
            >
              {item.expendedList.map((expendedItem, index) => (
                <List key={expendedItem.name} component="div" disablePadding>
                  <Divider />
                  <Link href={expendedItem.link}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={expendedItem.name} />
                    </ListItemButton>
                  </Link>
                </List>
              ))}
            </Collapse>
          </List>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box
      content="header"
      sx={{
        zIndex: 10,
      }}
    >
      <AppBar content="div">
        <Toolbar sx={{ flexDirection: "row", gap: 4 }}>
          {/* Menu Button for responsive drawer */}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div">
            LOGO
          </Typography>
          {/* Start of the collapsible list navbar*/}

          <Box
            content="nav"
            sx={{
              flexGrow: 1,
              flexDirection: "row",
              display: { xs: "none", md: "flex" },
              gap: 2,
            }}
          >
            {navItems.map((item, index) => (
              <List
                key={item.name}
                sx={{
                  bgcolor: "primary.main",
                  zIndex: 10,
                  maxWidth: 260,
                  flexGrow: 1,
                }}
              >
                <ListItemButton onClick={() => handleExpandListGroup(index)}>
                  <ListItemText primary={item.name} />
                  {openGruop[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openGruop[index]}
                  timeout="auto"
                  unmountOnExit
                  sx={{
                    bgcolor: "inherit",
                    width: "100%",
                    position: "absolute",
                  }}
                >
                  {item.expendedList.map((expendedItem, index) => (
                    <List
                      key={expendedItem.name}
                      component="div"
                      disablePadding
                    >
                      <Divider />
                      <Link href={expendedItem.link}>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={expendedItem.name} />
                        </ListItemButton>
                      </Link>
                    </List>
                  ))}
                </Collapse>
              </List>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { md: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "primary.main",
            color: "text.secondary",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
