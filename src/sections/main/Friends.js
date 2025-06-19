import { Dialog } from "@mui/material";
import React from "react";

const Friends = ({open,handleClose}) => {

    const {value, setValue} = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };      
    return (
       <Dialog fullWidth maxWidth="xs" open={open} keepMounted onClose={handleClose} sx={{p:4}}>

       </Dialog>
    );
}