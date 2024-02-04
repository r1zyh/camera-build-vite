import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { TPromos } from '../../types/promo';

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface BannerProps {
  banners: TPromos | null;
}

function Banner({ banners }: BannerProps): JSX.Element {
  if (!banners || banners.length === 0) {
    return null; 
    'some error template'
  }

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="banner">
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
              <a className="btn" href="#">
                Подробнее
              </a>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Banner;
