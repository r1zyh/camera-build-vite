import { SortOrder, SortTypes } from '../../const';
import { useAppDispatch } from '../../hooks/use-dispatch';
import {
  setProducts,
  setSortOrder,
  setSortType,
} from '../../store/product-process/product-process';
import {
  getCurrentSortOrder,
  getCurrentSortType,
  getProducts,
} from '../../store/product-process/selectors';
import { useAppSelector } from '../../hooks/use-select';

function Sort(): JSX.Element {
  const dispatch = useAppDispatch();
  const stateProducts = useAppSelector(getProducts);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
//Исправить логику сортировки
  const handleSortSelect = (currentType: string) => {
    const sortedProducts = [...stateProducts];
    const sortByPrice = sortedProducts.sort((a, b) => a.price - b.price);
    const sortByPopular = sortedProducts.sort((a, b) => a.rating - b.rating);
    if (currentType === SortTypes.Price && currentSortOrder === null) {
      dispatch(setSortOrder(SortOrder.Ascending));
    }

    dispatch(setSortType(currentType));

    switch (currentType) {
      case SortTypes.Popularity:
        if (
          currentSortOrder === null ||
          currentSortOrder !== SortOrder.Ascending
        ) {
          dispatch(setProducts(sortByPopular));
        } else {
          dispatch(setProducts(sortByPopular.reverse()));
        }
        break;
      case SortTypes.Price:
        if (
          currentSortOrder !== SortOrder.Ascending &&
          currentSortOrder !== null
        ) {
          dispatch(setProducts(sortByPrice.reverse()));
        } else {
          dispatch(setProducts(sortByPrice));
        }
        break;
      default:
        break;
    }
  };

  const handleSortOrderChange = (sortOrder: string) => {
    if (currentSortOrder === sortOrder) {
      console.log('Равны')
    } else { console.log("Не равны")}
    dispatch(setSortOrder(sortOrder));
    console.log(currentSortOrder);
    if (currentSortType !== null) {
      handleSortSelect(currentSortType);
    }
  };

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
