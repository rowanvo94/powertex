Shopware.Module.register('comaxx-menu', {
    type: 'core',
    name:  'Comaxx Settings Page',
    title: 'Comaxx Settings',
    description: 'The page for Comaxx Settings',
    color: '#ff5000',
    position: 100,

    routes: {
        settings: {
            component: 'comaxx-menu-settings',
            path: 'settings'
        }
    },

    navigation: [{
        label: 'Comaxx',
        color: '#ff5000',
        path: 'comaxx.menu.settings',
        icon: 'regular-sparkles',
        position: 1000
    }],
});