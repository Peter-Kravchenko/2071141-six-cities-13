import { Link } from 'react-router-dom';
import { AppRoute, FavoritePageType } from '../../const';
import { Offers } from '../../types/offers';
import BookmarkButton from '../bookmark-button/bookmark-button';

type FavoriteCardProps = {
  offer: Offers;
};

function FavoriteCard({ offer }: FavoriteCardProps): JSX.Element {
  const {
    id,
    title,
    type,
    price,
    previewImage,
    isPremium,
    isFavorite,
    rating,
  } = offer;

  return (
    <article className="favorites__card place-card">
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <div>
          <img
            className="place-card__image"
            src={previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </div>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
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
            <span style={{ width: '100%' }} />
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

export default FavoriteCard;
