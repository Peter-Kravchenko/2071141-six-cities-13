import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offers';
import { APIRoute, AppRoute, AuthorizationStatus, NameSpace } from '../const';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { redirectToRoute } from './action';
import { User } from '../types/user';

type Extra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<Offers[], undefined, Extra>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, Offer['id'], Extra>(
  `${NameSpace.Offer}/fetchOffer`,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<Offers[], string, Extra>(
  `${NameSpace.Favorites}/fetchFavorites`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers[]>(APIRoute.Favorite);
    return data;
  }
);
export const changeFavoritesAction = createAsyncThunk<
  Offer | null,
  { id: string; status: number },
  Extra & { state: State }
>(
  `${NameSpace.Favorites}/changeFavorites`,
  async ({ id, status }, { extra: api, getState, dispatch }) => {
    const authorizationStatus = getState()[NameSpace.User].authorizationStatus;
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return null;
    }
    const { data } = await api.post<Offer>(
      `${APIRoute.Favorite}/${id}/${status}`
    );
    return data;
  }
);

export const fetchNearPlacesAction = createAsyncThunk<Offers[], string, Extra>(
  `${NameSpace.NearPlaces}/fetchNearPlaces`,
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offers[]>(
      `${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`
    );
    return data;
  }
);

export const fetchCommentAction = createAsyncThunk<
  Comment[],
  Offer['id'],
  Extra
>(`${NameSpace.Comments}/fetchComments`, async (offerId, { extra: api }) => {
  const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
  return data;
});

export const addCommentAction = createAsyncThunk<
  Comment[],
  { commentData: Comment; offerId: Offer['id'] },
  Extra
>(
  `${NameSpace.Comments}/addComment`,
  async ({ commentData, offerId }, { extra: api }) => {
    const { data } = await api.post<Comment[]>(
      `${APIRoute.Comments}/${offerId}`,
      commentData
    );
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<User, undefined, Extra>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<User, AuthData, Extra>(
  `${NameSpace.User}/login`,
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));

    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, Extra>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
