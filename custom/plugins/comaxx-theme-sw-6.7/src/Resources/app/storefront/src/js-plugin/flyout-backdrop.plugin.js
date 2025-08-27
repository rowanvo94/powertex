import Plugin from 'src/plugin-system/plugin.class';

export default class FlyoutBackdropPlugin extends Plugin {
    init() {
        this.navbar = document.querySelector('[data-navbar]');
        this.navItems = document.querySelectorAll('.navbar-nav > .nav-item');
        this._initBackdropBehavior();
    }

    _initBackdropBehavior() {
        // Attach event listeners to handle hover and click behaviors for backdrop
        this.navItems.forEach(navItem => {
            const navLink = navItem.querySelector('.nav-link');
            const dropdownMenu = navItem.querySelector('.dropdown-menu');

            if (navLink) {
                // Hover-based behavior (when data-flyout-hover is applied)
                if (navItem.hasAttribute('data-flyout-hover')) {
                    navLink.addEventListener('mouseenter', () => this._updateBackdrop());
                    navLink.addEventListener('mouseleave', () => this._updateBackdrop());

                    if (dropdownMenu) {
                        dropdownMenu.addEventListener('mouseenter', () => this._updateBackdrop());
                        dropdownMenu.addEventListener('mouseleave', () => this._updateBackdrop());
                    }
                }

                // Click-based behavior (data-bs-toggle="dropdown")
                if (dropdownMenu) {
                    navLink.addEventListener('click', () => this._updateBackdrop());
                }
            }
        });

        // Observe changes to .show class on dropdown menus
        const observer = new MutationObserver(() => this._updateBackdrop());
        observer.observe(document.querySelector('.navbar-nav'), {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });

        // Initial backdrop update
        this._updateBackdrop();
    }

    _updateBackdrop() {
        // Check if any dropdown has the "show" class, indicating it's open
        const activeDropdown = document.querySelector('.navbar-nav .dropdown-menu.show');

        // Only show the backdrop if there is at least one open dropdown and data-backdrop-show is set
        if (this.navbar.hasAttribute('data-backdrop-show') && activeDropdown) {
            this._insertBackdrop();
        } else {
            // If there are no dropdowns with .show, remove the backdrop
            this._removeBackdrop();
        }
    }

    _insertBackdrop() {
        // If the backdrop doesn't already exist, create and show it
        if (!document.querySelector('.offcanvas-backdrop-menu')) {
            const backdrop = document.createElement('div');
            backdrop.classList.add('offcanvas-backdrop-menu', 'fade');

            const header = document.querySelector('header');
            if (header) {
                header.parentNode.insertBefore(backdrop, header.nextSibling);

                setTimeout(() => {
                    backdrop.classList.add('show');
                }, 10);
            }
        }
    }

    _removeBackdrop() {
        // Remove the backdrop if it exists
        const backdrop = document.querySelector('.offcanvas-backdrop-menu');
        if (backdrop) {
            backdrop.classList.remove('show');
            setTimeout(() => backdrop.remove(), 80); // Match CSS fade-out timing
        }
    }
}
