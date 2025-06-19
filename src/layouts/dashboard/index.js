import { Avatar, Box, Divider, IconButton, Stack, Switch, useTheme} from "@mui/material";
import { Gear, Palette } from "phosphor-react";
import React from "react";
import { Outlet } from "react-router-dom";
import {Nav_Buttons} from "../../data";
import { useState } from "react";
import { faker } from '@faker-js/faker';
import {styled} from "@mui/material";
import useSettings from "../../hooks/useSettings"
import Sidebar from "./Sidebar";




const DashboardLayout = () => {

  return (
    <Stack direction={"row"}>
     {/*Sidebar */}
     <Sidebar />
     <Outlet />
    </Stack>
  );
};


export default DashboardLayout;
