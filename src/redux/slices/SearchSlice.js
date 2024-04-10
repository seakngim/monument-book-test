import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allSearch: [],
    
}

export const SearchSlices = createSlice({
name: "search",
initialState,
reducers:{
    setallSearch: (state, action)=>{
        state.allSearch = action.payload
    }
 },
});
export const {setallSearch} = SearchSlices.actions;
export default SearchSlices.reducer;
