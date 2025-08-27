import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'category-highlight',
    label: 'Category Highlight',
    component: 'sw-cms-el-category-highlight',
    configComponent: 'sw-cms-el-config-category-highlight',
    previewComponent: 'sw-cms-el-preview-category-highlight',
    defaultConfig: {
        categoryTitle: {
            source: 'static',
            value: 'Title placeholder',
        },
        categoryTitleSize: {
            source: 'static',
            value: '1.875rem',
        },
        categoryTitleColor: {
            source: 'static',
            value: '#000',
        },
        categoryMain: {
            source: 'static',
            value: null,
        },
        categoryLinkColor: {
            source: 'static',
            value: '#000',
        },
        categoryHighlight1: {
            source: 'static',
            value: null,
        },
        highlight1Color: {
            source: 'static',
            value: '#ff5000',
        },
        categoryHighlight2: {
            source: 'static',
            value: null,
        },
        highlight2Color: {
            source: 'static',
            value: '#ff5000',
        },
        categoryHighlight3: {
            source: 'static',
            value: null,
        },
        highlight3Color: {
            source: 'static',
            value: '#ff5000',
        },
    },
});
