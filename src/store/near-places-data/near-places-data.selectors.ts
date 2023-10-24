import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { NearPlacesData, State } from '../../types/state';

export const getNearPlaces = createSelector(
  (state: State) => state[NameSpace.NearPlaces],
  (state: NearPlacesData) => state.nearPlaces
);

export const getNearPlacesFetchingStatus = createSelector(
  (state: State) => state[NameSpace.NearPlaces],
  (state: NearPlacesData) => state.fetchingStatus
);
