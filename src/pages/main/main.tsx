import { Helmet } from 'react-helmet-async';
import ProductCardList from '../../components/product-card-list/product-card-list';
import Filter from '../../components/filter/filter';
import FooterLayout from '../../components/footer/footer';
import HeaderLayout from '../../components/header/header';
import Sort from '../../components/sort/sort';
import { useAppSelector } from '../../hooks/use-select';
import {
  getCurrentProducts,
  getCurrentSortOrder,
  getCurrentSortType,
  getFilterCategory,
  getFilterLevels,
  getFilterStatus,
  getFilterTypes,
  getProducts,
  getProductsLoadingStatus,
  getPromos,
} from '../../store/product-process/selectors';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '../../components/pagination/pagination';
import { useLocation } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Loader from '../../components/loader/loader';
import { applyFilters, calcTotalPageCount } from '../../util';

function Main(): JSX.Element {
  const itemsPerPage = 9;
  const filterStatus = useAppSelector(getFilterStatus);
  const stateProducts = useAppSelector(getProducts);
  const currentVisibleProducts = useAppSelector(getCurrentProducts);
  const isProductLoading = useAppSelector(getProductsLoadingStatus);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const filterCategory = useAppSelector(getFilterCategory);
  const filterTypes = useAppSelector(getFilterTypes);
  const filterLevels = useAppSelector(getFilterLevels);
  const banners = useAppSelector(getPromos);
  const location = useLocation();
  const currentPageParam = parseInt(
    new URLSearchParams(location.search).get('page') || '1',
    10
  );
  const [currentPage, setCurrentPage] = useState(currentPageParam);
  const maxPageCount = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const resetUrl = useCallback(() => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  useEffect(() => {
    resetUrl();
  }, [resetUrl]);


  const updateUrl = useCallback((pageNumber: number) => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', pageNumber.toString());
    if (currentSortType && currentSortOrder) {
      searchParams.set('sortType', currentSortType);
      searchParams.set('sortOrder', currentSortOrder);
    }
    if (filterCategory) {
      searchParams.set('filterCategory', filterCategory);
    }
    if (filterTypes && filterTypes.length > 0) {
      searchParams.set('filterTypes', filterTypes.join(','));
    }
    if (filterLevels && filterLevels.length > 0) {
      searchParams.set('filterLevels', filterLevels.join(','));
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, document.title, newUrl);
  }, [currentSortType, currentSortOrder, filterCategory, filterTypes, filterLevels]);

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      updateUrl(pageNumber);
    }
  };

  useEffect(() => {
    updateUrl(currentPage);
  }, [currentPage, updateUrl]);

  if (isProductLoading) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{'Camera-shop - Catalog'}</title>
      </Helmet>
      <HeaderLayout />
      <main>
        <Banner banners={banners} />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <Filter />
                <div className="catalog__content">
                  <Sort />
                  <ProductCardList
                    products={applyFilters(
                      indexOfFirstItem,
                      indexOfLastItem,
                      filterStatus,
                      currentVisibleProducts,
                      stateProducts
                    )}
                  />
                  <div className="pagination">
                    <Pagination
                      maxPageCount={maxPageCount}
                      currentPage={currentPage}
                      totalPageCount={calcTotalPageCount(
                        filterStatus,
                        currentVisibleProducts,
                        stateProducts,
                        itemsPerPage
                      )}
                      handlePageClick={handlePageClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterLayout />
    </div>
  );
}

export default Main;
