import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'cta',
    label: 'sw-cms.elements.cta.label',
    component: 'sw-cms-el-cta',
    configComponent: 'sw-cms-el-config-cta',
    previewComponent: 'sw-cms-el-preview-cta',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            entity: {
                name: 'media',
            },
        },
        ctaTitle: {
            source: 'static',
            value: 'CTA Title',
        },
        ctaTitleType: {
            source: 'static',
            value: 'h2',
        },
        ctaTitleColor: {
            source: 'static',
            value: '#000',
        },
        ctaDescription: {
            source: 'static',
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        ctaBackgroundColor: {
            source: 'static',
            value: '#ececec',
        },
        ctaButtonText: {
            source: 'static',
            value: 'Button text',
        },
        ctaButtonUrl: {
            source: 'static',
            value: 'Button url',
        },
        buttonType: {
            source: 'static',
            value: 'primary',
        },
        ctaIconShow: {
            source: 'static',
            value: null,
        },
        ctaIconBorderColor: {
            source: 'static',
            value: '#000',
        },
        ctaIconBackgroundColor: {
            source: 'static',
            value: '#000',
        },
        ctaIconColor: {
            source: 'static',
            value: '#FFF',
        },
        ctaClickable: {
            source: 'static',
            value: false,
        },
    },
});
