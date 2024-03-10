import React, { useState } from 'react';
import { SortingType } from '../../types/sorting';
import { SortingMap } from '../../const';
import cn from 'classnames';

type SortingProps = {
  activeSorting: string;
  onChange: (newSorting: SortingType) => void;
};

function Sorting({ activeSorting, onChange }: SortingProps): JSX.Element {
  const [isOpened, setOpened] = useState(false);
  const opened = isOpened ? 'places__options--opened' : '';

  function handleEcsKeydown(evt: React.KeyboardEvent) {
    if (evt.key === 'Escape' && isOpened) {
      evt.preventDefault();
      setOpened(false);
    }
  }

  function handleTypeClick() {
    setOpened((prevIsOpened) => !prevIsOpened);
  }

  function handleSortingClick(type: SortingType) {
    onChange(type);
    setOpened(false);
  }

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onKeyDown={handleEcsKeydown}
    >
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
      >
        {SortingMap[activeSorting as keyof typeof SortingMap]}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={cn(
          `places__options places__options--custom places__options ${opened}`
        )}
      >
        {Object.entries(SortingMap).map(([type, label]) => (
          <li
            className={cn('places__option', {
              'places__option--active': activeSorting === type,
            })}
            key={type}
            tabIndex={0}
            onClick={() => handleSortingClick(type)}
          >
            {label}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
