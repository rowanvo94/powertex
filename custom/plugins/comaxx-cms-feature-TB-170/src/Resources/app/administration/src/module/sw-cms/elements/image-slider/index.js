import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'comaxx-image-slider',
    label: 'sw-cms.elements.comaxx-image-slider.label',
    component: 'sw-cms-el-comaxx-image-slider',
    configComponent: 'sw-cms-el-config-comaxx-image-slider',
    previewComponent: 'sw-cms-el-preview-comaxx-image-slider',
    defaultConfig: {
        sliderItems: {
            source: 'static',
            value: [],
            required: true,
            entity: {
                name: 'media',
            },
        },
        navigationArrows: {
            source: 'static',
            value: 'outside',
        },
        navigationDots: {
            source: 'static',
            value: 'none',
        },
        displayMode: {
            source: 'static',
            value: 'standard',
        },
        minHeight: {
            source: 'static',
            value: '300px',
        },
        verticalAlign: {
            source: 'static',
            value: null,
        },
        itemsSm: {
            value: 2,
            source: 'static',
        },
        itemsMd: {
            value: 4,
            source: 'static',
        },
        itemsLg: {
            value: 8,
            source: 'static',
        },
        categorySliderLazy: {
            source: 'static',
            value: false,
        },
        categorySliderLoop: {
            source: 'static',
            value: false,
        },
        categorySliderDrag: {
            source: 'static',
            value: false,
        },
        gutter: {
            source: 'static',
            value: 32,
        },
        speed: {
            value: 300,
            source: 'static',
        },
        autoSlide: {
            value: false,
            source: 'static',
        },
        autoplayTimeout: {
            value: 5000,
            source: 'static',
        },
        isDecorative: {
            source: 'static',
            value: false,
        },
    },
    enrich: function enrich(slot, data) {
        if (Object.keys(data).length < 1) {
            return;
        }

        let entityCount = 0;
        Object.keys(slot.config).forEach((configKey) => {
            const config = slot.config[configKey];

            // If it has an entity, handle media as you do
            if (config.entity) {
                const entityKey = `entity-${config.entity.name}-${entityCount}`;
                entityCount += 1;

                if (!data[entityKey]) {
                    return;
                }

                // Prepare slot.data property as array for media items
                slot.data[configKey] = [];

                if (!Array.isArray(config.value)) {
                    return;
                }

                config.value.forEach((sliderItem) => {
                    const item = {
                        newTab: sliderItem.newTab,
                        url: sliderItem.url,
                        media: data[entityKey].get(sliderItem.mediaId) || null,
                    };

                    slot.data[configKey].push(item);
                });
            } else {
                // For non-entity config, just copy the value as-is into slot.data
                slot.data[configKey] = config.value;
            }
        });
    },
});
