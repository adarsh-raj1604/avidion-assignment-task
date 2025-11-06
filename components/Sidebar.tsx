"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
import SettingsIcon from "@mui/icons-material/Settings";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const sidebar = (
    <Box
      sx={{
        bgcolor: "#0B132B",
        height: "100%",
        color: "white",
        pt: 3,
      }}
    >
      <List>
        <ListItemButton component={Link} href="/dashboard">
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} href="/campaigns">
          <ListItemIcon>
            <CampaignIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Campaigns" />
        </ListItemButton>

        <ListItemButton component={Link} href="/settings">
          <ListItemIcon>
            <SettingsIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={() => setMobileOpen(true)}
        sx={{
          display: { md: "none" },
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 2000,
          bgcolor: "white",
          color: "black",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#0B132B",
            color: "white",
          },
        }}
      >
        {sidebar}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#0B132B",
            color: "white",
          },
        }}
        open
      >
        {sidebar}
      </Drawer>
    </>
  );
}
