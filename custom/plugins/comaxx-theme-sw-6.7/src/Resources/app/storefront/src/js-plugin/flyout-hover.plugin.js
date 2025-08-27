import Plugin from 'src/plugin-system/plugin.class';

export default class FlyoutHoverPlugin extends Plugin {
    init() {
        this.navItems = document.querySelectorAll('.navbar-nav > .nav-item');
        this.isTouchDevice = this._isTouchDevice();
        this.hoverTimeout = null;
        this._initFlyoutBehavior();
        window.addEventListener('resize', this._handleResize.bind(this));
    }

    _handleResize() {
        const newIsTouchDevice = this._isTouchDevice();
        if (newIsTouchDevice !== this.isTouchDevice) {
            this.isTouchDevice = newIsTouchDevice;
            this._initFlyoutBehavior();
        }
    }

    _isTouchDevice() {
        return window.matchMedia('(hover: none)').matches;
    }

    _initFlyoutBehavior() {
        this.navItems.forEach((navItem) => {
            const navLink = navItem.querySelector('.nav-link');
            const dropdownMenu = navItem.querySelector('.dropdown-menu');

            if (!navLink) return;

            navItem.removeAttribute('data-flyout-hover');
            navLink.removeAttribute('data-bs-toggle');

            if (!this.isTouchDevice) {
                if (dropdownMenu) {
                    navItem.setAttribute('data-flyout-hover', '');
                }
                this._applyHoverBehavior(navItem, navLink, dropdownMenu);
            } else {
                if (dropdownMenu) {
                    navLink.setAttribute('data-bs-toggle', 'dropdown');
                }
            }

            this._applyKeyboardBehavior(navItem, navLink, dropdownMenu);
        });
    }

    _applyHoverBehavior(navItem, navLink, dropdownMenu) {
        const handleMouseEnter = () => {
            clearTimeout(this.hoverTimeout);
            this._closeAllDropdowns(); // Close all dropdowns before opening the new one

            if (dropdownMenu && !dropdownMenu.classList.contains('show')) {
                navLink.classList.add('show');
                dropdownMenu.classList.add('show');
                dropdownMenu.setAttribute('data-bs-popper', 'static');

                navItem.dataset.flyoutOpen = 'true';

                // Perform additional actions when dropdown shows
                this._onDropdownShow();
            }
        };

        const handleMouseLeave = (e) => {
            if (!navItem.contains(e.relatedTarget)) {
                this.hoverTimeout = setTimeout(() => {
                    this._closeAllDropdowns();
                    navItem.dataset.flyoutOpen = 'false';
                }, 200); // Delay before closing the dropdown
            }
        };

        navLink.addEventListener('mouseenter', handleMouseEnter);
        if (dropdownMenu) {
            dropdownMenu.addEventListener('mouseenter', handleMouseEnter);
            dropdownMenu.addEventListener('mouseleave', handleMouseLeave);
        }
        navLink.addEventListener('mouseleave', handleMouseLeave);
    }

    _applyKeyboardBehavior(navItem, navLink, dropdownMenu) {
        const handleFocus = () => {
            clearTimeout(this.hoverTimeout);
            this._closeAllDropdowns(); // Close all dropdowns before opening the new one

            if (dropdownMenu) {
                navLink.classList.add('show');
                dropdownMenu.classList.add('show');
                dropdownMenu.setAttribute('data-bs-popper', 'static');

                navItem.dataset.flyoutOpen = 'true';

                // Perform additional actions when dropdown shows
                this._onDropdownShow();
            }
        };

        const handleBlur = (event) => {
            if (!dropdownMenu.contains(event.relatedTarget) && !navLink.contains(event.relatedTarget)) {
                this._closeAllDropdowns();
                navItem.dataset.flyoutOpen = 'false';
            }
        };

        navLink.addEventListener('focus', handleFocus);
        navLink.addEventListener('blur', handleBlur);
    }

    _closeAllDropdowns() {
        // Close all open dropdowns and remove the active states
        document.querySelectorAll('.navbar-nav .nav-link.show').forEach((navLink) => {
            navLink.classList.remove('show');
        });

        document.querySelectorAll('.navbar-nav .dropdown-menu.show').forEach((dropdown) => {
            dropdown.classList.remove('show');
            dropdown.removeAttribute('data-bs-popper');
        });

        this.navItems.forEach((navItem) => {
            delete navItem.dataset.flyoutOpen;
        });

        // Make sure we reset any actions performed on the dropdown
        this._resetActionsOnDropdown();
    }

    // Reset actions on dropdown (e.g., removing 'active' class from the parent)
    _resetActionsOnDropdown() {
        document.querySelectorAll('.comaxx-mega-menu-item.parent-is-active').forEach((item) => {
            item.classList.remove('parent-is-active');
        });

        document.querySelectorAll('.comaxx-mega-menu-right-column-details').forEach((item) => {
            if (!item.classList.contains('is-intro')) {
                item.setAttribute('hidden', 'true');
            }
        });

        document.querySelectorAll('.comaxx-mega-menu-right-column-details.is-intro').forEach((item) => {
            item.classList.remove('is-hidden');
        });
    }

    // Additional actions when a dropdown is shown
    _onDropdownShow() {
        // 1️⃣ Remove `parent-is-active` class from the left column parent menu item
        document.querySelectorAll('.comaxx-mega-menu-item.parent-is-active').forEach((item) => {
            item.classList.remove('parent-is-active');
        });

        // 2️⃣ Add 'hidden' attribute to all `.comaxx-mega-menu-right-column-details` except intro
        document.querySelectorAll('.comaxx-mega-menu-right-column-details').forEach((item) => {
            if (!item.classList.contains('is-intro')) {
                item.setAttribute('hidden', 'true');
            }
        });

        // 3️⃣ Remove 'is-hidden' class from `.comaxx-mega-menu-right-column-details.is-intro`
        document.querySelectorAll('.comaxx-mega-menu-right-column-details.is-intro').forEach((item) => {
            item.classList.remove('is-hidden');
        });
    }
}
