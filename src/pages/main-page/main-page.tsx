import { useCallback, useEffect, useState } from 'react';
import CardList from '../../components/card-list/card-list';
import CitiesList from '../../components/cities-list/cities-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import UserInfo from '../../components/user-info/user-info';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { Offers } from '../../types/offers';
import NotFoundPage from '../not-found-page/not-found-page';
import { SortingType } from '../../types/sorting';
import Sorting from '../../components/sorting/sorting';
import { AuthorizationStatus, RequestStatus } from '../../const';
import SignIn from '../../components/sign-in/sing-in';
import {
  getActiveCity,
  getOffers,
  getOffersFetchingStatus,
} from '../../store/offers-data/offers-data.selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchOffersAction } from '../../store/api-actions';

type MainPageProps = {
  authorizationStatus: AuthorizationStatus;
};

function MainPage({ authorizationStatus }: MainPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getActiveCity);
  const offers = useAppSelector(getOffers);
  const offersFetchingStatus = useAppSelector(getOffersFetchingStatus);
  const currentOffers: Offers[] = offers.filter(
    (offer) => offer.city.name === activeCity
  );
  const [activeCard, setActiveCard] = useState<Offers | undefined>(undefined);
  const [activeSorting, setActiveSorting] = useState<SortingType>('Popular');

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch, authorizationStatus]);

  const handleCardHover = useCallback((card: Offers | undefined) => {
    if (card) {
      const currentOffer = offers.find((offer) => offer.id === card.id);
      setActiveCard(currentOffer);
    } else {
      setActiveCard(undefined);
    }
  }, []);

  const sortingChange = (newSorting: SortingType) =>
    setActiveSorting(newSorting);

  if (offersFetchingStatus === RequestStatus.Pending) {
    return <LoadingScreen />;
  }

  return (
    <div className="page page--gray page--main">
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
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList activeCity={activeCity} />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {currentOffers.length} places to stay in {activeCity}
            </b>
            <Sorting activeSorting={activeSorting} onChange={sortingChange} />
            <CardList
              activeSorting={activeSorting}
              offers={currentOffers}
              onCardHover={handleCardHover}
            />
          </section>
          {currentOffers.length ? (
            <Map
              block="cities"
              offers={currentOffers}
              specialOffer={activeCard}
            />
          ) : (
            <NotFoundPage />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
