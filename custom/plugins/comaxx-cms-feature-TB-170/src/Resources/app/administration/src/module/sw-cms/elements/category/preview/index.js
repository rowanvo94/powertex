import template from './sw-cms-el-preview-category.html.twig';
import './sw-cms-el-preview-category.scss';

Shopware.Component.register('sw-cms-el-preview-category', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});