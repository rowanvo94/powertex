import template from './sw-cms-block-layout-config.html.twig';

Shopware.Component.override('sw-cms-sidebar-layout-config', {
    template,

    created() {
        if (!this.section.customFields) {
            this.$set(this.section, 'customFields', {});
        }
        this.section.customFields.myExtraValue ??= '';
    },

    computed: {
        myExtraValue: {
            get() {
                return this.section.customFields?.myExtraValue || '';
            },
            set(value) {
                if (!this.section.customFields) {
                    this.$set(this.section, 'customFields', {});
                }
                this.$set(this.section.customFields, 'myExtraValue', value);
                this.$emit('section-update', this.section);
            },
        },
    },
});
