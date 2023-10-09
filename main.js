import "normalize.css";
import "./style.scss";
import { routerFunc } from "./modules/commonFunc/routerFunc";
import { Header } from "./modules/Header/Header";
import { Main } from "./modules/Main/Main";
import { Footer } from "./modules/Footer/Footer";

const productSlider = () => {
    Promise.all([
        import("swiper/modules"),
        import("swiper"),
        import("swiper/css"),
    ]).then(([{ Navigation, Thumbs }, Swiper]) => {
        const swiperThumbnails = new Swiper.default(
            ".product__slider-thumbnails",
            {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            }
        );
        new Swiper.default(".product__slider-main", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".product__arrow_next",
                prevEl: ".product__arrow_prev",
            },
            modules: [Navigation, Thumbs],
            thumbs: {
                swiper: swiperThumbnails,
            },
        });
    });
};

const init = () => {
    productSlider();
    routerFunc();
    const header = new Header();
    header.mount();
    const main = new Main();
    main.mount();
    const footer = new Footer();
    footer.mount();
};

init();
