import template from './sw-cms-el-preview-tabs.html.twig';
import './sw-cms-el-preview-tabs.scss';

Shopware.Component.register('sw-cms-el-preview-tabs', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});
