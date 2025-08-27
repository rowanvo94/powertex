import template from './sw-cms-preview-featured-links.html.twig';
import './sw-cms-preview-featured-links.scss';

Shopware.Component.register('sw-cms-preview-featured-links', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },

});