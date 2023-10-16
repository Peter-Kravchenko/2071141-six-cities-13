import { useEffect } from 'react';
import Logo from '../../components/logo/logo';
import UserInfo from '../../components/user-info/user-info';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useParams } from 'react-router-dom';
import {
  fetchFavoritesAction,
  fetchNearPlacesAction,
  fetchOfferAction,
} from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { AuthorizationStatus, RequestStatus } from '../../const';
import NotFoundPage from '../not-found-page/not-found-page';
import Card from '../../components/card/card';
import Map from '../../components/map/map';
import { Helmet } from 'react-helmet-async';
import OfferInfo from '../../components/offer-info/offer-info';
import {
  getNearPlaces,
  getNearPlacesFetchingStatus,
} from '../../store/near-places-data/near-places-data.selectors';
import {
  getOffer,
  getOfferFetchingStatus,
} from '../../store/offer-data/offer-data.selector';
import { getAuthorizationStatus } from '../../store/user-data/user-data.selectors';
import SignIn from '../../components/sign-in/sing-in';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offer = useAppSelector(getOffer);
  const nearPlaces = useAppSelector(getNearPlaces).slice(0, 3);

  const offerFetchingStatus = useAppSelector(getOfferFetchingStatus);
  const nearPlacesFetchindStatus = useAppSelector(getNearPlacesFetchingStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchFavoritesAction());
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearPlacesAction(id));
    }
  }, [id, dispatch]);

  if (
    offerFetchingStatus === RequestStatus.Pending ||
    nearPlacesFetchindStatus === RequestStatus.Pending
  ) {
    return <LoadingScreen />;
  }

  return offerFetchingStatus === RequestStatus.Success && offer ? (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>{`6 cities - ${offer.title}`}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            {authorizationStatus === AuthorizationStatus.Auth ? (
              <UserInfo />
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </header>
      <section className="offer">
        <OfferInfo offer={offer} />
        <Map
          block="offer"
          offers={nearPlaces.concat(offer)}
          specialOffer={offer}
        />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <div className="near-places__list places__list">
            {nearPlaces.map((nearPlace) => (
              <Card key={nearPlace.id} offer={nearPlace} />
            ))}
          </div>
        </section>
      </div>
    </main>
  ) : (
    <NotFoundPage />
  );
}

export default OfferPage;
