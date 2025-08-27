import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'faq',
    label: 'sw-cms.elements.faq.label',
    component: 'sw-cms-el-faq',
    configComponent: 'sw-cms-el-config-faq',
    previewComponent: 'sw-cms-el-preview-faq',
    defaultConfig: {
        categoryTitle: {
            source: 'static',
            value: 'FAQ category titel',
        },
        titleType: {
            source: 'static',
            value: 'h2',
        },
        faqItems: {
            source: 'static',
            value: [
                {
                    id: Date.now() + Math.random(),
                    question: '',
                    answer: '',
                    questionTitleType: 'h3',
                },
            ],
        },
    },
});
