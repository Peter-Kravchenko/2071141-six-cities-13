import { Months, OFFER_RATIO } from '../const';
import { Offers } from '../types/offers';

export function getRatingWidth(rating: Offers['rating']): string {
  return `${Math.round(rating) * OFFER_RATIO}%`;
}

export const getFormatDate = (value: string): string => {
  const date = new Date(value);
  const month = Months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};
