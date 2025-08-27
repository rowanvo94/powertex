import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'mini',
    label: 'sw-cms.elements.mini.label',
    component: 'sw-cms-el-mini',
    configComponent: 'sw-cms-el-config-mini',
    previewComponent: 'sw-cms-el-preview-mini',
    defaultConfig: {
        media: {
            source: 'static',
            value: null,
            entity: {
                name: 'media'
            }
        },
        displayMode: {
            source: 'static',
            value: 'cover'
        },
        miniTitle: {
            source: 'static',
            value: 'mini Title'
        },
        miniTitleSize: {
            source: 'static',
            value: '1rem'
        },
        miniDescription: {
            source: 'static',
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        miniDescriptionSize: {
            source: 'static',
            value: '.9rem'
        },
        miniTextColor: {
            source: 'static',
            value: '#000'
        },
        miniBackgroundColor: {
            source: 'static',
            value: '#ececec'
        },
        miniButtonText: {
            source: 'static',
            value: 'Button text'
        },
        miniButtonUrl: {
            source: 'static',
            value: 'Button url'
        },
        miniButtonBackgroundColor: {
            source: 'static',
            value: '#000'
        },
        miniButtonColor: {
            source: 'static',
            value: '#FFF'
        },
    },
});