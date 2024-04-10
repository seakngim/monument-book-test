import { createSlice } from '@reduxjs/toolkit';
const initialState={
    allCreditCard: [],
    creditCardById: {},
    
}

export const CreditCard = createSlice({
name: "creditCard",
initialState,
reducers:{
    setAllCreditCard: (state, action)=>{
        state.allCreditCard = action.payload
    },
    setCreditCardById: (state, action)=>{
        state.creditCardById = action.payload
    }
 },
});
export const {setAllCreditCard,setCreditCardById} = CreditCard.actions;
export default CreditCard.reducer;
