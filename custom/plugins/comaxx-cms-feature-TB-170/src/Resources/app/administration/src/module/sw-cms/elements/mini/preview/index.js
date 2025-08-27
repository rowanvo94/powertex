import template from './sw-cms-el-preview-mini.html.twig';
import './sw-cms-el-preview-mini.scss';

Shopware.Component.register('sw-cms-el-preview-mini', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});