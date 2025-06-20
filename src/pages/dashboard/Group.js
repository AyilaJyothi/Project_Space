import {
  Stack,
  Box,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import React from "react";
import SearchIconWrapper from "../../components/Search/SerachIconWrapper";
import StyledInputBase from "../../components/Search/StyledInputBase";
import { MagnifyingGlass, Plus } from "phosphor-react";
import Search from "../../components/Search/Search";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";

const Group = () => {
  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* LEFT: Group List */}
      <Box
        sx={{
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.default,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Section */}
        <Stack p={3} spacing={2} sx={{ flexShrink: 0 }}>
          <Typography variant="h5">Groups</Typography>

          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2" component={Link}>
              Create New Group
            </Typography>
            <IconButton>
              <Plus style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Stack>

          <Divider />
        </Stack>

        {/* Scrollable Group List */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            <Stack spacing={2.4} px={3} pb={2}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              {ChatList.filter((el) => el.pinned).map((el) => (
                <ChatElement key={el.id} {...el} />
              ))}

              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                All Groups
              </Typography>
              {ChatList.filter((el) => !el.pinned).map((el) => (
                <ChatElement key={el.id} {...el} />
              ))}
            </Stack>
          </SimpleBarStyle>
        </Box>
      </Box>

      {/* RIGHT: Chat Placeholder */}
      <Box
        sx={{
          height: "100%",
            width: "calc(100vw - 420px )",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "6px solid #0162C4",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Select a group to start messaging
        </Typography>
      </Box>
    </Stack>
  );
};

export default Group;
