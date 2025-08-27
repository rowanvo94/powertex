import template from './sw-cms-el-preview-faq-nested.html.twig';
import './sw-cms-el-preview-faq-nested.scss';

Shopware.Component.register('sw-cms-el-preview-faq-nested', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});
