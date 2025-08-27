import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'grid-7-5',
    label: 'sas-cms-grid.blocks.grid.7-5.label',
    category: 'comaxx-grid',
    component: 'sw-cms-block-grid-7-5',
    previewComponent: 'sw-cms-preview-grid-7-5',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed',
    },
    slots: {
        'col-1': 'text',
        'col-2': 'text',
    },
});
