import template from './sw-cms-el-config-banner-link.html.twig';

Shopware.Component.register('sw-cms-el-config-banner-link', {
    template,

    mixins: ['cms-element'],

    inject: ['repositoryFactory'],

    data() {
        return {
            mediaModalIsOpen: false,
            actionLabel: false,
            activeTab: 'general',
            initialFolderId: null,
            headingTypeOptions: [
                { value: 'h1', label: 'H1' },
                { value: 'h2', label: 'H2' },
                { value: 'h3', label: 'H3' },
                { value: 'h4', label: 'H4' },
                { value: 'h5', label: 'H5' },
                { value: 'h6', label: 'H6' },
                { value: 'span', label: 'Span' },
            ],
            imageFitOptions: [
                { value: 'contain', label: 'Contain' },
                { value: 'cover', label: 'Cover' },
            ],
            imagePositionOptions: [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
            ],
            imagePositionVerticalOptions: [
                { value: 'top', label: 'Top' },
                { value: 'center', label: 'Center' },
                { value: 'bottom', label: 'Bottom' },
            ],
            buttonTypeOptions: [
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
                { value: 'custom', label: 'Custom' },
                { value: 'clickable', label: 'Element clickable' },
                { value: 'arrow', label: 'Arrow' },
            ],
            buttonPositionOptions: [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' },
            ],
            labelFontWeightOptions: [
                { value: '300', label: '300' },
                { value: '400', label: '400' },
                { value: '600', label: '600' },
            ],
            labelTypeOptions: [
                { value: 'danger', label: 'Danger' },
                { value: 'success', label: 'Success' },
                { value: 'info', label: 'Info' },
                { value: 'warning', label: 'Warning' },
            ],
            labelPositionOptions: [
                { value: 'top-right', label: 'Above the text on the right side' },
                { value: 'bottom-right', label: 'Under the text on the right side' },
                { value: 'bottom-left', label: 'Under the text on the left side' },
            ],
        };
    },

    computed: {
        showActionLabel() {
            return !!this.element.config.actionLabel?.value;
        },

        minHeightSm: {
            get() {
                return this.element.config.minHeightSm.value;
            },

            set(value) {
                this.element.config.minHeightSm.value = value;
            },
        },

        minHeightMd: {
            get() {
                return this.element.config.minHeightMd.value;
            },

            set(value) {
                this.element.config.minHeightMd.value = value;
            },
        },

        minHeightLg: {
            get() {
                return this.element.config.minHeightLg.value;
            },

            set(value) {
                this.element.config.minHeightLg.value = value;
            },
        },

        elementPadding: {
            get() {
                return this.element.config.elementPadding.value;
            },
            set(value) {
                this.element.config.elementPadding.value = value;
            },
        },

        imagePosition: {
            get() {
                return this.element.config.imagePosition.value || 'center';
            },

            set(value) {
                this.element.config.imagePosition.value = value;
                this.$emit('element-update', this.element);
            },
        },

        imagePositionVertical: {
            get() {
                return this.element.config.imagePositionVertical.value || 'center';
            },

            set(value) {
                this.element.config.imagePositionVertical.value = value;
                this.$emit('element-update', this.element);
            },
        },

        generalTitle: {
            get() {
                return this.element.config.generalTitle.value;
            },

            set(value) {
                this.element.config.generalTitle.value = value;
            },
        },

        generalTitleColor: {
            get() {
                return this.element.config.generalTitleColor.value;
            },

            set(value) {
                this.element.config.generalTitleColor.value = value;
            },
        },

        titleHeadingType: {
            get() {
                return this.element.config.titleHeadingType.value || 'h2';
            },
            set(value) {
                this.element.config.titleHeadingType.value = value;
                this.$emit('element-update', this.element);
            },
        },

        generalDescription: {
            get() {
                return this.element.config.generalDescription.value;
            },

            set(value) {
                this.element.config.generalDescription.value = value;
            },
        },

        generalBackgroundColor: {
            get() {
                return this.element.config.generalBackgroundColor.value;
            },

            set(value) {
                this.element.config.generalBackgroundColor.value = value;
            },
        },

        bannerLinkButtonText: {
            get() {
                return this.element.config.bannerLinkButtonText.value;
            },

            set(value) {
                this.element.config.bannerLinkButtonText.value = value;
            },
        },

        bannerLinkButtonUrl: {
            get() {
                return this.element.config.bannerLinkButtonUrl.value;
            },

            set(value) {
                this.element.config.bannerLinkButtonUrl.value = value;
            },
        },

        buttonBorderColor: {
            get() {
                return this.element.config.buttonBorderColor.value;
            },

            set(value) {
                this.element.config.buttonBorderColor.value = value;
            },
        },

        buttonContentColor: {
            get() {
                return this.element.config.buttonContentColor.value;
            },

            set(value) {
                this.element.config.buttonContentColor.value = value;
            },
        },

        buttonBackgroundColor: {
            get() {
                return this.element.config.buttonBackgroundColor.value;
            },

            set(value) {
                this.element.config.buttonBackgroundColor.value = value;
            },
        },

        buttonType: {
            get() {
                return this.element.config.buttonType.value || 'primary';
            },

            set(value) {
                this.element.config.buttonType.value = value;
                this.$emit('element-update', this.element);
            },
        },

        typeIsArrow() {
            return this.element.config.buttonType?.value === 'arrow';
        },

        typeIsPrimary() {
            return this.element.config.buttonType?.value === 'primary';
        },

        typeIsSecondary() {
            return this.element.config.buttonType?.value === 'secondary';
        },

        typeIsCustom() {
            return this.element.config.buttonType?.value === 'custom';
        },

        hoverColor: {
            get() {
                return this.element.config.hoverColor.value;
            },

            set(value) {
                this.element.config.hoverColor.value = value;
            },
        },

        hoverBorderColor: {
            get() {
                return this.element.config.hoverBorderColor.value;
            },

            set(value) {
                this.element.config.hoverBorderColor.value = value;
            },
        },

        hoverBackgroundColor: {
            get() {
                return this.element.config.hoverBackgroundColor.value;
            },

            set(value) {
                this.element.config.hoverBackgroundColor.value = value;
            },
        },

        buttonPosition: {
            get() {
                return this.element.config.buttonPosition.value || 'left';
            },

            set(value) {
                this.element.config.buttonPosition.value = value;
                this.$emit('element-update', this.element);
            },
        },

        actionLabel: {
            get() {
                return this.element.config.actionLabel.value ?? false;
            },
            set(value) {
                this.element.config.actionLabel.value = value;
                this.$emit('element-update', this.element);
            },
        },

        labelType: {
            get() {
                return this.element.config.labelType.value || 'success';
            },

            set(value) {
                this.element.config.labelType.value = value;
                this.$emit('element-update', this.element);
            },
        },

        labelFontWeight: {
            get() {
                return this.element.config.labelFontWeight.value || '600';
            },

            set(value) {
                this.element.config.labelFontWeight.value = value;
                this.$emit('element-update', this.element);
            },
        },

        labelPosition: {
            get() {
                return this.element.config.labelPosition.value || 'top-right';
            },

            set(value) {
                this.element.config.labelPosition.value = value;
                this.$emit('element-update', this.element);
            },
        },

        labelContent: {
            get() {
                return this.element.config.labelContent.value;
            },

            set(value) {
                this.element.config.labelContent.value = value;
            },
        },

        bannerImageFit: {
            get() {
                return this.element.config.bannerImageFit.value || 'cover';
            },

            set(value) {
                this.element.config.bannerImageFit.value = value;
                this.$emit('element-update', this.element);
            },
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        previewSource() {
            if (this.element?.data?.media?.id) {
                return this.element.data.media;
            }

            return this.element.config.media.value;
        },
    },

    created() {
        this.createdComponent();

        if (!this.element.config.actionLabel) {
            this.$set(this.element.config, 'actionLabel', {
                source: 'static',
                value: false,
            });
        }
    },

    methods: {
        createdComponent() {
            this.initElementConfig('banner-link');

            if (!this.element.config.actionLabel) {
                this.element.config.actionLabel = {
                    source: 'static',
                    value: false,
                };
            }
        },

        setActiveItem(tabName) {
            this.activeTab = tabName;
        },

        changeActionLabel(val) {
            if (!this.element.config.actionLabel) {
                this.$set(this.element.config, 'actionLabel', {
                    source: 'static',
                    value: val,
                });
            } else {
                this.element.config.actionLabel.value = val;
            }

            this.$emit('element-update', this.element);
        },

        changeMinHeightSm(value) {
            this.element.config.minHeightSm.value = value;

            this.$emit('element-update', this.element);
        },

        changeMinHeightMd(value) {
            this.element.config.minHeightMd.value = value;

            this.$emit('element-update', this.element);
        },

        changeMinHeightLg(value) {
            this.element.config.minHeightLg.value = value;

            this.$emit('element-update', this.element);
        },

        changeElementPadding(value) {
            this.element.config.elementPadding.value = value;

            this.$emit('element-update', this.element);
        },

        changeBannerImageFit(value) {
            this.element.config.bannerImageFit.value = value;

            this.$emit('element-update', this.element);
        },

        changeImagePosition(value) {
            this.element.config.imagePosition.value = value;

            this.$emit('element-update', this.element);
        },

        changeImagePositionVertical(value) {
            this.element.config.imagePositionVertical.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonUrl(value) {
            this.element.config.bannerLinkButtonUrl.value = value;

            this.$emit('element-update', this.element);
        },

        changeTitle(value) {
            this.element.config.generalTitle.value = value;

            this.$emit('element-update', this.element);
        },

        changeTitleHeadingType(value) {
            this.element.config.titleHeadingType.value = value;

            this.$emit('element-update', this.element);
        },

        onChangeTitleColor(value) {
            this.element.config.generalTitleColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeDescription(value) {
            this.element.config.generalDescription.value = value;

            this.$emit('element-update', this.element);
        },

        changeBackgroundColor(value) {
            this.element.config.generalBackgroundColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonText(value) {
            this.element.config.bannerLinkButtonText.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonType(value) {
            this.element.config.buttonType.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonPosition(value) {
            this.element.config.buttonPosition.value = value;

            this.$emit('element-update', this.element);
        },

        changeLabelType(value) {
            this.$emit('element-update', this.element);
        },

        changeLabelFontWeight(value) {
            this.element.config.labelFontWeight.value = value;

            this.$emit('element-update', this.element);
        },

        changeLabelPosition(value) {
            this.element.config.labelPosition.value = value;

            this.$emit('element-update', this.element);
        },

        onChangeButtonBorderColor(value) {
            this.element.config.buttonBorderColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonBackgroundColor(value) {
            this.element.config.buttonBackgroundColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonContentColor(value) {
            this.element.config.buttonContentColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeActionLabel(value) {
            this.element.config.actionLabel.value = value;

            this.$emit('element-update', this.element);
        },

        changeLabelContent(value) {
            this.element.config.labelContent.value = value;
            this.$emit('element-update', this.element);
        },

        changeHoverColor(value) {
            this.element.config.hoverColor.value = value;
            this.$emit('element-update', this.element);
        },

        changeHoverBorderColor(value) {
            this.element.config.hoverBorderColor.value = value;
            this.$emit('element-update', this.element);
        },

        changeHoverBackgroundColor(value) {
            this.element.config.hoverBackgroundColor.value = value;
            this.$emit('element-update', this.element);
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId, Shopware.Context.api);

            this.element.config.media.value = mediaEntity.id;

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.media.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.media.value = media.id;

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            this.$set(this.element.data, 'mediaId', media === null ? null : media.id);
            this.$set(this.element.data, 'media', media);
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },
    },
});
