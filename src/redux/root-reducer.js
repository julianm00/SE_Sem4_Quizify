import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth.reducer";
import uiReducer from "./ui/ui.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export default persistReducer(persistConfig, rootReducer);
