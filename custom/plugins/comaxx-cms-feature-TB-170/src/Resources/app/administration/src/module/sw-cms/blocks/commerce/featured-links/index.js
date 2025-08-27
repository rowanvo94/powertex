import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'featured-links',
    category: 'comaxx-custom',
    label: 'Featured Links',
    component: 'sw-cms-block-featured-links',
    previewComponent: 'sw-cms-preview-featured-links',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        'banner-featured-links': 'banner-featured-links',
        'mini-cta-1': 'mini',
        'mini-cta-2': 'mini',
        'mini-cta-3': 'mini',
        'mini-cta-4': 'mini',
    },
});
