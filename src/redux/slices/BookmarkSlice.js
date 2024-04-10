import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allUserBookmark: [],
    
}

export const Bookmarkslice = createSlice({
name: "Bookmark",
initialState,
reducers:{
    setAllUserBookmark: (state, action)=>{
        state.allUserBookmark = action.payload
    }
 },
});
export const {setAllUserBookmark} = Bookmarkslice.actions;
export default Bookmarkslice.reducer;
