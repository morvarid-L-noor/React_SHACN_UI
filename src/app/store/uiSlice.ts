import { createSlice } from '@reduxjs/toolkit';
import type { ReactNode } from 'react';

interface IUISlice {
  isMobileMenuOpen: boolean;
  icon?: null | ReactNode;
}

const initialState: IUISlice = {
  isMobileMenuOpen: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    }
  }
});

export const { toggleMobileMenu } = uiSlice.actions;

export default uiSlice.reducer;
