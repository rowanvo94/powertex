import Plugin from 'src/plugin-system/plugin.class';

export default class CategorySliderPlugin extends Plugin {
    init() {
        this._initializeSliders();
    }

    _initializeSliders() {
        // Select all category slider containers
        const sliderElements = document.querySelectorAll(
            '.category-slider-container'
        );

        // Loop through each slider container
        sliderElements.forEach((sliderElement, index) => {
            // Check if the slider is already initialized by looking for an instance-specific attribute or class
            if (!sliderElement.classList.contains('slider-initialized')) {
                // Parse the slider options from the closest parent element
                const sliderParent = sliderElement.closest(
                    '[data-category-slider="true"]'
                );
                const options = JSON.parse(
                    sliderParent.getAttribute('data-category-slider-options')
                );

                // Ensure Tiny Slider (tns) is loaded
                if (window.tns) {
                    // Initialize Tiny Slider for each slider
                    const slider = window.tns({
                        container: sliderElement,
                        autoplay: options.slider.autoplay,
                        loop: options.slider.loop,
                        slideBy: options.slider.slideBy,
                        speed: options.slider.speed,
                        nav: options.slider.nav,
                        controls: options.slider.controls,
                        mouseDrag: options.slider.mouseDrag,
                        gutter: options.slider.gutter,
                        controlsContainer: options.slider.controlsContainer,
                        lazyload: options.slider.lazyload,
                        swipeAngle: options.slider.swipeAngle,
                        responsive: options.slider.responsive,
                    });

                    // Add a class to mark this slider as initialized
                    sliderElement.classList.add('slider-initialized');

                    // Reveal divs containing images after slider is initialized
                    const imageContainers = sliderElement.querySelectorAll(
                        '.cms-element-category-slider-image'
                    );
                    imageContainers.forEach((container) => {
                        container.style.visibility = 'visible'; // Reveal the div container after slider is initialized
                    });
                }
            }
        });
    }
}
