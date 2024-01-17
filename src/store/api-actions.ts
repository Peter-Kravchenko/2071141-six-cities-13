import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosError, AxiosInstance } from 'axios';
import { FavoriteData, Offers } from '../types/offers';
import { APIRoute, AppRoute, NameSpace } from '../const';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { Offer } from '../types/offer';
import { Comment, CommentAdd } from '../types/comment';
import { redirectToRoute } from './action';
import { User } from '../types/user';
import { toast } from 'react-toastify';

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

export const fetchFavoritesAction = createAsyncThunk<
  Offers[],
  undefined,
  Extra
>(`${NameSpace.Favorites}/fetchFavorites`, async (_arg, { extra: api }) => {
  const { data } = await api.get<Offers[]>(APIRoute.Favorite);

  return data;
});

export const changeFavoritesAction = createAsyncThunk<
  Offer,
  FavoriteData,
  Extra & { state: State }
>(
  `${NameSpace.Favorites}/changeFavorites`,
  async ({ id, status }, { extra: api, dispatch }) => {
    const { data } = await api.post<Offer>(
      `${APIRoute.Favorite}/${id}/${status}`
    );

    dispatch(fetchFavoritesAction());
    return data;
  }
);

export const fetchNearPlacesAction = createAsyncThunk<
  Offers[],
  Offer['id'],
  Extra
>(
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
  { commentData: CommentAdd; offerId: Offer['id'] },
  Extra
>(
  `${NameSpace.Comments}/addComment`,
  async ({ commentData, offerId }, { dispatch, extra: api }) => {
    const { data } = await api
      .post<Comment[]>(`${APIRoute.Comments}/${offerId}`, commentData)
      .catch((err: AxiosError) => {
        throw toast.error(err.message);
      });
    dispatch(fetchCommentAction(offerId));
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
