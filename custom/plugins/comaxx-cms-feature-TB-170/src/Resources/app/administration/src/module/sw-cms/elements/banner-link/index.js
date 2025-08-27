import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'banner-link',
    label: 'sw-cms.elements.banner-link.label',
    component: 'sw-cms-el-banner-link',
    configComponent: 'sw-cms-el-config-banner-link',
    previewComponent: 'sw-cms-el-preview-banner-link',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            entity: {
                name: 'media',
            },
        },
        generalTitle: {
            source: 'static',
            value: 'Title',
        },
        generalTitleColor: {
            source: 'static',
            value: '#000',
        },
        titleHeadingType: {
            source: 'static',
            value: null,
        },
        generalDescription: {
            source: 'static',
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        generalBackgroundColor: {
            source: 'static',
            value: '#ececec',
        },
        bannerLinkButtonText: {
            source: 'static',
            value: 'Button text',
        },
        bannerLinkButtonUrl: {
            source: 'static',
            value: '/',
        },
        buttonType: {
            source: 'static',
            value: 'primary',
        },
        buttonBorderColor: {
            source: 'static',
            value: '#000',
        },
        buttonBackgroundColor: {
            source: 'static',
            value: '#000',
        },
        buttonContentColor: {
            source: 'static',
            value: '#FFF',
        },
        actionLabel: {
            source: 'static',
            value: null,
        },
        labelType: {
            source: 'static',
            value: 'alert',
        },
        labelFontWeight: {
            source: 'static',
            value: '300',
        },
        labelPosition: {
            source: 'static',
            value: 'bottom-left',
        },
        labelContent: {
            source: 'static',
            value: 'OP = OP',
        },
        buttonPosition: {
            source: 'static',
            value: 'right',
        },
        hoverBackgroundColor: {
            source: 'static',
            value: '#FFF',
        },
        hoverBorderColor: {
            source: 'static',
            value: '#FFF',
        },
        hoverColor: {
            source: 'static',
            value: '#FFF',
        },
        minHeightSm: {
            source: 'static',
            value: '',
        },
        minHeightMd: {
            source: 'static',
            value: '',
        },
        minHeightLg: {
            source: 'static',
            value: '',
        },
        bannerImageFit: {
            source: 'static',
            value: 'cover',
        },
        imagePosition: {
            source: 'static',
            value: 'center',
        },
        imagePositionVertical: {
            source: 'static',
            value: 'center',
        },
        elementPadding: {
            source: 'static',
            value: '16px',
        },
    },
});
