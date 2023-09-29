import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersData } from './offers-data/offers-data.slice';
import { userData } from './user-data/user-data.slice';
import { offerData } from './offer-data/offer-data.slice';
import { commentsData } from './coments-data/comments-data.slice';
import { nearPlacesData } from './near-places-data/near-places-data.slice';
import { favoritesData } from './favorites-data/favorites-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.NearPlaces]: nearPlacesData.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
  [NameSpace.Comments]: commentsData.reducer,
});
