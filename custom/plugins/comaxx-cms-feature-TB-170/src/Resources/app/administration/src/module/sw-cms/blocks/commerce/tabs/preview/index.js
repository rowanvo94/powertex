import template from './sw-cms-preview-tabs.html.twig';
import './sw-cms-preview-tabs.scss';

Shopware.Component.register('sw-cms-preview-tabs', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});
