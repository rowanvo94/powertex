import template from './sw-cms-el-category.html.twig';
import './sw-cms-el-category.scss';

Shopware.Component.register('sw-cms-el-category', {
    template,

    mixins: ['cms-element'],

    inject: ['repositoryFactory'],

    data() {
        return {
            categoryName: '',
            mediaUrl: '',
        };
    },

    computed: {
        categoryBackgroundColor() {
            let categoryBackgroundColor =
                this.element.config.categoryBackgroundColor.value;

            return {
                'background-color': categoryBackgroundColor,
            };
        },

        categoryTitleStyle() {
            return this.element.config.categoryTitleStyle.value || 'h3';
        },

        categoryTitleColorStyle() {
            const color = this.element.config.categoryTitleColor?.value;

            return color ? { color: color } : {};
        },

        categoryContentClass() {
            return {
                'is-on-top': this.categoryTitlePosition === 'on-top',
            };
        },

        categoryTitlePosition() {
            return this.element.config.categoryTitlePosition?.value || 'under';
        },

        categoryShape() {
            return `is-${this.element.config.categoryShape.value}`;
        },

        categoryImageFit() {
            return `is-${this.element.config.categoryImageFit.value}`;
        },

        categoryImagePadding() {
            let categoryImagePadding =
                this.element.config.categoryImagePadding.value;

            return {
                padding: categoryImagePadding,
            };
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
        'element.config.category.value': {
            handler(newValue) {
                this.fetchCategoryName();
            },
            immediate: true,
        },
        cmsPageState: {
            deep: true,
            handler() {
                this.$forceUpdate();
            },
        },
    },

    created() {
        this.initElementConfig('category');
        this.fetchCategoryName();
    },

    methods: {
        fetchCategoryName() {
            const categoryId = this.element.config.category.value;

            // If no category is selected, use the fallback image
            if (!categoryId) {
                this.categoryName = '';
                this.mediaUrl = this.getFallbackImage(); // Fallback to static image when no category is selected
                return;
            }

            const repository = this.repositoryFactory.create('category');
            const criteria = new Shopware.Data.Criteria();

            // Include media in the category fetch
            criteria.addAssociation('media');

            repository
                .get(categoryId, Shopware.Context.api, criteria)
                .then((category) => {
                    this.categoryName = category.name;

                    // If the category has a media image, use it; otherwise, fall back to the default image
                    if (category.media && category.media.url) {
                        this.mediaUrl = category.media.url;
                    } else {
                        this.mediaUrl = this.getFallbackImage(); // Fallback to static image if no media is set
                    }
                });
        },

        // Fallback image URL (static)
        getFallbackImage() {
            return Shopware.Filter.getByName('asset')(
                'administration/static/img/cms/preview_mountain_large.jpg'
            );
        },

        initElementConfig(type) {
            if (!this.element.config) {
                this.element.config = {};
            }

            if (!this.element.config[type]) {
                this.element.config[type] = {
                    value: null,
                };
            }
        },
    },
});
