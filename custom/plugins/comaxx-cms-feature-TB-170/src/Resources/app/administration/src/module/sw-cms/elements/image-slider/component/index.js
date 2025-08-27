import template from './sw-cms-el-comaxx-image-slider.html.twig';
import './sw-cms-el-comaxx-image-slider.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-comaxx-image-slider', {
    template,

    mixins: [Mixin.getByName('cms-element')],

    data() {
        return {
            sliderItems: [],
        };
    },

    watch: {
        'element.config.sliderItems.value': {
            handler() {
                this.enrichSliderItems();
            },
            immediate: true,
            deep: true,
        },
    },

    methods: {
        enrichSliderItems() {
            const items = this.element.config.sliderItems?.value || [];

            const enriched = items.map((item) => {
                const mediaUrl = item.media?.url || item.mediaUrl || null;
                const alt = item.media?.alt || item.alt || '';

                return {
                    mediaUrl,
                    alt,
                };
            });

            this.sliderItems = enriched;
        },

        getBackgroundStyle(item) {
            const url = item.mediaUrl || '';

            return {
                backgroundImage: url ? `url('${encodeURI(url)}')` : 'none',
                backgroundSize: this.element.config.displayMode?.value || 'cover',
                backgroundPosition: this.element.config.verticalAlign?.value || 'center',
                width: '100%',
                height: 'auto',
                backgroundColor: url ? 'transparent' : '#eee',
            };
        },
    },
});
