import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'category-slider',
    label: 'sw-cms.elements.category-slider.label',
    component: 'sw-cms-el-category-slider',
    configComponent: 'sw-cms-el-config-category-slider',
    previewComponent: 'sw-cms-el-preview-category-slider',
    defaultConfig: {
        categoryContent: {
            source: 'static',
            value: 'Content placeholder',
        },
        categories: {
            source: 'static',
            value: null,
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
            value: '16px',
        },
        categoryBackgroundColor: {
            source: 'static',
            value: '#cecece',
        },
        categorySliderItemsSm: {
            source: 'static',
            value: '2',
        },
        categorySliderItemsMd: {
            source: 'static',
            value: '4',
        },
        categorySliderItemsLg: {
            source: 'static',
            value: '6',
        },
        categorySliderNav: {
            source: 'static',
            value: null,
        },
        categorySliderControls: {
            source: 'static',
            value: true,
        },
        categorySliderControlPosition: {
            source: 'static',
            value: 'centered',
        },
        categorySliderControlSpacing: {
            source: 'static',
            value: '',
        },
        categorySliderAuto: {
            source: 'static',
            value: null,
        },
        categorySliderSpeed: {
            source: 'static',
            value: '400',
        },
        categorySliderGutter: {
            source: 'static',
            value: '16',
        },
        categorySliderLazy: {
            source: 'static',
            value: true,
        },
        categorySliderLoop: {
            source: 'static',
            value: true,
        },
        categorySliderDrag: {
            source: 'static',
            value: true,
        },
        categorySliderMobileNav: {
            source: 'static',
            value: true,
        },
        categorySliderMobileControls: {
            source: 'static',
            value: true,
        },
        categorySliderSlideBy: {
            source: 'static',
            value: '1',
        },
    },
});
