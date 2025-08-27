import template from './sw-cms-el-preview-banner-featured-links.html.twig';
import './sw-cms-el-preview-banner-featured-links.scss';

Shopware.Component.register('sw-cms-el-preview-banner-featured-links', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});
