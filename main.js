import 'normalize.css';
import './style.scss';

import Swiper from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';

const swiperThumbnails = new Swiper(".product__slider-thumbnails", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
new Swiper(".product__slider-main", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".product__arrow-next",
    prevEl: ".product__arrow-prev",
  },
  modules: [Navigation, Thumbs],
  thumbs: {
    swiper: swiperThumbnails,
  },
});


