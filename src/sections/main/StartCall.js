import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";

import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../../components/CallElement";
import { CallList, MembersList } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../redux/slices/app";
import {faker} from "@faker-js/faker";
import Search from "../../components/Search/Search";
import SearchIconWrapper from "../../components/Search/SerachIconWrapper";
import StyledInputBase from "../../components/Search/StyledInputBase";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  // const {all_users} = useSelector((state) => state.app);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(FetchAllUsers());
//   }, []);

//   console.log(CallList, all_users, "Call List Info");

  // const list = all_users.map((el) => ({
  //   id: el?._id,
  //   name: `${el?.firstName} ${el?.lastName}`,
  //   image: faker.image.avatar(),
  // }));

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
      
    >
      <DialogTitle>{"Start New Conversation"}</DialogTitle>
      <Stack spacing={3}>
      <Stack p={1} sx={{ width: "100%" }}>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Stack>
      </Stack>
      <DialogContent>
        {/* <Stack sx={{ height: "100%" }}> */}
          {/* <Stack spacing={2.4}> */}
            {MembersList.map((el) => {
              return <CallElement {...el}  />;
            })}
            
          {/* </Stack> */}
        {/* </Stack> */}
        {/* <CallElement /> */}
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;