import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

const DataSlice = createSlice({
  initialState: {
    data: [],
    inputs: {
      name: "",
      age: "",
      _id: "",
    },
  },
  name: "data",
  reducers: {
    handleData: (state, action: PayloadAction<any>) => {
      for (var i = 0; i <= action.payload.length; i++) {
        state.data = action.payload;
      }
    },
    handleNameInput: (state, action: PayloadAction<string>) => {
      state.inputs.name = action.payload;
    },
    handleAge: (state, action: PayloadAction<string>) => {
      state.inputs.age = action.payload;
    },
    handleId: (state, action: PayloadAction<string>) => {
      state.inputs._id = action.payload;
    },
    resetInputs: (state) => {
      state.inputs._id = "";
      state.inputs.age = "";
      state.inputs.name = "";
    },
  },
});

export const useDataSlice = () =>
  useSelector((state: RootState) => {
    return state.data;
  });
export const DataReducer = DataSlice.reducer;
export const { handleData, handleAge, handleId, handleNameInput, resetInputs } =
  DataSlice.actions;
