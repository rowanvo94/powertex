import template from './sw-cms-el-preview-category-highlight.html.twig';
import './sw-cms-el-preview-category-highlight.scss';

Shopware.Component.register('sw-cms-el-preview-category-highlight', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});