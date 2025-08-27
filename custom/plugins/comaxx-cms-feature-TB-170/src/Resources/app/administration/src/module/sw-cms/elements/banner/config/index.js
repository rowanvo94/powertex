import template from './sw-cms-el-config-banner.html.twig';

Shopware.Component.register('sw-cms-el-config-banner', {
    template,

    mixins: ['cms-element'],

    inject: ['repositoryFactory'],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
            textAlignmentOptions: [
                { value: 'flex-start', label: 'Top' },
                { value: 'center', label: 'Center' },
                { value: 'flex-end', label: 'Bottom' },
            ],
            textAlignmentHorizontalOptions: [
                { value: 'flex-start', label: 'Top' },
                { value: 'center', label: 'Center (Horizontal)' },
                { value: 'flex-end', label: 'Bottom' },
            ],
            imageFitOptions: [
                { value: 'cover', label: 'Cover' },
                { value: 'contain', label: 'Contain' },
            ],
        };
    },

    computed: {
        bannerContent: {
            get() {
                return this.element.config.bannerContent.value;
            },
            set(value) {
                this.element.config.bannerContent.value = value;
            },
        },

        bannerBackgroundColor: {
            get() {
                return this.element.config.bannerBackgroundColor.value;
            },
            set(value) {
                this.element.config.bannerBackgroundColor.value = value;
            },
        },

        textAlignment: {
            get() {
                return this.element.config.textAlignment.value || 'center';
            },
            set(value) {
                this.element.config.textAlignment.value = value;
                this.$emit('element-update', this.element);
            },
        },

        textAlignmentHorizontal: {
            get() {
                return this.element.config.textAlignmentHorizontal.value || 'center';
            },
            set(value) {
                this.element.config.textAlignmentHorizontal.value = value;
                this.$emit('element-update', this.element);
            },
        },

        textContainerBackground: {
            get() {
                return this.element.config.textContainerBackground.value;
            },
            set(value) {
                this.element.config.textContainerBackground.value = value;
            },
        },

        enableTextPadding: {
            get() {
                return this.element.config.enableTextPadding.value;
            },
            set(value) {
                this.element.config.enableTextPadding.value = value;
                this.$emit('element-update', this.element);
            },
        },

        textContainerPadding: {
            get() {
                return this.element.config.textContainerPadding.value;
            },
            set(value) {
                this.element.config.textContainerPadding.value = value;
            },
        },

        textContainerMaxWidth: {
            get() {
                return this.element.config.textContainerMaxWidth.value;
            },
            set(value) {
                this.element.config.textContainerMaxWidth.value = value;
            },
        },

        imageFit: {
            get() {
                return this.element.config.imageFit.value || 'cover';
            },
            set(value) {
                this.element.config.imageFit.value = value;
                this.$emit('element-update', this.element);
            },
        },

        enableCustomHeight: {
            get() {
                return this.element.config.enableCustomHeight.value;
            },
            set(value) {
                this.element.config.enableCustomHeight.value = value;
                this.$emit('element-update', this.element);
            },
        },

        mobileHeight: {
            get() {
                return this.element.config.mobileHeight.value;
            },
            set(value) {
                this.element.config.mobileHeight.value = value;
            },
        },

        tabletHeight: {
            get() {
                return this.element.config.tabletHeight.value;
            },
            set(value) {
                this.element.config.tabletHeight.value = value;
            },
        },

        desktopHeight: {
            get() {
                return this.element.config.desktopHeight.value;
            },
            set(value) {
                this.element.config.desktopHeight.value = value;
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
    },

    methods: {
        createdComponent() {
            this.initElementConfig('banner');
        },

        changeContent(value) {
            this.element.config.bannerContent.value = value;
            this.$emit('element-update', this.element);
        },

        changeBackgroundColor(value) {
            this.element.config.bannerBackgroundColor.value = value;
            this.$emit('element-update', this.element);
        },

        changeTextAlignment(value) {
            this.element.config.textAlignment.value = value;
            this.$emit('element-update', this.element);
        },

        changeTextAlignmentHorizontal(value) {
            this.element.config.textAlignmentHorizontal.value = value;
            this.$emit('element-update', this.element);
        },

        changeTextContainerBackground(value) {
            this.element.config.textContainerBackground.value = value;
            this.$emit('element-update', this.element);
        },

        changeTextContainerPadding(value) {
            this.element.config.textContainerPadding.value = value;
            this.$emit('element-update', this.element);
        },

        changeTextContainerMaxWidth(value) {
            this.element.config.textContainerMaxWidth.value = value;
            this.$emit('element-update', this.element);
        },

        changeImageFit(value) {
            this.element.config.imageFit.value = value;
            this.$emit('element-update', this.element);
        },

        changeMobileHeight(value) {
            this.element.config.mobileHeight.value = value;
            this.$emit('element-update', this.element);
        },

        changeTabletHeight(value) {
            this.element.config.tabletHeight.value = value;
            this.$emit('element-update', this.element);
        },

        changeDesktopHeight(value) {
            this.element.config.desktopHeight.value = value;
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
