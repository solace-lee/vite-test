import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import pvCoreReducer from "./coreReducer";
import patientReducer from "./patientReducer";
import pvImageReducer from "./pvImageReducer";
const store = configureStore({
  reducer: {
    patient: patientReducer,
    pvImage: pvImageReducer,
    pvCore: pvCoreReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
