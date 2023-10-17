import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import routeReducer from '../features/routes/routeSlice';


export const store = configureStore({
  reducer: {
    routes: routeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
