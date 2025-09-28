import { createSlice } from "@reduxjs/toolkit";
import { config } from "../assets/config.js";
import { helpGridConfig } from "../assets/helpGrid_Config.js";

const initialState = {
  fieldConfig: config.Fields.Config,
  fieldHeaders: config.Grids[4]?.Headers,
  translation: config.Fields.ControlTranslations,
  grids: config.Grids[4],
  // Drawer -> HelpGrid
  helpGridConfig: helpGridConfig,
  // Drawer to Main Grid ka Function
  handleRowSelectFromDrawerFn: null,
  isOpen: false,
};

const webConfigSlice = createSlice({
  name: "webConfig",
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.fieldConfig = action.payload.config;
      state.fieldHeaders = action.payload.grids?.Headers;
      state.translation = action.payload.translations;
      state.grids = action.payload.grids;
    },
    registerHandleRowSelectFromDrawer: {
      reducer: (state, action) => {
        state.handleRowSelectFromDrawerFn = action.payload;
      },
      prepare: (fn) => {
        return {
          payload: fn,
          meta: { ignoreSerializableCheck: true },
        };
      },
    },
    openDrawer: (state) => {
      state.isOpen = true;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
    },
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setConfig, registerHandleRowSelectFromDrawer, openDrawer, closeDrawer, toggleDrawer } = webConfigSlice.actions;
export default webConfigSlice.reducer;
