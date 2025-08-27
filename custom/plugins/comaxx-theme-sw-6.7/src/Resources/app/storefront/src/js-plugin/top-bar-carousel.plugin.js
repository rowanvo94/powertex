import Plugin from 'src/plugin-system/plugin.class';

export default class TopBarCarouselPlugin extends Plugin {
    _topBarCarousel() {
        const topBarItems = document.querySelectorAll('.js-top-bar-usp-item');
        const topBarSlider = document.querySelector('.js-top-bar-usp-slider');

        if (topBarItems.length > 0 && topBarSlider instanceof Element) {
            const swiper = new Swiper(topBarSlider, {
                slidesPerView: 1,
                autoplay: {
                    delay: 3000,
                },
                loop: true,
                breakpoints: {
                    900: {
                        slidesPerView: 3
                    }
                },
            });
        }
    }

    init() {
        this._topBarCarousel();
    }
}
