import template from './sw-cms-el-mini.html.twig';
import './sw-cms-el-mini.scss';

Shopware.Component.register('sw-cms-el-mini', {
    template,

    mixins: [
        'cms-element',
    ],

    computed: {
        miniTitle() {
            return `${this.element.config.miniTitle.value}`;
        },
        miniTitleSize() {
            return `${this.element.config.miniTitleSize.value}`;
        },
        miniDescription() {
            return `${this.element.config.miniDescription.value}`;
        },
        miniDescriptionSize() {
            return `${this.element.config.miniDescriptionSize.value}`;
        },
        miniTextColor() {
            let miniTextColor = this.element.config.miniTextColor.value;

            return {
                color: miniTextColor,
            };
        },
        miniBackgroundColor() {
            let miniBackgroundColor = this.element.config.miniBackgroundColor.value;

            return {
                'background-color': miniBackgroundColor,
            };
        },
        miniButtonText() {
            return `${this.element.config.miniButtonText.value}`;
        },
        miniButtonUrl() {
            return `${this.element.config.miniButtonUrl.value}`;
        },
        miniButtonColor() {
            let miniButtonColor = this.element.config.miniButtonColor.value;

            return {
                color: miniButtonColor,
            };
        },
        miniButtonBackgroundColor() {
            let miniButtonBackgroundColor = this.element.config.miniButtonBackgroundColor.value;

            return {
                'background-color': miniButtonBackgroundColor,
            };
        },
        miniButtonStyles() {
            return {
                ...this.miniButtonColor,
                ...this.miniButtonBackgroundColor,
            };
        },
        displayModeClass() {
            if (this.element.config.displayMode.value === 'standard') {
                return null;
            }

            return `is--${this.element.config.displayMode.value}`;
        },

        styles() {
            return {
                'min-height':
                    this.element.config.displayMode.value === 'cover' &&
                    this.element.config.minHeight.value &&
                    this.element.config.minHeight.value !== 0
                        ? this.element.config.minHeight.value
                        : '340px',
            };
        },
        imgStyles() {
            return {
                'align-self': this.element.config.verticalAlign.value || null,
            };
        },

        horizontalAlign() {
            return {
                'justify-content': this.element.config.horizontalAlign?.value || null,
            };
        },

        mediaUrl() {
            // const fallBackImageFileName = CMS.MEDIA.previewMountain.slice(CMS.MEDIA.previewMountain.lastIndexOf('/') + 1);
            const staticFallBackImage = this.assetFilter(
                '/administration/administration/static/img/cms/preview_mountain_small.jpg',
            );
            const elemData = this.element.data.media;

            const mediaSource = this.element.config.media.source;

            if (mediaSource === 'mapped') {
                const demoMedia = this.getDemoValue(this.element.config.media.value);

                if (demoMedia && demoMedia.url) {
                    return demoMedia.url;
                }
            }

            if (elemData && elemData.id) {
                return this.element.data.media.url;
            }

            if (elemData && elemData.url) {
                return this.assetFilter(elemData.url);
            }

            return staticFallBackImage;
        },

        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },

        mediaConfigValue() {
            return this.element?.config?.sliderItems?.value;
        },
    },

    watch: {
        cmsPageState: {
            deep: true,
            handler() {
                this.$forceUpdate();
            },
        },

        mediaConfigValue(value) {
            const mediaId = this.element?.data?.media?.id;
            const isSourceStatic = this.element?.config?.media?.source === 'static';

            if (isSourceStatic && mediaId && value !== mediaId) {
                this.element.config.media.value = mediaId;
            }
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mini');
            this.initElementData('mini');
        },
    },
});
