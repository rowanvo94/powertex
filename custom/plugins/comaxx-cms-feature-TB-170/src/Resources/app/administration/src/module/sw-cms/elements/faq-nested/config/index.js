import template from './sw-cms-el-config-faq-nested.html.twig';

Shopware.Component.register('sw-cms-el-config-faq-nested', {
    template,

    mixins: ['cms-element'],

    data() {
        return {};
    },

    methods: {
        addCategory() {
            this.element.config.categories.value.push({
                name: '',
                questions: [
                    {
                        question: '',
                        answer: '',
                    },
                ],
            });
        },

        removeCategory(index) {
            this.element.config.categories.value.splice(index, 1);
        },

        addQuestion(categoryIndex) {
            this.element.config.categories.value[categoryIndex].questions.push({
                question: '',
                answer: '',
            });
        },

        removeQuestion(categoryIndex, questionIndex) {
            this.element.config.categories.value[categoryIndex].questions.splice(questionIndex, 1);
        },
    },
});
