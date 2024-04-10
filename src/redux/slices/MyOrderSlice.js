import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allUserOrder: [],
    
}

export const MyOrderslice = createSlice({
name: "Order",
initialState,
reducers:{
    setAllUserOrder: (state, action)=>{
        state.allUserOrder = action.payload
    }
 },
});
export const {setAllUserOrder} = MyOrderslice.actions;
export default MyOrderslice.reducer;
