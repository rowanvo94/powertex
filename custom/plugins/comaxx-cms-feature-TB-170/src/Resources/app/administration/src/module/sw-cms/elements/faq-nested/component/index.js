import template from './sw-cms-el-faq-nested.html.twig';
import './sw-cms-el-faq-nested.scss';

Shopware.Component.register('sw-cms-el-faq-nested', {
    template,

    mixins: ['cms-element'],

    computed: {},

    watch: {},

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('faq-nested');
            this.initElementData('faq-nested');
        },
    },
});
