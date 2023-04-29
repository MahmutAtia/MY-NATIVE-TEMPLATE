import { createSlice } from "@reduxjs/toolkit";



const init = {num:0}
const counterSlice = createSlice({
    name:"counter",
    initialState: init,
    reducers:{
        add: state=> {state.num++}
    }
})

export default counterSlice
export const {add} = counterSlice.actions