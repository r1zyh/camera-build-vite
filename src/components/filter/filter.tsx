import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/use-dispatch';
import { useAppSelector } from '../../hooks/use-select';
import {
  getCurrentProducts,
  getProducts,
} from '../../store/product-process/selectors';
import {
  CameraTypes,
  CategoryTypes,
  LevelTypes,
  cameraTypeNames,
  categoryTypeNames,
  levelTypeNames,
} from '../../const';
import {
  setCurrentProducts,
  setFiltersStatus,
} from '../../store/product-process/product-process';
import { fetchPriceRange } from '../../store/api-actions';

function Filter(): JSX.Element {
  const dispatch = useAppDispatch();
  const stateProducts = useAppSelector(getProducts);
  const products = useAppSelector(getCurrentProducts);

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryTypes | null>(null);
  const [selectedType, setSelectedType] = useState<CameraTypes | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<LevelTypes | null>(null);
  const [selectedPriceFrom, setSelectedPriceFrom] = useState<number | null>(
    null
  );
  const [selectedPriceTo, setSelectedPriceTo] = useState<number | null>(null);

  useEffect(() => {
    if (selectedPriceFrom !== null || selectedPriceTo !== null) {
      dispatch(
        fetchPriceRange({
          'price_gte': selectedPriceFrom,
          'price_lte': selectedPriceTo,
        })
      );
    }
  }, [dispatch, selectedPriceFrom, selectedPriceTo]);

  const handlePriceFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPriceFrom = e.target.value;
    setSelectedPriceFrom(newPriceFrom !== '' ? Number(newPriceFrom) : null);
    dispatch(setFiltersStatus(true));
  };

  const handlePriceToChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPriceTo = e.target.value;
    setSelectedPriceTo(newPriceTo !== '' ? Number(newPriceTo) : null);
    dispatch(setFiltersStatus(true));
  };

  const updateFilteredProducts = () => {
    const filteredProducts = products.filter((product) => {
      if (selectedCategory !== null && product.category !== selectedCategory) {
        return false;
      }
      if (selectedType !== null && product.type !== selectedType) {
        return false;
      }
      if (selectedLevel !== null && product.level !== selectedLevel) {
        return false;
      }
      return true;
    });
    dispatch(setFiltersStatus(true));
    dispatch(setCurrentProducts(filteredProducts));
  };

  const handleTypeChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: CameraTypes
  ) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedType(type);

      updateFilteredProducts();
    }
  };

  const handleLevelChange = (
    e: ChangeEvent<HTMLInputElement>,
    level: LevelTypes
  ) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedLevel(level);
      updateFilteredProducts();
    }
  };

  const handleCategoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    category: CategoryTypes
  ) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
    updateFilteredProducts();
  };

  const handlerResetFilters = () => {
    dispatch(setFiltersStatus(false));
    dispatch(setCurrentProducts(stateProducts));
    setSelectedPriceFrom(null);
    setSelectedPriceTo(null);
    setSelectedCategory(null);
    setSelectedType(null);
    setSelectedLevel(null);
  };
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="price"
                    placeholder="от"
                    onChange={handlePriceFromChange}
                    value={selectedPriceFrom !== null ? selectedPriceFrom : ''}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder="до"
                    onChange={handlePriceToChange}
                    value={selectedPriceTo !== null ? selectedPriceTo : ''}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={categoryTypeNames[CategoryTypes.Camera]}
                  onChange={(e) =>
                    handleCategoryChange(e, CategoryTypes.Camera)}
                  checked={selectedCategory === CategoryTypes.Camera}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={categoryTypeNames[CategoryTypes.Camcorder]}
                  onChange={(e) =>
                    handleCategoryChange(e, CategoryTypes.Camcorder)}
                  checked={selectedCategory === CategoryTypes.Camcorder}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={cameraTypeNames[CameraTypes.Digital]}
                  onChange={(e) => handleTypeChange(e, CameraTypes.Digital)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={cameraTypeNames[CameraTypes.Film]}
                  onChange={(e) => handleTypeChange(e, CameraTypes.Film)}
                  disabled={selectedCategory === CategoryTypes.Camcorder}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={cameraTypeNames[CameraTypes.Instant]}
                  onChange={(e) => handleTypeChange(e, CameraTypes.Instant)}
                  disabled={selectedCategory === CategoryTypes.Camcorder}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={cameraTypeNames[CameraTypes.Collectible]}
                  onChange={(e) => handleTypeChange(e, CameraTypes.Collectible)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={levelTypeNames[LevelTypes.Zero]}
                  onChange={(e) => handleLevelChange(e, LevelTypes.Zero)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={levelTypeNames[LevelTypes.Amateur]}
                  onChange={(e) => handleLevelChange(e, LevelTypes.Amateur)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={levelTypeNames[LevelTypes.Professional]}
                  onChange={(e) =>
                    handleLevelChange(e, LevelTypes.Professional)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={handlerResetFilters}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default Filter;
