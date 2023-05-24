import { configureStore} from "@reduxjs/toolkit";
import noteSlice from "../features/notesSlice"; 
import spaceSlice from "../features/spaceSlice";


export const store = configureStore({
    reducer :{
        notes : noteSlice.reducer,
        space : spaceSlice.reducer,

    }
})