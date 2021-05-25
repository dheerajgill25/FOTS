import { store } from "reduxModule";

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = store.dispatch;