import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allCart: [],
    
}

export const CartSlice = createSlice({
name: "cart",
initialState,
reducers:{
    setAllCart: (state, action)=>{
        state.allCart = action.payload
    }
 },
});
export const {setAllCart} = CartSlice.actions;
export default CartSlice.reducer;
