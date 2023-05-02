import { createSlice } from "@reduxjs/toolkit";



const init = {
    title: "",
    imgUrl: ""}


const spaceSlice = createSlice({
    name:"counter",
    initialState: init,
    reducers:{
        setSpace: (state,action)=> {
            state.title = action.payload.title
            state.imgUrl = action.payload.imgUrl

        }
    }
})

export default spaceSlice
export const {setSpace} = spaceSlice.actions