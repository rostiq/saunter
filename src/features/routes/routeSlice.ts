// routeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route } from '../../types';

const initialRoutes: Route[] = [];

const routeSlice = createSlice({
  name: 'routes',
  initialState: initialRoutes,
  reducers: {
    fetchRoutes: (state, action: PayloadAction<Route[]>) => {
      return action.payload;
    },
    addRoute: (state, action: PayloadAction<Route>) => {
      state.push(action.payload);
    },
    removeRoute: (state, action: PayloadAction<string>) => {
      return state.filter((route) => route.id !== action.payload);
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      const route = state.find((r) => r.id === action.payload);
      if (route) {
        route.isFavorite = !route.isFavorite;
      }
    },
  },
});

export const { addRoute, removeRoute, addToFavorites, fetchRoutes } = routeSlice.actions;

export const selectRouteList = (state: { routes: Route[] }) => state.routes;
export const selectRouteById = (id: string | undefined) => (state: { routes: Route[] }) => {
  return state.routes.find((route) => route.id === id);
}

export default routeSlice.reducer;
