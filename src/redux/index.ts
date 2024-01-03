import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AuthReducer, DataReducer } from "./slice";

const RootReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
});

export const AppStore = configureStore({
  reducer: RootReducer,
  middleware: (gdm) => gdm({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
