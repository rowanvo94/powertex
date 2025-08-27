import template from './sw-cms-el-preview-comaxx-image-slider.html.twig';
import './sw-cms-el-preview-comaxx-image-slider.scss';

Shopware.Component.register('sw-cms-el-preview-comaxx-image-slider', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});
