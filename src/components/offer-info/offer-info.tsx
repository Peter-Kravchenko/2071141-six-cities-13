import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { Offer } from '../../types/offer';
import { getRatingWidth } from '../../utils/utils';
import CommentList from '../comment-list/comment-list';
import { fetchCommentAction } from '../../store/api-actions';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { FavoritePageType } from '../../const';

type OfferInfoProps = {
  offer: Offer;
};

function OfferInfo({ offer }: OfferInfoProps): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    id,
    description,
    bedrooms,
    goods,
    host,
    images,
    maxAdults,
    isFavorite,
    isPremium,
    rating,
    price,
    title,
    type,
  } = offer;

  useEffect(() => {
    dispatch(fetchCommentAction(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {images.slice(0, 6).map((image) => (
            <div key={image} className="offer__image-wrapper">
              <img className="offer__image" src={image} alt={type} />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">{title}</h1>
            <BookmarkButton
              pageType={FavoritePageType.Offer}
              id={id}
              isActive={isFavorite}
            />
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: getRatingWidth(rating) }} />
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">{type}</li>
            <li className="offer__feature offer__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">€{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {goods.map((good) => (
                <li className="offer__inside-item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img
                  className="offer__avatar user__avatar"
                  src={host.avatarUrl}
                  width={74}
                  height={74}
                  alt={host.name}
                />
              </div>
              <span className="offer__user-name">{host.name}</span>
              {host.isPro && <span className="offer__user-status">Pro</span>}
            </div>
            <div className="offer__description">
              <p className="offer__text">{description}</p>
              <p className="offer__text"></p>
            </div>
          </div>
          <CommentList id={id} />
        </div>
      </div>
    </>
  );
}

export default OfferInfo;
