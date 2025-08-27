import template from './sw-cms-el-tabs.html.twig';
import './sw-cms-el-tabs.scss';

Shopware.Component.register('sw-cms-el-tabs', {
    template,

    mixins: ['cms-element'],

    computed: {
        tabTitle() {
            return this.element.config.tabTitle?.value || '';
        },

        // Pak maximaal 3 vragen
        tabQuestions() {
            const tabs = this.element.config.tabItems?.value || [];
            return tabs.slice(0, 4).map((tab) => tab.question || '');
        },

        firstAnswer() {
            const tabs = this.element.config.tabItems?.value || [];
            return tabs.length > 0 ? tabs[0].answer || '' : '';
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('tabs');
            this.initElementData('tabs');
        },
    },
});
