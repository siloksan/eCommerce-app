import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import imagesPlaceholder from './imagePlaceholder';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import styles from './ImageSlide.module.scss';
import { TSwiper } from './SwiperType';

interface Props {
  images?: string[];
  alt?: string;
}

function ImageSlider({ images = imagesPlaceholder, alt = '' }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);

  const swiperSlideList = images.map((image) => {
    return (
      <SwiperSlide key={image}>
        <img src={image} alt={alt} />
      </SwiperSlide>
    );
  });

  if (images.length === 1) {
    return (
      <div className={styles.container}>
        <img src={images[0]} alt={alt} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Swiper
        loop
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.swiper_second}
      >
        {swiperSlideList}
      </Swiper>
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={images.length}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.swiper}
        >
          {swiperSlideList}
        </Swiper>
      )}
    </div>
  );
}

export default ImageSlider;
