import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { logoutAction } from '../../store/api-actions';
import { getFavorites } from '../../store/favorites-data/favorites-data.selectors';
import { getUser } from '../../store/user-data/user-data.selectors';

function UserInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const favorites = useAppSelector(getFavorites);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">{user?.email}</span>
            <span className="header__favorite-count">{favorites.length}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            className="header__nav-link"
            to={AppRoute.Login}
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserInfo;
