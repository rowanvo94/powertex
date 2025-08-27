import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'category',
    label: 'sw-cms.elements.category.label',
    component: 'sw-cms-el-category',
    configComponent: 'sw-cms-el-config-category',
    previewComponent: 'sw-cms-el-preview-category',
    defaultConfig: {
        categoryBackgroundColor: {
            source: 'static',
            value: '#cecece',
        },
        category: {
            source: 'static',
            value: null,
        },
        categoryTitleStyle: {
            source: 'static',
            value: 'h4',
        },
        categoryTitleColor: {
            source: 'static',
            value: '#000',
        },
        categoryTitlePosition: {
            source: 'static',
            value: 'under',
        },
        categoryTitleHorizontal: {
            source: 'static',
            value: 'flex-start',
        },
        categoryTitleVertical: {
            source: 'static',
            value: 'flex-end',
        },
        categoryImageInnerPadding: {
            source: 'static',
            value: '16px',
        },
        categoryShape: {
            source: 'static',
            value: 'circle',
        },
        categoryImageFit: {
            source: 'static',
            value: 'contain',
        },
        categoryImagePadding: {
            source: 'static',
            value: '0px',
        },
    },
});
