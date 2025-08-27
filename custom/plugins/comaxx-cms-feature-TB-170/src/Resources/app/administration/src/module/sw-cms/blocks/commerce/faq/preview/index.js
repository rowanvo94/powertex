import template from './sw-cms-preview-faq.html.twig';
import './sw-cms-preview-faq.scss';

Shopware.Component.register('sw-cms-preview-faq', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});
