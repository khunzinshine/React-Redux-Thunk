import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingAction } from "../system/systemSlice";
import axios from "axios";

export const fetchDataList = createAsyncThunk(
  "fetchDataList",
  async ({ url, body }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(loadingAction(true));
      const response = await axios.get(url, { params: body });
      dispatch(loadingAction(false));
      return fulfillWithValue(response);
    } catch (err) {
      dispatch(loadingAction(false));
      return rejectWithValue(err);
    }
  }
);
