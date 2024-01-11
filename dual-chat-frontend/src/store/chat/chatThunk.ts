import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError, setLoadingAI } from './chat';

export const sendMessageToAI = createAsyncThunk(
    'chat/sendMessage',
    async (question:string, { dispatch }) => {
      dispatch(setLoadingAI(true));
      try {
        const response = await axios.post('http://localhost:3000/chat/message', { question });
        return response.data;
      } catch (error) {
        console.error(error.message);
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          dispatch(setError(errorMessage)); 
        }
        return error;
      } finally {
        dispatch(setLoadingAI(false));
      }
    }
  );