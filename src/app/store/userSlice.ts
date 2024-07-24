import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IUserState {
  connectedWalletAdress?: string;
  email?: string;
}

const initialState: IUserState = {
  connectedWalletAdress: undefined,
  email: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setConnectedWalletAddress: (state, action: PayloadAction<string>) => {
      state.connectedWalletAdress = action.payload;
    },
    setUserEmailAddress: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    }
  }
});

export const { setConnectedWalletAddress, setUserEmailAddress } = userSlice.actions;

export default userSlice.reducer;
