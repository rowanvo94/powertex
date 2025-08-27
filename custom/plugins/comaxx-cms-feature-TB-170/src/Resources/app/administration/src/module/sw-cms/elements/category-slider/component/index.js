import template from './sw-cms-el-category-slider.html.twig';
import './sw-cms-el-category-slider.scss';

Shopware.Component.register('sw-cms-el-category-slider', {
    template,

    mixins: ['cms-element'],

    inject: ['repositoryFactory'],

    data() {
        return {
            selectedCategories: [],
            mediaUrl: '',
        };
    },

    computed: {
        combinedStyles() {
            return {
                ...this.categoryImagePadding, // Image padding from computed property
                ...this.categoryBackgroundColor, // Background color from computed property
            };
        },

        selectedCategoriesForTemplate() {
            return this.selectedCategories;
        },

        categoryShape() {
            return `is-${this.element.config.categoryShape?.value || 'circle'}`; // Default to 'circle' if not set
        },

        categoryImageFit() {
            return `is-${
                this.element.config.categoryImageFit?.value || 'default'
            }`;
        },

        categoryImagePadding() {
            let categoryImagePadding =
                this.element.config.categoryImagePadding?.value || '16px'; // Default to '16px' if no value
            return {
                padding: categoryImagePadding,
            };
        },

        categoryBackgroundColor() {
            let categoryBackgroundColor =
                this.element.config.categoryBackgroundColor?.value || '#cecece'; // Default to white
            return {
                'background-color': categoryBackgroundColor,
            };
        },

        categoryContent() {
            return (
                this.element?.config?.categoryContent?.value ||
                'Content placeholder'
            );
        },

        categoryCriteria() {
            const criteria = new Shopware.Data.Criteria();
            criteria.addSorting({
                field: 'name',
                order: 'ASC',
            });
            return criteria;
        },
    },

    watch: {
        selectedCategoriesForTemplate(newVal) {
            // You can log this in a more appropriate context if needed
        },
        'element.config.categories.value': {
            deep: true,
            handler(newCategoryIds) {
                this.fetchCategoryDetails(newCategoryIds);
            },
        },
        cmsPageState: {
            deep: true,
            handler() {
                this.$forceUpdate();
            },
        },
    },

    mounted() {
        this.initElementConfig('category-slider');
        const categoryIds = this.element.config.categories?.value || [];
        this.fetchCategoryDetails(categoryIds);
    },

    methods: {
        async fetchCategoryDetails(categoryIds) {
            if (!categoryIds || categoryIds.length === 0) {
                this.selectedCategories = [];
                return;
            }

            try {
                const categoryRepository =
                    this.repositoryFactory.create('category');
                const criteria = new Shopware.Data.Criteria();
                criteria.setIds(categoryIds);
                criteria.addAssociation('media');

                const categories = await categoryRepository.search(
                    criteria,
                    Shopware.Context.api
                );

                this.selectedCategories = categories.map((category) => ({
                    name: category.name,
                    mediaUrl: category.media ? category.media.url : null,
                }));
            } catch (error) {
                this.selectedCategories = [];
            }
        },

        getFallbackImage() {
            return Shopware.Filter.getByName('asset')(
                'administration/static/img/cms/preview_mountain_large.jpg'
            );
        },

        initElementConfig(type) {
            if (!this.element.config) {
                this.element.config = {};
            }

            if (!this.element.config.categories) {
                this.element.config.categories = { value: [] }; // Default to an empty array
            }

            if (!this.element.config.categoryShape) {
                this.element.config.categoryShape = { value: 'circle' }; // Default value (circle)
            }

            if (!this.element.config.categoryImageFit) {
                this.element.config.categoryImageFit = { value: 'cover' }; // Default value
            }

            if (!this.element.config.categoryImagePadding) {
                this.element.config.categoryImagePadding = { value: '16px' }; // Default padding
            }

            if (!this.element.config.categoryBackgroundColor) {
                this.element.config.categoryBackgroundColor = {
                    value: '#cecece',
                }; // Default color
            }

            if (!this.element.config.categoryContent) {
                this.element.config.categoryContent = {
                    value: '<h2>Content placeholder</h2>',
                };
            }

            if (!this.element.config.categorySliderItemsSm) {
                this.element.config.categorySliderItemsSm = { value: '2' };
            }

            if (!this.element.config.categorySliderItemsMd) {
                this.element.config.categorySliderItemsMd = { value: '4' };
            }

            if (!this.element.config.categorySliderItemsLg) {
                this.element.config.categorySliderItemsLg = { value: '6' };
            }

            if (!this.element.config.categorySliderNav) {
                this.element.config.categorySliderNav = { value: false };
            }

            if (!this.element.config.categorySliderControls) {
                this.element.config.categorySliderControls = { value: true };
            }

            if (
                !this.element.config.categorySliderControlPosition ||
                !this.element.config.categorySliderControlPosition.value ||
                !['top-right', 'centered', 'centered-whitespace'].includes(
                    this.element.config.categorySliderControlPosition.value
                )
            ) {
                this.element.config.categorySliderControlPosition = {
                    value: 'top-right', // Default value when not valid
                };
            }

            if (!this.element.config.categorySliderControlSpacing) {
                this.element.config.categorySliderControlSpacing = {
                    value: '',
                };
            }

            if (!this.element.config.categorySliderAuto) {
                this.element.config.categorySliderAuto = { value: false };
            }

            if (!this.element.config.categorySliderSpeed) {
                this.element.config.categorySliderSpeed = { value: '400' };
            }

            if (!this.element.config.categorySliderGutter) {
                this.element.config.categorySliderGutter = { value: '16' };
            }

            if (!this.element.config.categorySliderLazy) {
                this.element.config.categorySliderLazy = { value: true };
            }

            if (!this.element.config.categorySliderLoop) {
                this.element.config.categorySliderLoop = { value: true };
            }

            if (!this.element.config.categorySliderDrag) {
                this.element.config.categorySliderDrag = { value: true };
            }

            if (!this.element.config.categorySliderMobileNav) {
                this.element.config.categorySliderMobileNav = { value: true };
            }

            if (!this.element.config.categorySliderMobileControls) {
                this.element.config.categorySliderMobileControls = {
                    value: true,
                };
            }

            if (!this.element.config.categorySliderSlideBy) {
                this.element.config.categorySliderSlideBy = { value: '1' };
            }
        },

        async save() {
            const payload = this.element;

            if (!this.element.config.categories.value) {
                this.element.config.categories.value = []; // Default to an empty array if not selected
            }

            if (!this.element.config.categoryShape.value) {
                this.element.config.categoryShape.value = 'circle'; // Default to 'circle' if no shape is selected
            }

            try {
                const response = await axios.patch(
                    `/api/cms-page/${this.element.id}`,
                    payload
                );
            } catch (error) {
                this.handleSaveError(error);
            }
        },

        changeCategories(value) {
            if (Array.isArray(value)) {
                this.element.config.categories.value = value;
            } else {
                this.element.config.categories.value = [];
            }
            this.$emit('element-update', this.element);
        },

        handleSaveError(error) {
            if (error.response && error.response.data) {
                console.error('Error response:', error.response.data);
            } else {
                console.error('Save request failed:', error.message);
            }
        },
    },
});
