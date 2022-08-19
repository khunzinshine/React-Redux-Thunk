import { createSlice } from "@reduxjs/toolkit";
import { fetchDataList } from "./dataListApi";
import _ from "lodash";

const initialState = {
  status: "pending",
  dataList: [],
  error: null,
  column: null,
  direction: null,
};

const dataListSlice = createSlice({
  name: "dataList",
  initialState: initialState,
  reducers: {
    changeSort(state, action) {
      if (state.column === action.payload) {
        Object.assign(state, {
          column: action.payload,
          dataList: {
            ...state.dataList,
            data: {
              ...state.dataList.data,
              hits: state.dataList.data.hits.slice().reverse(),
            },
          },
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        });
      } else {
        Object.assign(state, {
          column: action.payload,
          dataList: {
            ...state.dataList,
            data: {
              ...state.dataList.data,
              hits: _.sortBy(state.dataList.data.hits, [action.payload]),
            },
          },
          direction: "ascending",
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataList.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(fetchDataList.fulfilled, (state, action) => {
      state.status = "success";
      state.dataList = action.payload;
    });
    builder.addCase(fetchDataList.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
  },
});

export const { changeSort } = dataListSlice.actions;
export const dataList = (state) => state.dataList;
export default dataListSlice.reducer;
