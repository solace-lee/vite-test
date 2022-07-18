import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CasesModel } from "../types/index";

interface pvCoreState {
  init: boolean;
}

const initialState: pvCoreState = {
  init: false,
};

export const pvCoreReducer = createSlice({
  name: "pvCore",
  initialState,
  reducers: {
    updatePvCore: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

export const { updatePvCore } = pvCoreReducer.actions;
export default pvCoreReducer.reducer;
