import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allAuthors: [],
    featureAuthor: [],
    authorById:{}
}

export const AuthorSlices = createSlice({
name: "author",
initialState,
reducers:{
    setAllAuthor: (state, action)=>{
        state.allAuthors = action.payload
    },
    setfeatureAuthor: (state, action)=>{
        state.featureAuthor = action.payload
    },
    setAuthorById: (state, action)=>{
        state.authorById = action.payload
    }
 },
});
export const {setAllAuthor,setfeatureAuthor,setAuthorById} = AuthorSlices.actions;
export default AuthorSlices.reducer;
