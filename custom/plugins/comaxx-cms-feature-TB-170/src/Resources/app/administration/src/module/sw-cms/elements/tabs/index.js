import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'tabs',
    label: 'sw-cms.elements.tabs.label',
    component: 'sw-cms-el-tabs',
    configComponent: 'sw-cms-el-config-tabs',
    previewComponent: 'sw-cms-el-preview-tabs',
    defaultConfig: {
        tabTitle: {
            source: 'static',
            value: '',
        },
        titleType: {
            source: 'static',
            value: 'h2',
        },
        tabItems: {
            source: 'static',
            value: [
                {
                    id: Date.now() + Math.random(),
                    question: '',
                    answer: '',
                },
            ],
        },
    },
});
