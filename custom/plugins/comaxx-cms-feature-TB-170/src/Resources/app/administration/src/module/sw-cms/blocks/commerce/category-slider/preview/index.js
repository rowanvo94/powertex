import template from './sw-cms-preview-category-slider.html.twig';
import './sw-cms-preview-category-slider.scss';

Shopware.Component.register('sw-cms-preview-category-slider', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },

});