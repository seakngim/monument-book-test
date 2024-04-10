import { createSlice } from '@reduxjs/toolkit';
const initialState={
    userProfiles: [],    
}

export const UserProfileSlice = createSlice({
name: "userProfile",
initialState,
reducers:{
    setUserProfile: (state, action)=>{
        state.userProfiles = action.payload
    }
 },
});
export const {setUserProfile} = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
