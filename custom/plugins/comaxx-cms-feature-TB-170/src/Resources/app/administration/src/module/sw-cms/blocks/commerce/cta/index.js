import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'cta',
    category: 'comaxx-custom',
    label: 'Cta with background',
    component: 'sw-cms-block-cta',
    previewComponent: 'sw-cms-preview-cta',
    slots: {
        content: 'cta',
    },
});
