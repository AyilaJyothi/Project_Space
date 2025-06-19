import React from 'react';
import {
  Stack,
  Box,
} from "@mui/material";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';




const Conversation = () => {

  return (
    <Stack
      height="100vh"
      direction="column"
      sx={{ display: "flex" }}
    >
      {/* Chat Header */}
      <Header/>

      {/* Message Area */}
      <Box
        width="100%"
        sx={{ flexGrow: 1, overflowY: "scroll", scrollbarWidth: "none", height:"100%",p: 2 }}
      >
        <Message menu={true}/>
      </Box>

      {/* Chat Footer */}
      <Footer/>
      
    </Stack>
  );
};

export default Conversation;