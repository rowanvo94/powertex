import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'category-slider',
    category: 'comaxx-custom',
    label: 'Category slider',
    component: 'sw-cms-block-category-slider',
    previewComponent: 'sw-cms-preview-category-slider',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        content: 'category-slider',
    },
});
