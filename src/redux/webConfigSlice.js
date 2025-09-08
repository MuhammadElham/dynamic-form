import { createSlice } from "@reduxjs/toolkit";
import { config } from "../assets/config.js";

const initialState = {
  config: config.Fields.Config,
  translation: config.Fields.ControlTranslations,
};

const webConfigSlice = createSlice({
  name: "webConfig",
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.config = action.payload.config;
      state.translation = action.payload.translations;
    },
  },
});

export const { setConfig } = webConfigSlice.actions;
export default webConfigSlice.reducer;
