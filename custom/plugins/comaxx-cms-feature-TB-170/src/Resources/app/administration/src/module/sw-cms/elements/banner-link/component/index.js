import template from './sw-cms-el-banner-link.html.twig';
import './sw-cms-el-banner-link.scss';

Shopware.Component.register('sw-cms-el-banner-link', {
    template,

    mixins: ['cms-element'],

    computed: {
        generalTitle() {
            return `${this.element.config.generalTitle.value}`;
        },
        titleHeadingType() {
            return `${this.element.config.titleHeadingType.value}`;
        },
        minHeightSm() {
            return `${this.element.config.minHeightSm.value}`;
        },
        minHeightMd() {
            return `${this.element.config.minHeightMd.value}`;
        },
        minHeightLg() {
            return `${this.element.config.minHeightLg.value}`;
        },
        elementPadding() {
            return `${this.element.config.elementPadding.value}`;
        },
        generalTitleColor() {
            let generalTitleColor = this.element.config.generalTitleColor.value;

            return {
                color: generalTitleColor,
            };
        },
        generalDescription() {
            return `${this.element.config.generalDescription.value}`;
        },
        generalBackgroundColor() {
            let generalBackgroundColor = this.element.config.generalBackgroundColor.value;

            return {
                'background-color': generalBackgroundColor,
            };
        },
        shouldShowButtonDiv() {
            const hiddenTypes = ['clickable'];
            return !hiddenTypes.includes(this.element.config.buttonType.value);
        },
        bannerLinkButtonText() {
            return `${this.element.config.bannerLinkButtonText.value}`;
        },
        bannerLinkButtonUrl() {
            return `${this.element.config.bannerLinkButtonUrl.value}`;
        },
        buttonTypeClass() {
            return `btn btn-${this.element.config.buttonType.value}`;
        },
        buttonType() {
            return `${this.element.config.buttonType.value}`;
        },
        labelContent() {
            return `${this.element.config.labelContent.value}`;
        },
        labelPosition() {
            return `label-position-${this.element.config.labelPosition.value}`;
        },
        buttonPosition() {
            return `button-position-${this.element.config.buttonPosition.value}`;
        },
        actionLabel() {
            return this.element.config.actionLabel.value;
        },
        labelTypeClass() {
            return `label-${this.element.config.labelType.value}`;
        },
        typeIsArrow() {
            return this.element.config.buttonType.value === 'arrow';
        },
        typeIsPrimary() {
            return this.element.config.buttonType.value === 'primary';
        },
        typeIsSecondary() {
            return this.element.config.buttonType.value === 'secondary';
        },
        typeIsCustom() {
            return this.element.config.buttonType.value === 'custom';
        },
        buttonBorderColor() {
            return this.typeIsArrow || this.typeIsCustom
                ? {
                      'border-color': this.element.config.buttonBorderColor.value || '#000',
                  }
                : {};
        },

        buttonBackgroundColor() {
            return this.typeIsArrow || this.typeIsCustom
                ? {
                      'background-color': this.element.config.buttonBackgroundColor.value || '#fff',
                  }
                : {};
        },

        buttonContentColor() {
            return this.typeIsArrow || this.typeIsCustom
                ? {
                      color: this.element.config.buttonContentColor.value || '#000',
                  }
                : {};
        },

        hoverColor() {
            return this.typeIsArrow || this.typeIsCustom
                ? {
                      color: this.element.config.hoverColor.value || '#f00',
                  }
                : {};
        },

        hoverBackgroundColor() {
            return this.typeIsArrow || this.typeIsCustom
                ? {
                      'background-color': this.element.config.hoverBackgroundColor.value || '#f0f0f0',
                  }
                : {};
        },

        hoverBorderColor() {
            return this.typeIsArrow || this.typeIsCustom
                ? {
                      'border-color': this.element.config.hoverBorderColor.value || '#ccc',
                  }
                : {};
        },
        buttonStyles() {
            return {
                ...this.buttonBorderColor,
                ...this.buttonBackgroundColor,
                ...this.buttonContentColor,
                ':hover': {
                    ...this.hoverColor,
                    ...this.hoverBackgroundColor,
                    ...this.hoverBorderColor,
                },
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
                'object-fit': this.element.config.bannerImageFit.value || 'cover',
                'object-position': this.element.config.imagePosition.value || 'center',
            };
        },
        horizontalAlign() {
            return {
                'justify-content': this.element.config.horizontalAlign?.value || null,
            };
        },
        bannerImageFit() {
            return this.element.config.bannerImageFit.value || 'cover'; // Default to 'cover' if not set
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
            this.initElementConfig('banner-link');
            this.initElementData('banner-link');
        },

        isFallbackImage() {
            const fallback = this.assetFilter('/administration/administration/static/img/cms/preview_mountain_small.jpg');
            return this.mediaUrl === fallback;
        },
    },
});
