import template from './comaxx-menu-settings.html.twig';

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Shopware.Component.register('comaxx-menu-settings', {
    template: template,

    inject: [
        'repositoryFactory',
    ],

    data() {
        return {
            customThemeId: 1,
        }
    },

    mounted () {
        this.themeRepository = this.repositoryFactory.create('theme');
        this.loadCustomThemeId();
    },

    methods: {
        openRoute(route) {
            this.$router.push(route);
        },

        loadCustomThemeId() {
            const criteria = new Criteria();
            criteria.addFilter(Criteria.equals('name', 'ComaxxTheme'));

            this.themeRepository.search(criteria, Shopware.Context.api).then((result) => {
                if (result.length > 0) {
                    this.customThemeId = result[0].id;
                }
            });
        }
    },
});
