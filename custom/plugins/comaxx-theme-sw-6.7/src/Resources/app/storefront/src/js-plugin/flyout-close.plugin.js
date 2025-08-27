import Plugin from 'src/plugin-system/plugin.class';

export default class FlyoutClosePlugin extends Plugin {
    init() {
        // Select all flyout close buttons
        this.closeButtons = document.querySelectorAll('[data-flyout-close]');

        // Add event listeners to close buttons
        this.closeButtons.forEach(button => {
            button.addEventListener('click', this._handleCloseClick.bind(this));
        });
    }

    _handleCloseClick(event) {
        event.preventDefault(); // Prevent default behavior if necessary

        // Remove .show class from all nav links and dropdown menus
        this._closeAllDropdowns();

        // Remove backdrop if it exists
        this._removeBackdrop();
    }

    _closeAllDropdowns() {
        // Find all active nav links and dropdown menus with the .show class
        const activeNavLinks = document.querySelectorAll('.navbar-nav .nav-link.show');
        const activeDropdownMenus = document.querySelectorAll('.navbar-nav .dropdown-menu.show');

        // Remove the .show class
        activeNavLinks.forEach(navLink => navLink.classList.remove('show'));
        activeDropdownMenus.forEach(dropdownMenu => {
            dropdownMenu.classList.remove('show');
            dropdownMenu.removeAttribute('data-bs-popper'); // Reset Bootstrap's popper attribute if present
        });
    }

    _removeBackdrop() {
        // Select the backdrop element if it exists
        const backdrop = document.querySelector('.offcanvas-backdrop-menu');
        if (backdrop) {
            backdrop.classList.remove('show'); // Fade out the backdrop
            setTimeout(() => backdrop.remove(), 80); // Remove it after the fade-out animation
        }
    }
}
