import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { Offers } from '../../types/offers';
import { changeFavoritesAction } from '../../store/api-actions';
import {
  FavoritePageType,
  FavoriteIconSize,
  AuthorizationStatus,
  AppRoute,
} from '../../const';
import cn from 'classnames';
import { FavoriteData } from '../../types/offers';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationStatus } from '../../store/user-data/user-data.selectors';

type BookmarkProps = {
  pageType: FavoritePageType;
  id: Offers['id'];
  isActive: Offers['isFavorite'];
};

function BookmarkButton({
  pageType,
  id,
  isActive,
}: BookmarkProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth =
    useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  const [isFavorite, setIsFavorite] = useState<boolean>(isActive);
  const iconSize =
    pageType === FavoritePageType.Offer
      ? FavoriteIconSize.Large
      : FavoriteIconSize.Small;

  const handleFavoriteClick = () => {
    if (!isAuth) {
      navigate(AppRoute.Login);
    }

    const changedFavoriteStatus = Number(!isFavorite) as FavoriteData['status'];
    setIsFavorite(!isFavorite);
    dispatch(changeFavoritesAction({ id, status: changedFavoriteStatus }));
  };

  return (
    <button
      className={cn({
        button: true,
        [`${pageType}__bookmark-button`]: true,
        [`${pageType}__bookmark-button--active`]: isFavorite,
      })}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg
        className={cn({
          [`${pageType}__bookmark-icon`]: true,
        })}
        {...iconSize}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
