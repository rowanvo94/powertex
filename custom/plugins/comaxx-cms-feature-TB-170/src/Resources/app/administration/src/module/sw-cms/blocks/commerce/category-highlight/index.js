import './component';
import './preview';


Shopware.Service('cmsService').registerCmsBlock({
    name: 'category-highlight',
    category: 'commerce',
    label: 'Category tree with highlight',
    component: 'sw-cms-block-category-highlight',
    previewComponent: 'sw-cms-preview-category-highlight',
    slots: {
        content: 'category-highlight'
    }
});