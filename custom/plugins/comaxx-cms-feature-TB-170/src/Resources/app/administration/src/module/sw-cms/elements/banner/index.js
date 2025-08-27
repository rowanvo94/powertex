import './component';
import './config';
import './preview';

/**
 * @private
 * @sw-package discovery
 */
Shopware.Service('cmsService').registerCmsElement({
    name: 'banner',
    label: 'sw-cms.elements.banner.label',
    component: 'sw-cms-el-banner',
    configComponent: 'sw-cms-el-config-banner',
    previewComponent: 'sw-cms-el-preview-banner',
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
        textAlignment: {
            source: 'static',
            value: 'center',
        },
        textAlignmentHorizontal: {
            source: 'static',
            value: 'center',
        },
        textContainerBackground: {
            source: 'static',
            value: '#ffffff',
        },
        enableTextPadding: {
            source: 'static',
            value: false,
        },
        textContainerPadding: {
            source: 'static',
            value: '2rem',
        },
        textContainerMaxWidth: {
            source: 'static',
            value: '',
        },
        imageFit: {
            source: 'static',
            value: 'cover',
        },
        enableCustomHeight: {
            source: 'static',
            value: false,
        },
        mobileHeight: {
            source: 'static',
            value: '',
        },
        tabletHeight: {
            source: 'static',
            value: '',
        },
        desktopHeight: {
            source: 'static',
            value: '',
        },
    },
});
