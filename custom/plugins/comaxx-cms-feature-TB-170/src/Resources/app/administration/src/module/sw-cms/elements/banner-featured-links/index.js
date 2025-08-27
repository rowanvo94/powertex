import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'banner-featured-links',
    label: 'sw-cms.elements.banner-featured-links.label',
    component: 'sw-cms-el-banner-featured-links',
    configComponent: 'sw-cms-el-config-banner-featured-links',
    previewComponent: 'sw-cms-el-preview-banner-featured-links',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            entity: {
                name: 'media',
            },
        },
        bannerContent: {
            source: 'static',
            value: 'Banner Content',
        },
        bannerBackgroundColor: {
            source: 'static',
            value: '#cecece',
        },
    },
});
