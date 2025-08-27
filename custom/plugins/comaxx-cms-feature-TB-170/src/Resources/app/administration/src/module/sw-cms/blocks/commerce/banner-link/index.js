import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'banner-link',
    category: 'comaxx-custom',
    label: 'sw-cms.elements.banner-link.label',
    component: 'sw-cms-block-banner-link',
    previewComponent: 'sw-cms-preview-banner-link',
    slots: {
        content: 'banner-link',
    },
});
