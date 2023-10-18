// routeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Distance, MarkerType } from '../../types';

const initialRoutes: Distance = {
  totalLength: 0,
  markers: [],
};

const distanceSlice = createSlice({
  name: 'distance',
  initialState: initialRoutes,
  reducers: {
    updateTotalLength: (state, action: PayloadAction<number>) => {
      state.totalLength = action.payload;
    },
    updateMarkers: (state, action: PayloadAction<MarkerType[]>) => {
      state.markers = action.payload;
    },
  },
});

export const { updateTotalLength, updateMarkers } = distanceSlice.actions;

export const selectTotalLength = (state: { distance: Distance }) => state.distance.totalLength;

export const selectMarkers = (state: { distance: Distance }) => state.distance.markers;

export default distanceSlice.reducer;
