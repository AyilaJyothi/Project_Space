import React from "react";
import { Box, Typography, Avatar, Stack, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";

const GroupMessage = ({ group }) => {
  const theme = useTheme();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id;// Replace with dynamic logic

  return (
    <Box
      sx={{
        height: "100%",
        width: "calc(100vw - 420px)",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#f5f5f5"
            : theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        p: 2,
        overflowY: "auto",
      }}
    >
      {group ? (
        <>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            {group.name}
          </Typography>

          {group.messages?.length > 0 ? (
            <Stack spacing={2}>
              {group.messages.map((msg, index) => {
                const isSelf = msg.sender?._id === currentUserId;

                return (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent={isSelf ? "flex-end" : "flex-start"}
                  >
                    {!isSelf && (
                      <Avatar sx={{ mr: 1 }}>
                        {msg.sender?.firstName?.[0] || "U"}
                      </Avatar>
                    )}

                    <Paper
                      elevation={2}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: isSelf
                          ? theme.palette.primary.main
                          : "#e0e0e0",
                        color: isSelf ? "#fff" : "#000",
                        maxWidth: "60%",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600 }}
                      >
                        {isSelf ? "You" : msg.sender?.firstName || "User"}
                      </Typography>
                      <Typography variant="body2">{msg.content}</Typography>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", textAlign: "right", mt: 0.5 }}
                      >
                        {dayjs(msg.sentAt).format("hh:mm A")}
                      </Typography>
                    </Paper>
                  </Stack>
                );
              })}
            </Stack>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No messages yet.
            </Typography>
          )}
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
  );
};

export default GroupMessage;
