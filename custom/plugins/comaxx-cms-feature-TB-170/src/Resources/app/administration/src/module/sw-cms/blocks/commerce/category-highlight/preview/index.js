import template from './sw-cms-preview-category-highlight.html.twig';
import './sw-cms-preview-category-highlight.scss';

Shopware.Component.register('sw-cms-preview-category-highlight', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});