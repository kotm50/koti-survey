import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userSlice from "./userSlice";
import paginationSlice from "./paginationSlice";
import modalSlice from "./modalSlice";
import modalSlice2 from "./modalSlice2";

const reducers = combineReducers({
  user: userSlice,
  modal: modalSlice,
  modal2: modalSlice2,
  pagination: paginationSlice, // 이 부분을 추가
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
