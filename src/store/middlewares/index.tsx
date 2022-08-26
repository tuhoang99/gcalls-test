import { all } from "redux-saga/effects";

export interface responseGenerator{
  data?:any | undefined;
  message?: string | undefined;
  statusCode?:number | undefined;
}

export default function* RootSaga() {
  yield all([
    
  ]);
}