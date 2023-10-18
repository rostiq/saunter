import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import routeReducer from '../features/routes/routeSlice';
import distanceReducer from '../features/routes/distanceSlice';


export const store = configureStore({
  reducer: {
    routes: routeReducer,
    distance: distanceReducer,
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
