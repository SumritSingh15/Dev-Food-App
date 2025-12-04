    import { createSlice } from "@reduxjs/toolkit";

    const UserSlice = createSlice({
    name: "user",
    initialState: null,     // <-- FIXED (comma added)
    reducers: {
        addUser: (state, action) => {
        return action.payload;
        },
        removerUser: (state, action) => {
        return null;
        },
    },
    });

    export const { addUser, removerUser } = UserSlice.actions;
    export default UserSlice.reducer;
