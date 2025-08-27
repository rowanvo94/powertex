import Plugin from 'src/plugin-system/plugin.class';

export default class MegaMenuPlugin extends Plugin {
    init() {
        this._addEventListeners();
        this._activeRightColumn = null;
        this._currentHoveredLink = null;
        this._closeTimeout = null;
        this._activeParentItem = null;
    }

    _addEventListeners() {
        if (!this.el) return;

        const megaMenuItems = this.el.querySelectorAll('.comaxx-mega-menu-item a');
        if (megaMenuItems.length === 0) return;

        if (!this._isTouchDevice()) {
            megaMenuItems.forEach((link) => {
                link.addEventListener('mouseenter', this._showRightColumn.bind(this));
                link.addEventListener('mouseleave', this._handleMouseLeave.bind(this));
            });
        }

        megaMenuItems.forEach((link) => {
            const parentItem = link.closest('.comaxx-mega-menu-item');
            const parentCategoryId = parentItem?.dataset.comaxxCategoryId;

            const rightColumn = this.el.querySelector(`.comaxx-mega-menu-right-column [data-comaxx-parent-id="${parentCategoryId}"]`);

            if (rightColumn) {
                parentItem.classList.add('has-children');
            }

            link.addEventListener('click', this._handleClick.bind(this));
            link.addEventListener('keydown', this._handleKeyDown.bind(this));
        });

        const dropdownMenus = document.querySelectorAll('.dropdown-menu[data-flyout-hover]');
        dropdownMenus.forEach((dropdownMenu) => {
            dropdownMenu.addEventListener('mouseleave', this._closeRightColumnOnMenuLeave.bind(this));
        });

        const navLinks = document.querySelectorAll('.nav-link.dropdown-toggle.main-navigation-link');
        navLinks.forEach((navLink) => {
            navLink.addEventListener('click', this._handleNavLinkClick.bind(this));
        });
    }

    _isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    _handleClick(event) {
        const parentItem = event.currentTarget.closest('.comaxx-mega-menu-item');
        const parentCategoryId = parentItem?.dataset.comaxxCategoryId;

        const rightColumn = this.el.querySelector(`.comaxx-mega-menu-right-column [data-comaxx-parent-id="${parentCategoryId}"]`);

        if (rightColumn) {
            // Has children: prevent default and show submenu
            // event.preventDefault();
            this._showRightColumn(event);
        } else {
            // No children: allow default navigation
            this._hideRightColumn(); // Optional: close right column if open
        }
    }

    _handleNavLinkClick(event) {
        const navLink = event.currentTarget;
        const isExpanded = navLink.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            this._hideRightColumn();
        } else {
            this._showRightColumnForActiveMegaMenu(navLink);
        }
    }

    _showRightColumnForActiveMegaMenu(navLink) {
        const megaMenu = navLink.closest('.dropdown-menu');
        if (!megaMenu) return;
        const parentCategoryId = megaMenu.dataset.comaxxCategoryId;
        const rightColumn = this.el.querySelector(`.comaxx-mega-menu-right-column [data-comaxx-parent-id="${parentCategoryId}"]`);
        if (rightColumn) {
            rightColumn.hidden = false;
            this._activeRightColumn = rightColumn;
        }
    }

    _showRightColumn(event) {
        const megaMenu = event.currentTarget.closest('.comaxx-mega-menu');
        const intro = megaMenu.querySelector('.comaxx-mega-menu-right-column-details.is-intro');

        const parentCategoryId = event.currentTarget.closest('.comaxx-mega-menu-item')?.dataset.comaxxCategoryId;
        const rightColumn = megaMenu.querySelector(`.comaxx-mega-menu-right-column [data-comaxx-parent-id="${parentCategoryId}"]`);

        if (rightColumn) {
            if (intro) {
                intro.classList.add('is-hidden');
            }
        } else {
            return;
        }

        if (this._activeRightColumn && this._activeRightColumn !== rightColumn) {
            this._activeRightColumn.hidden = true;
            this._removeParentIsActiveClass();
        }

        if (rightColumn) {
            rightColumn.hidden = false;
            this._activeRightColumn = rightColumn;
            this._currentHoveredLink = event.currentTarget;
            this._setParentAsActive(event.currentTarget);
        }
    }

    _handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this._showRightColumn(event);
            const parentCategoryId = event.currentTarget.closest('.comaxx-mega-menu-item')?.dataset.comaxxCategoryId;
            if (parentCategoryId) {
                const rightColumn = this.el.querySelector(`.comaxx-mega-menu-right-column [data-comaxx-parent-id="${parentCategoryId}"]`);
                if (rightColumn) {
                    setTimeout(() => {
                        const firstSubItem = rightColumn.querySelector('a');
                        if (firstSubItem) {
                            firstSubItem.focus();
                            this._addSubItemKeyNavigation(rightColumn);
                        }
                    }, 50);
                }
            }
        }
    }

    _addSubItemKeyNavigation(rightColumn) {
        const subItems = Array.from(rightColumn.querySelectorAll('a'));
        const parentLinks = Array.from(this.el.querySelectorAll('.comaxx-mega-menu-item a'));
        if (!subItems.length) return;

        subItems.forEach((subItem, index) => {
            subItem.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    if (event.shiftKey) {
                        if (index === 0) {
                            event.preventDefault();
                            this._currentHoveredLink.focus();
                        }
                    } else {
                        if (index === subItems.length - 1) {
                            event.preventDefault();
                            const currentIndex = parentLinks.indexOf(this._currentHoveredLink);
                            const nextParent = parentLinks[currentIndex + 1];
                            this._hideRightColumn();
                            if (nextParent) {
                                nextParent.focus();
                            } else {
                                setTimeout(() => {
                                    event.target.blur();
                                }, 50);
                            }
                        }
                    }
                }
            });
        });
    }

    _handleMouseLeave() {}

    _closeRightColumnOnMenuLeave(event) {
        if (this._activeRightColumn) {
            if (this._closeTimeout) clearTimeout(this._closeTimeout);
            this._closeTimeout = setTimeout(() => {
                const megaMenu = event.currentTarget.closest('.comaxx-mega-menu');
                const intro = megaMenu.querySelector('.comaxx-mega-menu-right-column-details.is-intro');
                if (intro) {
                    intro.classList.remove('is-hidden');
                }
                this._activeRightColumn.hidden = true;
                this._activeRightColumn = null;
                this._removeParentIsActiveClass();
            }, 200);
        }
    }

    _hideRightColumn() {
        if (this._activeRightColumn) {
            const megaMenu = this._activeRightColumn.closest('.comaxx-mega-menu');
            const intro = megaMenu.querySelector('.comaxx-mega-menu-right-column-details.is-intro');
            if (intro) {
                intro.classList.remove('is-hidden');
            }
            this._activeRightColumn.hidden = true;
            this._activeRightColumn = null;
            this._removeParentIsActiveClass();
        }
    }

    _removeParentIsActiveClass() {
        if (this._activeParentItem) {
            this._activeParentItem.classList.remove('parent-is-active');
            this._activeParentItem = null;
        }
    }

    _setParentAsActive(link) {
        const parentItem = link.closest('.comaxx-mega-menu-item');
        if (parentItem) {
            this._activeParentItem = parentItem;
            parentItem.classList.add('parent-is-active');
        }
    }
}
