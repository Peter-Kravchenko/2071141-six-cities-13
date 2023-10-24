import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferData, State } from '../../types/state';

export const getOffer = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: OfferData) => state.offer
);

export const getOfferFetchingStatus = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: OfferData) => state.fetchingStatus
);
