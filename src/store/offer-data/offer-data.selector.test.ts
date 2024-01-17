import { NameSpace, RequestStatus } from '../../const';

describe('OfferData selectors', () => {
  const state = {
    [NameSpace.Offer]: {
      offer: null,
      fetchingStatus: [RequestStatus.Idle],
    },
  };

  it('should return offer', () => {
    const result = {
      offer,
    };
  });
});
