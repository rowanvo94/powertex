import template from './sw-cms-el-preview-category-slider.html.twig';
import './sw-cms-el-preview-category-slider.scss';

Shopware.Component.register('sw-cms-el-preview-category-slider', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});