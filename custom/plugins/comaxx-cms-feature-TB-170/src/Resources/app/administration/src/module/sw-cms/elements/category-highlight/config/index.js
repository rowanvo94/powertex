import template from './sw-cms-el-config-category-highlight.html.twig';

Shopware.Component.register('sw-cms-el-config-category-highlight', {
    template,

    mixins: [
        'cms-element',
    ],

    inject: [
        'repositoryFactory',
    ],

    computed: {
        categoryTitle: {
            get() {
                return this.element.config.categoryTitle.value;
            },

            set(value) {
                this.element.config.categoryTitle.value = value;
            },
        },
        categoryTitleSize: {
            get() {
                return this.element.config.categoryTitleSize.value;
            },

            set(value) {
                this.element.config.categoryTitleSize.value = value;
            },
        },
        categoryTitleColor: {
            get() {
                return this.element.config.categoryTitleColor.value;
            },

            set(value) {
                this.element.config.categoryTitleColor.value = value;
            },
        },
        categoryMain: {
            get() {
                return this.element.config.categoryMain.value;
            },

            set(value) {
                this.element.config.categoryMain.value = value;
            },
        },
        categoryLinkColor: {
            get() {
                return this.element.config.categoryLinkColor.value;
            },

            set(value) {
                this.element.config.categoryLinkColor.value = value;
            },
        },
        categoryHighlight1: {
            get() {
                return this.element.config.categoryHighlight1.value;
            },

            set(value) {
                this.element.config.categoryHighlight1.value = value;
            },
        },
        highlight1Color: {
            get() {
                return this.element.config.highlight1Color.value;
            },

            set(value) {
                this.element.config.highlight1Color.value = value;
            },
        },
        categoryHighlight2: {
            get() {
                return this.element.config.categoryHighlight2.value;
            },

            set(value) {
                this.element.config.categoryHighlight2.value = value;
            },
        },
        highlight2Color: {
            get() {
                return this.element.config.highlight2Color.value;
            },

            set(value) {
                this.element.config.highlight2Color.value = value;
            },
        },
        categoryHighlight3: {
            get() {
                return this.element.config.categoryHighlight3.value;
            },

            set(value) {
                this.element.config.categoryHighlight3.value = value;
            },
        },
        highlight3Color: {
            get() {
                return this.element.config.highlight3Color.value;
            },

            set(value) {
                this.element.config.highlight3Color.value = value;
            },
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('category-highlight');
        },

        changeTitle(value) {
            this.element.config.categoryTitle.value = value;

            this.$emit('element-update', this.element);
        },
        changeTitleSize(value) {
            this.element.config.categoryTitleSize.value = value;

            this.$emit('element-update', this.element);
        },
        changeTitleColor(value) {
            this.element.config.categoryTitleColor.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategoryMain(value) {
            console.log('Selected category:', value);

            this.element.config.categoryMain.value = value;
            console.log('After setting:', this.element.config.categoryMain.value);

            this.$emit('element-update', this.element);
        },
        changeLinkColor(value) {
            this.element.config.categoryLinkColor.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategoryHighlight1(value) {
            this.element.config.categoryHighlight1.value = value;

            this.$emit('element-update', this.element);
        },
        changeHighlight1Color(value) {
            this.element.config.highlight1Color.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategoryHighlight2(value) {
            this.element.config.categoryHighlight2.value = value;

            this.$emit('element-update', this.element);
        },
        changeHighlight2Color(value) {
            this.element.config.highlight2Color.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategoryHighlight3(value) {
            this.element.config.categoryHighlight3.value = value;

            this.$emit('element-update', this.element);
        },
        changeHighlight3Color(value) {
            this.element.config.highlight3Color.value = value;

            this.$emit('element-update', this.element);
        },
    },

    watch: {
        'element.config.categoryMain.value'(newVal) {
            console.log('Watcher triggered for categoryMain. New value:', newVal);
        },
    },
});
