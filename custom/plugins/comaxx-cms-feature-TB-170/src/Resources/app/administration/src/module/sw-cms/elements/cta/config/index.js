import template from './sw-cms-el-config-cta.html.twig';

Shopware.Component.register('sw-cms-el-config-cta', {
    template,

    mixins: ['cms-element'],

    inject: ['repositoryFactory'],

    data() {
        return {
            mediaModalIsOpen: false,
            activeTab: 'general',
            titleOptions: [
                { value: 'h1', label: 'H1' },
                { value: 'h2', label: 'H2' },
                { value: 'h3', label: 'H3' },
                { value: 'h4', label: 'H4' },
                { value: 'h5', label: 'H5' },
                { value: 'h6', label: 'H6' },
                { value: 'span', label: 'Span' },
            ],
            buttonOptions: [
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
                { value: 'tertiary', label: 'Tertiary' },
            ],
        };
    },

    computed: {
        isCtaNotClickable() {
            return !this.element.config.ctaClickable?.value;
        },

        ctaNoIcon() {
            return !this.element.config.ctaIconShow?.value;
        },

        ...[
            'ctaTitle',
            'ctaTitleType',
            'ctaTitleColor',
            'ctaDescription',
            'ctaBackgroundColor',
            'ctaClickable',
            'ctaIconShow',
            'ctaButtonText',
            'ctaButtonUrl',
            'ctaIconBorderColor',
            'ctaIconColor',
            'ctaIconBackgroundColor',
            'buttonType',
        ].reduce((acc, key) => {
            acc[key] = {
                get() {
                    return this.element.config[key]?.value;
                },
                set(value) {
                    if (this.element.config[key]) {
                        this.element.config[key].value = value;
                        this.$emit('element-update', this.element);
                    }
                },
            };
            return acc;
        }, {}),

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        previewSource() {
            return this.element?.data?.media?.id ? this.element.data.media : this.element.config.media?.value;
        },
    },

    created() {
        this.createdComponent();

        ['ctaClickable', 'ctaIconShow'].forEach((key) => {
            if (!this.element.config[key]) {
                this.$set(this.element.config, key, {
                    source: 'static',
                    value: false,
                });
            }
        });
    },

    methods: {
        setActiveItem(tabName) {
            this.activeTab = tabName;
        },

        createdComponent() {
            this.initElementConfig('cta');
        },

        onChange(key, value) {
            if (this.element.config[key]) {
                this.element.config[key].value = value;
                this.$emit('element-update', this.element);
            }
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges([media]) {
            this.element.config.media.value = media;
            this.$emit('element-update', this.element);
        },

        onImageUpload({ targetId }) {
            this.mediaRepository.get(targetId, Shopware.Context.api).then((media) => {
                this.element.config.media.value = media;
                this.$emit('element-update', this.element);
            });
        },

        onImageRemove() {
            this.element.config.media.value = null;
            this.$emit('element-update', this.element);
        },

        onCtaClickableChange(value) {
            this.onChange('ctaClickable', value);
        },

        onctaIconShow(value) {
            this.onChange('ctaIconShow', value);
        },

        onChangeTitleColor(value) {
            this.onChange('ctaTitleColor', value);
        },

        onChangeIconBorderColor(value) {
            this.onChange('ctaIconBorderColor', value);
        },

        onChangeIconColor(value) {
            this.onChange('ctaIconColor', value);
        },

        onChangeIconBackgroundColor(value) {
            this.onChange('ctaIconBackgroundColor', value);
        },

        onChangeButtonType(value) {
            this.onChange('buttonType', value);
        },
    },
});
