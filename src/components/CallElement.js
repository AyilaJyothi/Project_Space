import { Avatar, Badge, Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import StyledBadge from "./StyledBadge";
import { faker } from "@faker-js/faker";
import {  ArrowDownLeft, ArrowUpRight, Phone, VideoCamera } from "phosphor-react";

const CallLogElement=({missed,incoming,online,})=>{
    // const theme=useTheme();
    return(
        <>
        <Box sx={{width:"100%",borderRadius:1,
            backgroundColor:(theme)=>theme.palette.mode=="light" ? "#fff" : theme.palette.background.paper,
        }} p={2}>
            <Stack direction={"row"} alignItems={"center"} justifyContent="space-between" >
                 <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    {
                        online ? (
                            <StyledBadge overlap="circular" anchorOrigin={{vertical:"bottom",horizontal:"right"}}
                            variant="dot">
                                     <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}/>
                            </StyledBadge>
                        ):(
                           <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}/>
                        )
                    }

                     <Stack spacing={0.3}>
                        <Typography variant="subtitle2">
                            {faker.name.fullName()}
                        </Typography>
                        
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                        {
                            incoming ? ( <ArrowDownLeft color={missed ? "red ":"green"}/>) :
                            (<ArrowUpRight color={missed ? "red ":"green"}/>)
                        }
                        <Typography variant="caption">
                            yesterday 12:00
                        </Typography>
                    </Stack>
                 
                    </Stack>
                 </Stack>
        
                {/* <Stack direction={"row"} spacing={2}>
                    {
                        online ? (
                            <StyledBadge overlap="circular" anchorOrigin={{vertical:"bottom",horizontal:"right"}}
                            variant="dot">
                                    <Avatar src={faker.image.avatar()}/>
                            </StyledBadge>
                        ):(
                            <Avatar src={faker.image.avatar()}/>
                        )
                    }
                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">
                            {name}
                        </Typography>
                        <Typography variant="caption">
                            {msg}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={"center"}>
                    <Typography sx={{fontWeight:600}} variant="caption">
                        {time}
                    </Typography>
                    <Badge color="primary" badgeContent={unread}></Badge>
                </Stack> */}
                <IconButton>
                   <Phone color="green"/>
                </IconButton>

            </Stack>
            

        </Box>
        </>
    )
}

const CallElement=({online})=>{
    return(
        <>
        <Box sx={{width:"100%",borderRadius:1,
            backgroundColor:(theme)=>theme.palette.mode=="light" ? "#fff" : theme.palette.background.paper,
        }} p={2}>
            <Stack direction={"row"} alignItems={"center"} justifyContent="space-between" >
                 <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    {
                        online ? (
                            <StyledBadge overlap="circular" anchorOrigin={{vertical:"bottom",horizontal:"right"}}
                            variant="dot">
                                     <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}/>
                            </StyledBadge>
                        ):(
                           <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}/>
                        )
                    }

                     <Stack spacing={0.3}>
                        <Typography variant="subtitle2">
                            {faker.name.fullName()}
                        </Typography>
                        
                   
                 
                    </Stack>
                 </Stack>
        
                <Stack direction={"row"} alignItems={"center"}>
                    <IconButton>
                   <Phone color="green"/>
                </IconButton>
                    <IconButton>
                        <VideoCamera color="green"/>
                    </IconButton>
                </Stack>
            </Stack>
            

        </Box>
        </>
    )

}

export {CallElement,CallLogElement};