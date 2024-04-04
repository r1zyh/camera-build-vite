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
  getFilterStatus,
  getProducts,
  getProductsLoadingStatus,
  getPromos,
} from '../../store/product-process/selectors';
import { useState, useEffect, useCallback } from 'react';
import Pagination from '../../components/pagination/pagination';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const banners = useAppSelector(getPromos);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPageParam = parseInt(
    new URLSearchParams(location.search).get('page') || '1',
    10
  );
  const [currentPage, setCurrentPage] = useState(currentPageParam);
  const maxPageCount = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const updateUrl = useCallback((pageNumber: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber.toString());
    if (currentSortType && currentSortOrder) {
      searchParams.set('sortType', currentSortType);
      searchParams.set('sortOrder', currentSortOrder);
    }
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl, { replace: true });
  }, [location.search, location.pathname, navigate, currentSortType, currentSortOrder]);
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
