import { combineReducers } from "redux";
import dataListSlice from "./dataList/dataListSlice";
import systemSlice from "./system/systemSlice";

const rootReducer = combineReducers({
  dataList: dataListSlice,
  system: systemSlice,
});

export default rootReducer;
