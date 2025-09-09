import { createSlice } from "@reduxjs/toolkit";
import { config } from "../assets/config.js";
import { test } from "../assets/test.js";

const initialState = {
  config: config.Fields.Config,
  translation: config.Fields.ControlTranslations,
  grids: test,
};

const webConfigSlice = createSlice({
  name: "webConfig",
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.config = action.payload.config;
      state.translation = action.payload.translations;
      state.grids = action.payload.grids;
    },
  },
});

export const { setConfig } = webConfigSlice.actions;
export default webConfigSlice.reducer;
