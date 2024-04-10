import { createSlice } from '@reduxjs/toolkit';
const initialState={
    bestSelling: [],
    bookOfTheWeek: [],
    newArrival :[],
    allBook:[],
    bookbyId:[],
    bookImport:[]
    
}

export const BookSlice = createSlice({
name: "Book",
initialState,
reducers:{
    setBestSelling: (state, action)=>{
        state.bestSelling = action.payload
    },
    setBookOfTheWeek:(state,action)=>{
        state.bookOfTheWeek = action.payload
    },
    setNewArrival:(state,action)=>{
        state.newArrival = action.payload
    },
    setAllBook:(state,action)=>{
        state.allBook = action.payload
    },
    setBookById:(state,action)=>{
        state.bookbyId = action.payload
    },
    setAllImport:(state,action)=>{
        state.bookImport = action.payload
    }
 },
});
export const {setAllImport,setBestSelling,setBookOfTheWeek,setNewArrival,setAllBook,setBookById} = BookSlice.actions;
export default BookSlice.reducer;
