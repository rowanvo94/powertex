import template from './sw-cms-el-preview-banner-link.html.twig';
import './sw-cms-el-preview-banner-link.scss';

Shopware.Component.register('sw-cms-el-preview-banner-link', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});