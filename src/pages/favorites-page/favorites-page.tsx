import { useEffect } from 'react';
import FavoriteEmpty from '../../components/favorite-empty/favorite-empty';
import FavoriteList from '../../components/favorite-list/favorite-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import { RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import {
  getFavorites,
  getFavoritesFetchingStatus,
} from '../../store/favorites-data/favorites-data.selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchFavoritesAction } from '../../store/api-actions';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const favorites = useAppSelector(getFavorites);
  const favoritesFetchingStatus = useAppSelector(getFavoritesFetchingStatus);

  if (favoritesFetchingStatus === RequestStatus.Pending) {
    return <LoadingScreen />;
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <UserInfo />
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length ? (
            <FavoriteList offers={favorites} />
          ) : (
            <FavoriteEmpty />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
