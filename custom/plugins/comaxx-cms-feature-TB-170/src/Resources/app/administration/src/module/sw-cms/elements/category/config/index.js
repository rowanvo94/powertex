import template from './sw-cms-el-config-category.html.twig';

const { Service } = Shopware;

Shopware.Component.register('sw-cms-el-config-category', {
    template,

    mixins: ['cms-element'],

    inject: ['repositoryFactory'],

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
            titlePositionOptions: [
                { value: 'under', label: 'Under image' },
                { value: 'on-top', label: 'On top of image' },
            ],
            titleHorizontalOptions: [
                { value: 'flex-start', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'flex-end', label: 'Right' },
            ],
            titleVerticalOptions: [
                { value: 'flex-start', label: 'Top' },
                { value: 'center', label: 'Center' },
                { value: 'flex-end', label: 'Bottom' },
            ],
            categoryShapeOptions: [
                { value: 'circle', label: 'Circle' },
                { value: 'square', label: 'Square' },
            ],
            imageFitOptions: [
                { value: 'contain', label: 'Contain' },
                { value: 'cover', label: 'Cover' },
            ],
        };
    },

    computed: {
        categoryShape: {
            get() {
                return this.element.config.categoryShape?.value || 'circle';
            },

            set(value) {
                this.element.config.categoryShape.value = value;
                this.$emit('element-update', this.element);
            },
        },

        category: {
            get() {
                return this.element.config.category.value;
            },

            set(value) {
                this.element.config.category.value = value;
            },
        },

        categoryTitleStyle: {
            get() {
                return this.element.config.categoryTitleStyle?.value || 'h2';
            },

            set(value) {
                this.element.config.categoryTitleStyle.value = value;
                this.$emit('element-update', this.element);
            },
        },

        categoryTitlePosition: {
            get() {
                return this.element.config.categoryTitlePosition?.value || 'under';
            },

            set(value) {
                this.element.config.categoryTitlePosition.value = value;
                this.$emit('element-update', this.element);
            },
        },

        categoryTitleHorizontal: {
            get() {
                return this.element.config.categoryTitleHorizontal?.value || 'flex-start';
            },

            set(value) {
                this.element.config.categoryTitleHorizontal.value = value;
                this.$emit('element-update', this.element);
            },
        },

        categoryTitleVertical: {
            get() {
                return this.element.config.categoryTitleVertical?.value || 'flex-start';
            },

            set(value) {
                this.element.config.categoryTitleVertical.value = value;
                this.$emit('element-update', this.element);
            },
        },

        categoryImageInnerPadding: {
            get() {
                return this.element.config.categoryImageInnerPadding.value;
            },
            set(value) {
                this.element.config.categoryImageInnerPadding.value = value;
            },
        },

        categoryImageFit: {
            get() {
                return this.element.config.categoryImageFit?.value || 'cover';
            },

            set(value) {
                this.element.config.categoryImageFit.value = value;
                this.$emit('element-update', this.element);
            },
        },

        categoryBackgroundColor: {
            get() {
                return this.element.config.categoryBackgroundColor.value;
            },

            set(value) {
                this.element.config.categoryBackgroundColor.value = value;
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

        categoryImagePadding: {
            get() {
                return this.element.config.categoryImagePadding.value;
            },

            set(value) {
                this.element.config.categoryImagePadding.value = value;
            },
        },
    },

    created() {
        this.createdComponent();
        // this.loadCategories();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('category');
        },

        changeBackgroundColor(value) {
            this.element.config.categoryBackgroundColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeTitleColor(value) {
            this.element.config.categoryTitleColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategory(value) {
            this.element.config.category.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategoryTitleStyle(value) {
            this.element.config.categoryTitleStyle.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategoryTitlePosition(value) {
            this.element.config.categoryTitlePosition.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategoryTitleHorizontal(value) {
            this.element.config.categoryTitleHorizontal.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategoryTitleVertical(value) {
            this.element.config.categoryTitleVertical.value = value;

            this.$emit('element-update', this.element);
        },

        onChangeInnerPadding(value) {
            this.element.config.categoryImageInnerPadding.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategoryShape(value) {
            this.element.config.categoryShape.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategoryImageFit(value) {
            this.element.config.categoryImageFit.value = value;

            this.$emit('element-update', this.element);
        },

        onChangePadding(value) {
            this.element.config.categoryImagePadding.value = value;

            this.$emit('element-update', this.element);
        },
    },
});
