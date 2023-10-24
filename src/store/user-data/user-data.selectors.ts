import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserData } from '../../types/state';

export const getUser = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserData) => state.user
);

export const getAuthorizationStatus = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserData) => state.authorizationStatus
);

export const getLoginStatus = createSelector(
  (state: State) => state[NameSpace.User],
  (state: UserData) => state.loginStatus
);
