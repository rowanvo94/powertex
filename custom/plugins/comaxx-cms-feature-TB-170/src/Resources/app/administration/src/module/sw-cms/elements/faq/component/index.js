import template from './sw-cms-el-faq.html.twig';
import './sw-cms-el-faq.scss';

Shopware.Component.register('sw-cms-el-faq', {
    template,

    mixins: ['cms-element'],

    computed: {
        categoryTitle() {
            return this.element.config.categoryTitle?.value || '';
        },

        // Pak maximaal 3 vragen
        faqQuestions() {
            const faqs = this.element.config.faqItems?.value || [];
            return faqs.slice(0, 4).map((faq) => faq.question || '');
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('faq');
            this.initElementData('faq');
        },
    },
});
