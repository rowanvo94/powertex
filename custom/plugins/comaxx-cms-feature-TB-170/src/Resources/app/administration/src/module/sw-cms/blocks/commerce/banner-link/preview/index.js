import template from './sw-cms-preview-banner-link.html.twig';
import './sw-cms-preview-banner-link.scss';

Shopware.Component.register('sw-cms-preview-banner-link', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});