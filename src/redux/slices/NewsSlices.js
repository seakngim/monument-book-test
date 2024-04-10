import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allNews: [],
    
}

export const NewsSlices = createSlice({
name: "News",
initialState,
reducers:{
    setAllNews: (state, action)=>{
        state.allNews = action.payload
    }
 },
});
export const {setAllNews} = NewsSlices.actions;
export default NewsSlices.reducer;
