import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat/chat"
export const store = configureStore({
    reducer:{
        chat: chatReducer
    },
    devTools:true
})