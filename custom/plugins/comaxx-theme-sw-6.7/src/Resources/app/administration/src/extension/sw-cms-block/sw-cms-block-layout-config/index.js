import template from './sw-cms-block-layout-config.html.twig';

Shopware.Component.override('sw-cms-block-layout-config', {
    template,

    inject: {
        cmsPageState: {
            default: null,
        },
    },

    props: {
        block: {
            type: Object,
            required: true,
        },
    },

    watch: {
        block: {
            immediate: true,
            handler(newBlock) {
                if (!newBlock) return;

                if (!newBlock.customFields) {
                    newBlock.customFields = {};
                }

                if (newBlock.customFields.comaxx_sidebar_custom_text === undefined) {
                    newBlock.customFields.comaxx_sidebar_custom_text = '';
                }
            },
        },
    },

    computed: {
        myExtraValue: {
            get() {
                return this.block?.customFields?.comaxx_sidebar_custom_text || '';
            },
            set(value) {
                if (!this.block) return;

                if (!this.block.customFields) {
                    this.block.customFields = {};
                }

                this.block.customFields.comaxx_sidebar_custom_text = value;

                // Only update block if cmsPageState is available
                if (this.cmsPageState?.currentPage) {
                    const page = this.cmsPageState.currentPage;
                    const section = page.sections.find((s) => s.blocks.find((b) => b.id === this.block.id));
                    if (!section) return;

                    const blockIndex = section.blocks.findIndex((b) => b.id === this.block.id);
                    if (blockIndex !== -1) {
                        section.blocks[blockIndex] = { ...this.block };
                    }
                }

                this.$emit('block-update', this.block);
            },
        },
    },

    created() {
        console.log('Custom override loaded for sw-cms-block-layout-config');
    },
});
