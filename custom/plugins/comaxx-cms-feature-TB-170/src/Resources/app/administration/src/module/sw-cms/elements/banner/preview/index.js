import template from './sw-cms-el-preview-banner.html.twig';
import './sw-cms-el-preview-banner.scss';

Shopware.Component.register('sw-cms-el-preview-banner', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});