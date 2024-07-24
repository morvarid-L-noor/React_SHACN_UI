import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';

interface ModalState {
  open: boolean;
  icon?: null | ReactNode;
}
interface IModalSlice {
  successModal: ModalState;
}

const initialState: IModalSlice = {
  successModal: {
    open: false,
    icon: null
  }
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setSuccessModalState: (state, action: PayloadAction<ModalState>) => {
      state.successModal = { ...state.successModal, ...action.payload };
    }
  }
});

export const { setSuccessModalState } = modalSlice.actions;

export default modalSlice.reducer;
