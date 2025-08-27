import template from './sw-cms-el-cta.html.twig';
import './sw-cms-el-cta.scss';

Shopware.Component.register('sw-cms-el-cta', {
    template,

    mixins: ['cms-element'],

    computed: {
        ctaTitle() {
            return `${this.element.config.ctaTitle.value}`;
        },
        ctaTitleTag() {
            return this.element.config.ctaTitleType?.value || 'h2';
        },
        ctaTitleColor() {
            let ctaTitleColor = this.element.config.ctaTitleColor.value;

            return {
                color: ctaTitleColor,
            };
        },
        ctaDescription() {
            return `${this.element.config.ctaDescription.value}`;
        },
        ctaBackgroundColor() {
            let ctaBackgroundColor = this.element.config.ctaBackgroundColor.value;

            return {
                'background-color': ctaBackgroundColor,
            };
        },
        ctaButtonText() {
            return `${this.element.config.ctaButtonText.value}`;
        },
        ctaButtonUrl() {
            return `${this.element.config.ctaButtonUrl.value}`;
        },
        ctaClickable() {
            return this.element.config.ctaClickable.value;
        },
        buttonTypeClass() {
            return `btn btn-${this.element.config.buttonType.value}`;
        },
        ctaIconBorderColor() {
            let ctaIconBorderColor = this.element.config.ctaIconBorderColor.value;

            return {
                'border-color': ctaIconBorderColor,
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
            this.initElementConfig('cta');
            this.initElementData('cta');
        },
    },
});
