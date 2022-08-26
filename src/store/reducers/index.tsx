import { combineReducers } from "redux"
import { AppReducer } from "./app"


const RootReducers = combineReducers({
  AppReducer: AppReducer,
})

export default RootReducers