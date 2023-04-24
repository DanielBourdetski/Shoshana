import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type User = { username: string; id: string };

interface GeneralState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: GeneralState = {
  isLoggedIn: true,
  user: null,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const { username, id } = action.payload;
      state.user = { username, id };
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type

export default generalSlice;
