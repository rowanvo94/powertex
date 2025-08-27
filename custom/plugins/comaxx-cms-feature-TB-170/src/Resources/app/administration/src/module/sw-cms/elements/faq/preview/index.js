import template from './sw-cms-el-preview-faq.html.twig';
import './sw-cms-el-preview-faq.scss';

Shopware.Component.register('sw-cms-el-preview-faq', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    },
});
