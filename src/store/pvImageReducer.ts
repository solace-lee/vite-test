import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CasesModel } from "../types/index";

interface pvImageState {
  pvImageIds: string[] | null;
}

const initialState: pvImageState = {
  pvImageIds: null,
};

export const pvImageReducer = createSlice({
  name: "pvImage",
  initialState,
  reducers: {
    updatePvImageIds: (
      state,
      action: PayloadAction<pvImageState["pvImageIds"] | null>
    ) => {
      state.pvImageIds = action.payload;
    },
  },
});

export const { updatePvImageIds } = pvImageReducer.actions;
export default pvImageReducer.reducer;
