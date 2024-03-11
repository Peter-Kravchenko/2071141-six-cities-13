import { Link } from 'react-router-dom';
import { AppRoute, FavoritePageType } from '../../const';
import { Offers } from '../../types/offers';
import { getRatingWidth } from '../../utils/utils';
import BookmarkButton from '../bookmark-button/bookmark-button';

type CardProps = {
  offer: Offers;
  onCardHover?: (offer: Offers | undefined) => void;
};

function Card({ offer, onCardHover }: CardProps): JSX.Element {
  const {
    title,
    type,
    price,
    previewImage,
    isFavorite,
    isPremium,
    rating,
    id,
  } = offer;

  const handleCardHover = (card?: Offers) => {
    if (onCardHover) {
      onCardHover(card);
    }
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => {
        handleCardHover(offer);
      }}
      onMouseLeave={() => {
        handleCardHover();
      }}
    >
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>{' '}
        </div>
      ) : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt={type}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton
            pageType={FavoritePageType.Default}
            id={id}
            isActive={isFavorite}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingWidth(rating) }} />
            <span className="visually-hidden">{rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
