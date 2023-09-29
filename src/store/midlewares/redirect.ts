import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';
import { NameSpace } from '../../const';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === `${NameSpace.User}/redirectToRoute`) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };

export default redirect;
