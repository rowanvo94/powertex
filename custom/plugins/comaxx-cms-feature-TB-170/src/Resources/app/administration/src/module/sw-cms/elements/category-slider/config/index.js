import template from './sw-cms-el-config-category-slider.html.twig';

const { Service } = Shopware;

Shopware.Component.register('sw-cms-el-config-category-slider', {
    template,

    mixins: ['cms-element'],

    inject: ['repositoryFactory'],

    data() {
        return {
            multiSelectValues: [],
            isLoading: false,
            activeTab: 'category',
            warningMessage: '', // To store the warning message when no category is selected
            shapeOptions: [
                { value: 'circle', label: 'Circle' },
                { value: 'square', label: 'Square' },
            ],
            imageFitOptions: [
                { value: 'cover', label: 'Cover' },
                { value: 'contain', label: 'Contain' },
            ],
            controlPositionOptions: [
                { value: 'top-right', label: 'Top (Right Side)' },
                { value: 'centered', label: 'Centered' },
                { value: 'centered-whitespace', label: 'Centered with Space' },
            ],
        };
    },

    computed: {
        categoryContent: {
            get() {
                return this.element.config.categoryContent.value;
            },

            set(value) {
                this.element.config.categoryContent.value = value;
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

        categoryShape: {
            get() {
                return this.element.config.categoryShape?.value || 'circle';
            },

            set(value) {
                this.element.config.categoryShape.value = value;
                this.$emit('element-update', this.element);
            },
        },

        categories: {
            get() {
                return this.element.config.categories.value;
            },

            set(value) {
                this.element.config.categories.value = value;
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

        categoryImagePadding: {
            get() {
                return this.element.config.categoryImagePadding.value;
            },

            set(value) {
                this.element.config.categoryImagePadding.value = value;
            },
        },
        categorySliderItemsSm: {
            get() {
                return this.element.config.categorySliderItemsSm.value;
            },

            set(value) {
                this.element.config.categorySliderItemsSm.value = value;
            },
        },
        categorySliderItemsMd: {
            get() {
                return this.element.config.categorySliderItemsMd.value;
            },

            set(value) {
                this.element.config.categorySliderItemsMd.value = value;
            },
        },
        categorySliderItemsLg: {
            get() {
                return this.element.config.categorySliderItemsLg.value;
            },

            set(value) {
                this.element.config.categorySliderItemsLg.value = value;
            },
        },
        categorySliderSpeed: {
            get() {
                return this.element.config.categorySliderSpeed.value;
            },

            set(value) {
                this.element.config.categorySliderSpeed.value = value;
            },
        },
        categorySliderGutter: {
            get() {
                return this.element.config.categorySliderGutter.value;
            },

            set(value) {
                this.element.config.categorySliderGutter.value = value;
            },
        },
        categorySliderSlideBy: {
            get() {
                return this.element.config.categorySliderSlideBy.value;
            },

            set(value) {
                this.element.config.categorySliderSlideBy.value = value;
            },
        },
        categorySliderNav: {
            get() {
                return this.element.config.categorySliderNav.value;
            },

            set(value) {
                this.element.config.categorySliderNav.value = value;
            },
        },
        categorySliderControls: {
            get() {
                return this.element.config.categorySliderControls.value;
            },

            set(value) {
                this.element.config.categorySliderControls.value = value;
            },
        },
        categorySliderControlPosition: {
            get() {
                return this.element.config.categorySliderControlPosition?.value || 'centered';
            },

            set(value) {
                this.element.config.categorySliderControlPosition.value = value;
                this.$emit('element-update', this.element);
            },
        },
        categorySliderControlSpacing: {
            get() {
                return this.element.config.categorySliderControlSpacing.value;
            },
            set(value) {
                this.element.config.categorySliderControlSpacing.value = value;
            },
        },
        categorySliderAuto: {
            get() {
                return this.element.config.categorySliderAuto.value;
            },

            set(value) {
                this.element.config.categorySliderAuto.value = value;
            },
        },
        categorySliderLazy: {
            get() {
                return this.element.config.categorySliderLazy.value;
            },

            set(value) {
                this.element.config.categorySliderLazy.value = value;
            },
        },
        categorySliderLoop: {
            get() {
                return this.element.config.categorySliderLoop.value;
            },

            set(value) {
                this.element.config.categorySliderLoop.value = value;
            },
        },
        categorySliderDrag: {
            get() {
                return this.element.config.categorySliderDrag.value;
            },

            set(value) {
                this.element.config.categorySliderDrag.value = value;
            },
        },
        categorySliderMobileNav: {
            get() {
                return this.element.config.categorySliderMobileNav.value;
            },

            set(value) {
                this.element.config.categorySliderMobileNav.value = value;
            },
        },
        categorySliderMobileControls: {
            get() {
                return this.element.config.categorySliderMobileControls.value;
            },

            set(value) {
                this.element.config.categorySliderMobileControls.value = value;
            },
        },
    },

    created() {
        this.createdComponent();
        this.loadCategories();

        if (!Array.isArray(this.element.config.categories.value)) {
            this.element.config.categories.value = [];
        }
    },

    methods: {
        createdComponent() {
            this.initElementConfig('category-slider');
        },

        setActiveItem(tabName) {
            this.activeTab = tabName;
        },

        changeBackgroundColor(value) {
            this.element.config.categoryBackgroundColor.value = value;
            this.$emit('element-update', this.element);
        },

        onChangeContent(value) {
            this.element.config.categoryContent.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategories(value) {
            console.log('changeCategories called with:', value);
            if (Array.isArray(value)) {
                this.element.config.categories.value = value;
            } else {
                this.element.config.categories.value = []; // Handle invalid value gracefully
            }

            // If no categories are selected, show the warning message
            if (this.element.config.categories.value.length === 0) {
                this.warningMessage = 'At least one category must be selected.';
            } else {
                this.warningMessage = ''; // Clear the warning message when categories are selected
            }

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

        changeCategorySliderItemsSm(value) {
            if (!this.element.config.categorySliderItemsSm) {
                this.element.config.categorySliderItemsSm = { value: '' };
            }
            this.element.config.categorySliderItemsSm.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategorySliderItemsMd(value) {
            if (!this.element.config.categorySliderItemsMd) {
                this.element.config.categorySliderItemsMd = { value: '' };
            }
            this.element.config.categorySliderItemsMd.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategorySliderItemsLg(value) {
            if (!this.element.config.categorySliderItemsLg) {
                this.element.config.categorySliderItemsLg = { value: '' };
            }
            this.element.config.categorySliderItemsLg.value = value;

            this.$emit('element-update', this.element);
        },

        changeCategorySliderSpeed(value) {
            this.element.config.categorySliderSpeed.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderGutter(value) {
            this.element.config.categorySliderGutter.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderSlideBy(value) {
            this.element.config.categorySliderSlideBy.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderNav(value) {
            this.element.config.categorySliderNav.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderControls(value) {
            this.element.config.categorySliderControls.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderControlPosition(value) {
            this.element.config.categorySliderControlPosition.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderControlSpacing(value) {
            this.element.config.categorySliderControlSpacing.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderAuto(value) {
            this.element.config.categorySliderAuto.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderLazy(value) {
            this.element.config.categorySliderLazy.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderLoop(value) {
            this.element.config.categorySliderLoop.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderDrag(value) {
            this.element.config.categorySliderDrag.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderMobileNav(value) {
            this.element.config.categorySliderMobileNav.value = value;

            this.$emit('element-update', this.element);
        },
        changeCategorySliderMobileControls(value) {
            this.element.config.categorySliderMobileControls.value = value;

            this.$emit('element-update', this.element);
        },

        async loadCategories() {
            this.isLoading = true;
            try {
                const categoryRepository = Service('repositoryFactory').create('category');
                const criteria = new Shopware.Data.Criteria();
                const categories = await categoryRepository.search(criteria, Shopware.Context.api);

                this.multiSelectValues = categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                }));
            } catch (error) {
                this.multiSelectValues = [];
            } finally {
                this.isLoading = false;
            }
        },
    },
});
