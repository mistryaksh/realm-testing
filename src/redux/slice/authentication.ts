import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { User } from "realm-web";

export interface AuthSliceProps {
  user: User | null;
  client: globalThis.Realm.Services.MongoDB | undefined;
}

const initialState: AuthSliceProps = {
  user: null,
  client: undefined,
};

const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    handleAuthUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    handleClient: (
      state,
      action: PayloadAction<globalThis.Realm.Services.MongoDB | undefined>
    ) => {
      state.client = action.payload;
    },
  },
});

export const useAuthSlice = () =>
  useSelector((res: RootState) => {
    return res.auth;
  });
export const AuthReducer = AuthSlice.reducer;
export const { handleAuthUser, handleClient } = AuthSlice.actions;
