import { createSlice } from "@reduxjs/toolkit";

import { dispatch } from "../store";

const initialState={
    sidebar:{
        open:false,
        type:"CONTACT",
    }
}

const slice=createSlice({
    name:'app',
    initialState,
    reducers:{
        toggleSidebar(state,action){
            state.sidebar.open=!state.sidebar.open;
        },
        updateSidebarType(state,action){
            state.sidebar.type=action.payload.type;
        }
    }
});

export default slice.reducer;

export function ToggleSidebar(){
    return async()=>{
        dispatch(slice.actions.toggleSidebar());
    }
}

export function updateSidebarType(type){
    return async()=>{
        dispatch(slice.actions.updateSidebarType({
            type,
        }))
    }
}

// export function FetchAllUsers() {
//   return async (dispatch, getState) => {
//     await axios
//       .get(
//         "/user/get-all-verified-users",

//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getState().auth.token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response);
//         dispatch(slice.actions.updateAllUsers({ users: response.data.data }));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }