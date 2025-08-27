import template from './sw-cms-el-config-mini.html.twig';

Shopware.Component.register('sw-cms-el-config-mini', {
    template,

    mixins: [
        'cms-element',
    ],

    inject: [
        'repositoryFactory',
    ],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
            displayModeOptions: [
                { value: 'cover', label: 'Cover' },
                { value: 'contain', label: 'Contain' },
            ],
        };
    },

    computed: {
        miniTitle: {
            get() {
                return this.element.config.miniTitle.value;
            },

            set(value) {
                this.element.config.miniTitle.value = value;
            },
        },
        miniTitleSize: {
            get() {
                return this.element.config.miniTitleSize.value;
            },

            set(value) {
                this.element.config.miniTitleSize.value = value;
            },
        },
        miniDescription: {
            get() {
                return this.element.config.miniDescription.value;
            },

            set(value) {
                this.element.config.miniDescription.value = value;
            },
        },
        miniDescriptionSize: {
            get() {
                return this.element.config.miniDescriptionSize.value;
            },

            set(value) {
                this.element.config.miniDescriptionSize.value = value;
            },
        },
        miniTextColor: {
            get() {
                return this.element.config.miniTextColor.value;
            },

            set(value) {
                this.element.config.miniTextColor.value = value;
            },
        },

        miniBackgroundColor: {
            get() {
                return this.element.config.miniBackgroundColor.value;
            },

            set(value) {
                this.element.config.miniBackgroundColor.value = value;
            },
        },

        miniButtonText: {
            get() {
                return this.element.config.miniButtonText.value;
            },

            set(value) {
                this.element.config.miniButtonText.value = value;
            },
        },

        miniButtonUrl: {
            get() {
                return this.element.config.miniButtonUrl.value;
            },

            set(value) {
                this.element.config.miniButtonUrl.value = value;
            },
        },

        miniButtonColor: {
            get() {
                return this.element.config.miniButtonColor.value;
            },

            set(value) {
                this.element.config.miniButtonColor.value = value;
            },
        },

        miniButtonBackgroundColor: {
            get() {
                return this.element.config.miniButtonBackgroundColor.value;
            },

            set(value) {
                this.element.config.miniButtonBackgroundColor.value = value;
            },
        },

        displayMode: {
            get() {
                return this.element.config.displayMode?.value || 'cover';
            },

            set(value) {
                this.element.config.displayMode.value = value;
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
    },

    methods: {
        createdComponent() {
            this.initElementConfig('mini');
        },

        changeTitle(value) {
            this.element.config.miniTitle.value = value;

            this.$emit('element-update', this.element);
        },

        changeTitleSize(value) {
            this.element.config.miniTitleSize.value = value;

            this.$emit('element-update', this.element);
        },

        changeDescription(value) {
            this.element.config.miniDescription.value = value;

            this.$emit('element-update', this.element);
        },

        changeDescriptionSize(value) {
            this.element.config.miniDescriptionSize.value = value;

            this.$emit('element-update', this.element);
        },

        changeTextColor(value) {
            this.element.config.miniTextColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeBackgroundColor(value) {
            this.element.config.miniBackgroundColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonText(value) {
            this.element.config.miniButtonText.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonUrl(value) {
            this.element.config.miniButtonUrl.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonColor(value) {
            this.element.config.miniButtonColor.value = value;

            this.$emit('element-update', this.element);
        },

        changeButtonBackgroundColor(value) {
            this.element.config.miniButtonBackgroundColor.value = value;

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

        onChangeDisplayMode(value) {
            this.element.config.displayMode.value = value;

            this.$emit('element-update', this.element);
        },
    },
});
