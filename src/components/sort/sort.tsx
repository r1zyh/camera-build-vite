import { SortOrder, SortTypes } from '../../const';
import { useAppDispatch } from '../../hooks/use-dispatch';
import {
  setCurrentProducts,
  setProducts,
  setSortOrder,
  setSortType,
} from '../../store/product-process/product-process';
import {
  getCurrentSortOrder,
  getCurrentSortType,
  getFilterStatus,
  getProducts,
} from '../../store/product-process/selectors';
import { useAppSelector } from '../../hooks/use-select';
import { useEffect } from 'react';

function Sort(): JSX.Element {
  const dispatch = useAppDispatch();
  const stateProducts = useAppSelector(getProducts);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const filterStatus = useAppSelector(getFilterStatus);

  const handleSortByPrice = () => {
    const sortedProducts = [...stateProducts].sort((a, b) =>
      currentSortOrder === SortOrder.Ascending
        ? a.price - b.price
        : b.price - a.price
    );

    if (filterStatus) {
      dispatch(setCurrentProducts(sortedProducts));
    }
    dispatch(setProducts(sortedProducts));
  };

  const handleSortByPopularity = () => {
    const sortedProducts = [...stateProducts].sort((a, b) =>
      currentSortOrder === SortOrder.Ascending
        ? a.rating - b.rating
        : b.rating - a.rating
    );
    if (filterStatus) {
      dispatch(setCurrentProducts(sortedProducts));
    }
    dispatch(setProducts(sortedProducts));
  };

  const handleSortSelect = (currentType: string) => {
    if (currentType === SortTypes.Price && currentSortOrder === null) {
      dispatch(setSortOrder(SortOrder.Ascending));
    }
    if (currentType === SortTypes.Popularity && currentSortOrder === null) {
      dispatch(setSortOrder(SortOrder.Ascending));
    }


    dispatch(setSortType(currentType));

    switch (currentType) {
      case SortTypes.Popularity:
        handleSortByPopularity();
        break;
      case SortTypes.Price:
        handleSortByPrice();
        break;
      default:
        break;
    }
  };

  const handleSortOrderChange = (sortOrder: string) => {
    dispatch(setSortOrder(sortOrder));
    if (currentSortType === null) {
      dispatch(setSortType(SortTypes.Price));
    }
  };

  useEffect(() => {
    if (currentSortType !== null) {
      handleSortSelect(currentSortType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSortType, currentSortOrder, filterStatus]);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                value={SortTypes.Price}
                checked={currentSortType === SortTypes.Price}
                onChange={() => handleSortSelect(SortTypes.Price)}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                value={SortTypes.Popularity}
                checked={currentSortType === SortTypes.Popularity}
                onChange={() => handleSortSelect(SortTypes.Popularity)}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                value={SortOrder.Ascending}
                checked={currentSortOrder === SortOrder.Ascending}
                onChange={() => handleSortOrderChange(SortOrder.Ascending)}
                aria-label="По возрастанию"
                data-testid="up"
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                value={SortOrder.Descending}
                checked={currentSortOrder === SortOrder.Descending}
                onChange={() => handleSortOrderChange(SortOrder.Descending)}
                aria-label="По убыванию"
                data-testid="down"
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sort;
