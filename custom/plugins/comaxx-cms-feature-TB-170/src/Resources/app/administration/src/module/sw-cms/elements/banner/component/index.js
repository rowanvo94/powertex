import template from './sw-cms-el-banner.html.twig';
import './sw-cms-el-banner.scss';

Shopware.Component.register('sw-cms-el-banner', {
    template,

    mixins: ['cms-element'],

    computed: {
        bannerContent() {
            return `${this.element.config.bannerContent.value}`;
        },
        bannerBackgroundColor() {
            let bannerBackgroundColor =
                this.element.config.bannerBackgroundColor.value;
            return {
                'background-color': bannerBackgroundColor,
            };
        },
        textAlignment() {
            return {
                'align-items':
                    this.element.config.textAlignment.value || 'center',
            };
        },
        textContainerBackground() {
            return {
                'background-color':
                    this.element.config.textContainerBackground.value ||
                    'transparent',
            };
        },
        enableTextPadding() {
            return this.element.config.enableTextPadding.value ? '2rem' : '0';
        },
        textContainerPadding() {
            return {
                padding: this.element.config.enableTextPadding.value
                    ? `${
                          this.element.config.textContainerPadding.value ||
                          '2rem'
                      }`
                    : '0',
            };
        },
        textContainerMaxWidth() {
            return {
                'max-width': this.element.config.textContainerMaxWidth.value
                    ? `${this.element.config.textContainerMaxWidth.value}px`
                    : 'none',
            };
        },
        imageFit() {
            return {
                'object-fit': this.element.config.imageFit.value || 'cover',
            };
        },
        enableCustomHeight() {
            return this.element.config.enableCustomHeight.value;
        },
        customHeightStyles() {
            return this.enableCustomHeight
                ? {
                      height: this.element.config.desktopHeight.value
                          ? `${this.element.config.desktopHeight.value}px`
                          : 'auto',
                  }
                : {};
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
                'justify-content':
                    this.element.config.horizontalAlign?.value || null,
            };
        },
        mediaUrl() {
            const staticFallBackImage = this.assetFilter(
                'administration/static/img/cms/preview_mountain_large.jpg'
            );
            const elemData = this.element.data.media;
            const mediaSource = this.element.config.media.source;
            if (mediaSource === 'mapped') {
                const demoMedia = this.getDemoValue(
                    this.element.config.media.value
                );
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
            const isSourceStatic =
                this.element?.config?.media?.source === 'static';
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
            this.initElementConfig('banner');
            this.initElementData('banner');
        },
    },
});
