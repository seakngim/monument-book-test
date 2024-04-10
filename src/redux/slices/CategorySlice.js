import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allCategory: [],
    categoryById:[],
    
}

export const CategorySlice = createSlice({
name: "Category",
initialState,
reducers:{
    setAllCategory: (state, action)=>{
        state.allCategory = action.payload
    },
    setCategoryById: (state, action)=>{
        state.categoryById = action.payload
    },
  
 },
});
export const {setAllCategory,setCategoryById} = CategorySlice.actions;
export default CategorySlice.reducer;
