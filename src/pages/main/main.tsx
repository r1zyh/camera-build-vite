import { Helmet } from 'react-helmet-async';
import ProductCardList from '../../components/product-card-list/product-card-list';
import Filter from '../../components/filter/filter';
import FooterLayout from '../../components/footer/footer';
import HeaderLayout from '../../components/header/header';
import Sort from '../../components/sort/sort';
import { useAppSelector } from '../../hooks/use-select';
import {
  getCurrentProducts,
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
import { TProducts } from '../../types/products';
import Loader from '../../components/loader/loader';

function Main(): JSX.Element {
  const filterStatus = useAppSelector(getFilterStatus);
  const stateProducts = useAppSelector(getProducts);
  const currentVisibleProducts = useAppSelector(getCurrentProducts);
  const isProductLoading = useAppSelector(getProductsLoadingStatus);

  const banners = useAppSelector(getPromos);

  const [itemsPerPage] = useState(9);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPageParam = parseInt(
    new URLSearchParams(location.search).get('page') || '1',
    10
  );
  const [currentPage, setCurrentPage] = useState(currentPageParam);
  const maxPageCount = 3;

  const updateUrl = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', currentPage.toString());
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl, { replace: true });
  }, [currentPage, location.pathname, location.search, navigate]);

  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const applyFilters = (): TProducts => {
    if (filterStatus) {
      return currentVisibleProducts.slice(indexOfFirstItem, indexOfLastItem);
    } else {
      return stateProducts.slice(indexOfFirstItem, indexOfLastItem);
    }
  };

  const calcTotalPageCount = () => {
    let totalPageCount: number;
    if (filterStatus) {
      totalPageCount = Math.ceil(currentVisibleProducts.length / itemsPerPage);
    } else {
      totalPageCount = Math.ceil(stateProducts.length / itemsPerPage);
    }

    return totalPageCount;
  };

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
                <Filter setCurrentPage={setCurrentPage} />
                <div className="catalog__content">
                  <Sort products={applyFilters()} />
                  <ProductCardList products={applyFilters()} />
                  <div className="pagination">
                    <Pagination
                      maxPageCount={maxPageCount}
                      currentPage={currentPage}
                      totalPageCount={calcTotalPageCount()}
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
