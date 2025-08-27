const { Component } = Shopware;
import template from './sw-cms-sidebar.html.twig';

Component.override('sw-cms-sidebar', {
    template,

    computed: {
        cmsBlockCategoriesOptions() {
            // haal originele opties op
            const original = this.$super('cmsBlockCategoriesOptions');

            // voeg extra opties toe
            return [
                ...original,
                { value: 'comaxx-grid', label: 'Grid / Columns' },
                { value: 'comaxx-custom', label: 'CMS / Custom' },
            ];
        },
    },
});
