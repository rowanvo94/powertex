import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'tabs',
    category: 'comaxx-custom',
    label: 'Tabs',
    component: 'sw-cms-block-tabs',
    previewComponent: 'sw-cms-preview-tabs',
    slots: {
        content: 'tabs',
    },
});
