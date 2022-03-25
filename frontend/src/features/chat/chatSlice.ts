import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState} from '../../state/store';

export interface Message {
  from: string,
  contents: string,
}

interface ChatState {
  messages: Array<Message>,
  composing: string,
  sendingMessage: Message | null,
}

const initialState: ChatState = {
  messages: [{from: 'rgrasell', contents: 'Hello, world!'}],
  composing: '',
  sendingMessage: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    submitMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      state.sendingMessage = null;
    },
    setComposing: (state, action: PayloadAction<string>) => {
      state.composing = action.payload;
    },
    setSendingMessage: (state, action: PayloadAction<Message>) => {
      state.sendingMessage = action.payload;
    },
  },
});

export const { submitMessage, setComposing, setSendingMessage} = chatSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectComposing = (state: RootState) => state.chat.composing;
export const selectSendingMessage = (state: RootState) => state.chat.sendingMessage;

export default chatSlice.reducer;
