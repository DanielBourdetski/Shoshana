import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GeneralState {
  isLoggedIn: boolean;
  username: string | null;
}

const initialState: GeneralState = {
  isLoggedIn: false,
  username: null,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type

export default generalSlice;
