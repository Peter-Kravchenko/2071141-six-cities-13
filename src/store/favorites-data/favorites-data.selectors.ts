import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoritesData, State } from '../../types/state';

export const getFavorites = createSelector(
  (state: State) => state[NameSpace.Favorites],
  (state: FavoritesData) => state.favorites
);

export const getFavoritesFetchingStatus = createSelector(
  (state: State) => state[NameSpace.Favorites],
  (state: FavoritesData) => state.fetchingStatus
);
