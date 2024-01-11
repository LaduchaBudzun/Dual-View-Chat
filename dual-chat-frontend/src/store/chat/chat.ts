import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { sendMessageToAI } from './chatThunk';
import { ROLE_ASSISTANT } from '../../constants/main-constants';
import { ErrorType, IChatState, IMessage } from '../../interfaces';

const initialState:IChatState = {
  messagesUser: [],
  messagesAI: [],
  loadingAI: false,
  error: null ,
  inputUser: ''
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessageUser: (state, action: PayloadAction<IMessage>) => {
      state.messagesUser.unshift(action.payload);
    },
    addMessageAI: (state, action: PayloadAction<IMessage>) => {
        state.messagesAI.unshift(action.payload);
      },
    setLoadingAI: (state, action:PayloadAction<boolean>) => {
      state.loadingAI = action.payload;
    },
    setError: (state, action:PayloadAction<string>) => {
      state.error = action.payload;
    },
    setInputUser(state, action: PayloadAction<string>){
      state.inputUser = action.payload
    }
  },
  extraReducers:(builder) => {
    builder
      .addCase(sendMessageToAI.pending, (state) => {
        state.loadingAI = true
      })
      .addCase(sendMessageToAI.fulfilled, (state, action: PayloadAction<{ content: string }>) => {
        if(!action.payload.content) return
        const newMessage:IMessage = {role: ROLE_ASSISTANT, content: action.payload.content, id: new Date().getTime()};
        state.messagesAI.unshift(newMessage);
      })
      // .addCase(sendMessageToAI.rejected, (state, action) => {
      //   state.error = action.payload;
      // });
  }
});

export const { addMessageUser, setLoadingAI,addMessageAI,setError,setInputUser } = chatSlice.actions;
export default chatSlice.reducer;
