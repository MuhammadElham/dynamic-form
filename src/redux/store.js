import { configureStore } from "@reduxjs/toolkit";
import webConfigReducer from "./webConfigSlice";

export const store = configureStore({
  reducer: {
    webConfig: webConfigReducer,
  },
});
