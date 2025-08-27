import BaseSliderPlugin from 'src/plugin/slider/base-slider.plugin';
import SliderSettingsHelper from 'src/plugin/slider/helper/slider-settings.helper';

export default class CustomSliderPlugin extends BaseSliderPlugin {
    init() {
        const sliderEl = this.el.hasAttribute('data-base-slider-options') ? this.el : this.el.querySelector('[data-base-slider-options]');

        if (!sliderEl) {
            return;
        }

        if (sliderEl.closest('.tns-outer') || sliderEl.classList.contains('tns-slider')) {
            return;
        }

        let optionsRaw = sliderEl.getAttribute('data-base-slider-options');
        try {
            this._customOptions = JSON.parse(optionsRaw);
        } catch (e) {
            this._customOptions = {};
        }

        this.options = {
            ...this.constructor.options,
        };

        this.options.slider = {
            ...this.constructor.options.slider,
            ...this._customOptions.slider,
            responsive: {
                ...this.constructor.options.slider.responsive,
                ...((this._customOptions.slider && this._customOptions.slider.responsive) || {}),
            },
        };

        super.init();
    }

    _getSettings(viewport) {
        let baseSettings = super._getSettings ? super._getSettings(viewport) : this.options.slider || {};

        const customItems = this.settings?.responsive?.[viewport.toLowerCase()]?.items;

        if (typeof customItems !== 'undefined') {
            baseSettings.items = customItems;
        }

        return baseSettings;
    }
}
