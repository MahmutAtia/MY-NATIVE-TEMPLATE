import { createSlice } from "@reduxjs/toolkit";



const init = {
    onProgress:[],
    completed:[],
    
}
const noteSlice = createSlice({
    name:"notes",
    initialState: init,
    reducers:{
        setOnProgress: (state,action)=> {state.onProgress = [...state.onProgress,action.payload]},
        setCompleted: (state,action)=> {state.completed = [...state.completed,action.payload]},
        addToOnProgress: (state,action)=> {state.onProgress.push(action.payload)},
        addToCompleted: (state,action)=> {state.completed.push(action.payload)},
        removeFromOnProgress: (state,action)=> {state.onProgress = state.onProgress.filter(item => item.id !== action.payload.id)},
        removeFromCompleted: (state,action)=> {state.completed = state.completed.filter(item => item.id !== action.payload.id)},
    }
})

export default noteSlice
export const {setOnProgress,setCompleted,addToOnProgress,addToCompleted,removeFromOnProgress,removeFromCompleted} = noteSlice.actions