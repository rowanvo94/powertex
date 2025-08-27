import template from './sw-cms-preview-cta.html.twig';
import './sw-cms-preview-cta.scss';

Shopware.Component.register('sw-cms-preview-cta', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});