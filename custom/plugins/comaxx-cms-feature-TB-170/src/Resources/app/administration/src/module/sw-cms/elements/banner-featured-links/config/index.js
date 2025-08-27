import template from './sw-cms-el-config-banner-featured-links.html.twig';

Shopware.Component.register('sw-cms-el-config-banner-featured-links', {
    template,

    mixins: ['cms-element'],

    inject: ['repositoryFactory'],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
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
            this.initElementConfig('banner-featured-links');
        },

        changeContent(value) {
            this.element.config.bannerContent.value = value;

            this.$emit('element-update', this.element);
        },

        changeBackgroundColor(value) {
            this.element.config.bannerBackgroundColor.value = value;

            this.$emit('element-update', this.element);
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(
                targetId,
                Shopware.Context.api
            );

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
            this.$set(
                this.element.data,
                'mediaId',
                media === null ? null : media.id
            );
            this.$set(this.element.data, 'media', media);
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },
    },
});
