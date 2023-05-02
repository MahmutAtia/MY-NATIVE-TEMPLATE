import { configureStore} from "@reduxjs/toolkit";
import counterSlice from "../features/counterSlice";
import spaceSlice from "../features/spaceSlice";


export const store = configureStore({
    reducer :{
        counter : counterSlice.reducer,
        space : spaceSlice.reducer,

    }
})