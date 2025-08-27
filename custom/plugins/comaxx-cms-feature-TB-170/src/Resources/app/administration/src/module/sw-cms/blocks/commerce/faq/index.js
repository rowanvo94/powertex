import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'faq',
    category: 'comaxx-custom',
    label: 'FAQ',
    component: 'sw-cms-block-faq',
    previewComponent: 'sw-cms-preview-faq',
    slots: {
        content: 'faq',
    },
});
