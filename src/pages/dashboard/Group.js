import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Link,
  IconButton,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import SearchIconWrapper from "../../components/Search/SerachIconWrapper";
import StyledInputBase from "../../components/Search/StyledInputBase";
import { MagnifyingGlass, Plus } from "phosphor-react";
import Search from "../../components/Search/Search";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { io } from "socket.io-client";
import dayjs from "dayjs";

const socket = io("http://localhost:9000");

const Group = () => {
  const theme = useTheme();

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const currentUserId = JSON.parse(localStorage.getItem("user"))?._id;

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setGroupName("");
    setGroupDescription("");
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/groups/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: groupName,
          description: groupDescription,
          members: [],
        }),
      });
      const newGroup = await res.json();
      setGroups((prev) => [...prev, newGroup]);
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to create group:", err);
    }
  };

  useEffect(() => {
    fetch("http://localhost:9000/api/groups")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data);
      })
      .catch((err) => console.error("❌ Error fetching groups:", err));
  }, []);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setGroups((prevGroups) =>
        prevGroups.map((g) =>
          g._id === msg.group
            ? { ...g, messages: [msg, ...(g.messages || [])] }
            : g
        )
      );
    });

    return () => socket.off("receive-message");
  }, []);

  useEffect(() => {
    if (selectedGroup?._id) {
      socket.emit("join-group", selectedGroup._id);
    }
  }, [selectedGroup]);

  const sendMessage = () => {
    if (!messageText.trim() || !selectedGroup) return;

    const msgPayload = {
      groupId: selectedGroup._id,
      senderId: currentUserId,
      content: messageText.trim(),
    };

    socket.emit("send-message", msgPayload);
    setMessageText("");
  };

  return (
    <Stack direction="row" sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Left Panel */}
      <Box
        sx={{
          width: 320,
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack p={3} spacing={2}>
          <Typography variant="h5">Groups</Typography>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" component={Link} onClick={handleOpenDialog} sx={{ cursor: "pointer" }}>
              Create New Group
            </Typography>
            <IconButton onClick={handleOpenDialog}>
              <Plus style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Stack>
          <Divider />
        </Stack>

        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            <Stack spacing={2.4} px={3} pb={2}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                All Groups
              </Typography>

              {groups.length === 0 ? (
                <Typography>No groups found.</Typography>
              ) : (
                groups
                  .filter((group) =>
                    group.name?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((group) => {
                    const lastMsg = group.messages?.[0];
                    const memberAvatar = group.members?.[0]?.avatar || "";
                    const memberInitial = group.members?.[0]?.firstName?.[0] || group.name?.[0] || "G";

                    return (
                      <Box
                        key={group._id}
                        onClick={() => setSelectedGroup(group)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 1,
                          borderBottom: "1px solid #eee",
                          cursor: "pointer",
                          borderRadius: 1,
                          backgroundColor: selectedGroup?._id === group._id ? "#E6F0FF" : "transparent",
                        }}
                      >
                        <Avatar src={memberAvatar}>{memberInitial}</Avatar>
                        <Box>
                          <Typography variant="subtitle1">{group.name || "Unnamed Group"}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lastMsg
                              ? `${lastMsg.sender?.firstName || "User"}: ${lastMsg.content}`
                              : "No messages yet"}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })
              )}
            </Stack>
          </SimpleBarStyle>
        </Box>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          height: "100%",
          width: "calc(100vw - 420px)",
          backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : theme.palette.background.paper,
          display: "flex",
          flexDirection: "column",
          p: 2,
          overflowY: "auto",
        }}
      >
        {selectedGroup ? (
          <>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              {selectedGroup.name}
            </Typography>

            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              {selectedGroup.messages?.length > 0 ? (
                selectedGroup.messages.map((msg, index) => {
                  const isSelf = msg.sender?._id === currentUserId;

                  return (
                    <Stack key={index} direction="row" justifyContent={isSelf ? "flex-end" : "flex-start"}>
                      {!isSelf && <Avatar sx={{ mr: 1 }}>{msg.sender?.firstName?.[0] || "U"}</Avatar>}
                      <Box
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          backgroundColor: isSelf ? theme.palette.primary.main : "#e0e0e0",
                          color: isSelf ? "#fff" : "#000",
                          maxWidth: "60%",
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {isSelf ? "You" : msg.sender?.firstName || "User"}
                        </Typography>
                        <Typography variant="body2">{msg.content}</Typography>
                        <Typography variant="caption" sx={{ display: "block", textAlign: "right", mt: 0.5 }}>
                          {dayjs(msg.sentAt).format("hh:mm A")}
                        </Typography>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No messages yet.
                </Typography>
              )}
            </Stack>

            <Stack direction="row" spacing={2} mt={2}>
              <TextField
                fullWidth
                placeholder="Type your message..."
                variant="outlined"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button variant="contained" onClick={sendMessage}>
                Send
              </Button>
            </Stack>
          </>
        ) : (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Select a group to start messaging
            </Typography>
          </Box>
        )}
      </Box>

      {/* Create Group Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: "300px",
            minWidth: "600px",
            p: 3,
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Group;
