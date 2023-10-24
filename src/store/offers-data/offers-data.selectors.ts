import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData, State } from '../../types/state';

export const getOffers = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.offers
);

export const getActiveCity = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.activeCity
);

export const getOffersFetchingStatus = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersData) => state.fetchingStatus
);
