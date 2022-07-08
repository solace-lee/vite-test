import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CasesModel } from "../types/index";

interface patientState {
  info: object | null;
  cases: CasesModel[] | null;
}

const initialState: patientState = {
  info: null,
  cases: null,
};

export const patientReducer = createSlice({
  name: "patient",
  initialState,
  reducers: {
    updatePatientInfo: (state, action: PayloadAction<object | null>) => {
      state.info = action.payload;
    },
    updatePatientCases: (state, action: PayloadAction<CasesModel[] | null>) => {
      state.cases = action.payload;
    },
  },
});

export const { updatePatientInfo, updatePatientCases } = patientReducer.actions;
export default patientReducer.reducer;
