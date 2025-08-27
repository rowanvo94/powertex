import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'faq-nested',
    label: 'sw-cms.elements.faq-nested.label',
    component: 'sw-cms-el-faq-nested',
    configComponent: 'sw-cms-el-config-faq-nested',
    previewComponent: 'sw-cms-el-preview-faq-nested',
    defaultConfig: {
        categories: {
            source: 'static',
            value: [
                {
                    name: '',
                    questions: [
                        {
                            question: '',
                            answer: '',
                        },
                    ],
                },
            ],
        },
    },
});
