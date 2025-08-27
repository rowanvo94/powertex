import template from './sw-cms-el-category-highlight.html.twig';
import './sw-cms-el-category-highlight.scss';

Shopware.Component.register('sw-cms-el-category-highlight', {
    template,

    mixins: [
        'cms-element'
    ],

    computed: {
        categoryTitle() {
            return `${this.element.config.categoryTitle.value}`;
        },
        categoryTitleSize() {
            let categoryTitleSize = this.element.config.categoryTitleSize.value;

            return {
                'font-size': categoryTitleSize,
            };
        },
        categoryTitleColor() {
            let categoryTitleColor = this.element.config.categoryTitleColor.value;

            return {
                'color': categoryTitleColor,
            };
        },
        categoryTitleStyles() {
            return {
                ...this.categoryTitleSize,
                ...this.categoryTitleColor,
            };
        },
        categoryLinkColor() {
            let categoryLinkColor = this.element.config.categoryLinkColor.value;

            return {
                'color': categoryLinkColor,
            };
        },
        highlight1Color() {
            let highlight1Color = this.element.config.highlight1Color.value;

            return {
                'color': highlight1Color,
            };
        },
        highlight2Color() {
            let highlight2Color = this.element.config.highlight2Color.value;

            return {
                'color': highlight2Color,
            };
        },
        highlight3Color() {
            let highlight3Color = this.element.config.highlight3Color.value;

            return {
                'color': highlight3Color,
            };
        },
        categoryCriteria() {
            const criteria = new Shopware.Data.Criteria();
            criteria.addSorting({
                field: 'name', order: 'ASC'
            });
            return criteria;
        },
    },

    watch: {
        cmsPageState: {
            deep: true,
            handler() {
                this.$forceUpdate();
            },
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('category-highlight');
            this.initElementData('category-highlight');
        }
    }
});