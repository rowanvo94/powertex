import template from './sw-cms-el-config-faq.html.twig';

Shopware.Component.register('sw-cms-el-config-faq', {
    template,

    mixins: ['cms-element'],

    data() {
        return {
            titleOptions: [
                { value: 'h1', label: 'H1' },
                { value: 'h2', label: 'H2' },
                { value: 'h3', label: 'H3' },
                { value: 'h4', label: 'H4' },
                { value: 'h5', label: 'H5' },
                { value: 'h6', label: 'H6' },
                { value: 'span', label: 'Span' },
            ],
        };
    },

    computed: {
        titleType: {
            get() {
                return this.element.config.titleType?.value || 'h2';
            },
            set(value) {
                this.element.config.titleType.value = value;
                this.$emit('element-update', this.element);
            },
        },
    },

    methods: {
        addFaq() {
            if (!this.element.config.faqItems.value) {
                this.element.config.faqItems.value = [];
            }

            this.element.config.faqItems.value.push({
                id: Date.now() + Math.random(),
                question: '',
                answer: '',
                questionTitleType: 'h3',
            });

            this.$emit('element-update', this.element);
        },

        onDeleteFaq(index) {
            if (!this.element.config.faqItems.value) return;

            this.element.config.faqItems.value.splice(index, 1);
            this.$emit('element-update', this.element);
        },

        updateQuestion(index, value) {
            if (!this.element.config.faqItems.value) return;

            this.element.config.faqItems.value[index].question = value;
            this.$emit('element-update', this.element);
        },

        updateQuestionTitleType(index, value) {
            if (!this.element.config.faqItems.value) return;

            this.element.config.faqItems.value[index].questionTitleType = value;
            this.$emit('element-update', this.element);
        },

        updateAnswer(index, value) {
            if (!this.element.config.faqItems.value) return;

            this.element.config.faqItems.value[index].answer = value;
            this.$emit('element-update', this.element);
        },
    },
});
