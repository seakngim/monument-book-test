import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allSupplier: [],
    
}

export const SupplierSlices = createSlice({
name: "search",
initialState,
reducers:{
    setallAllSupplier: (state, action)=>{
        state.allSupplier = action.payload
    }
 },
});
export const {setallAllSupplier} = SupplierSlices.actions;
export default SupplierSlices.reducer;
