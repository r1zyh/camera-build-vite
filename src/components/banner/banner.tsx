import SwiperCore from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { TPromos } from '../../types/promo';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

SwiperCore.use([Pagination, Autoplay]);

interface BannerProps {
  banners: TPromos | null;
}

function Banner({ banners }: BannerProps): JSX.Element {
  if (!banners || banners.length === 0) {
    return <div></div>;
  }

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="banner" data-testid="banner">
            <picture>
              <source
                type="image/webp"
                srcSet={`${banner.previewImgWebp}, ${banner.previewImgWebp2x} 2x`}
              />
              <img
                src={banner.previewImg}
                srcSet={`${banner.previewImg2x} 2x`}
                width={1280}
                height={280}
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{banner.name}</span>
              <span className="banner__text">
                Профессиональная камера от известного производителя
              </span>
              <Link
                className="btn"
                to={`${AppRoute.Product}/${banner.id}`}
              >
                Подробнее
              </Link>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
