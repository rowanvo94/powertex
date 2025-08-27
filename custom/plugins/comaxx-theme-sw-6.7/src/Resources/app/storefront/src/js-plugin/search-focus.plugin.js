import Plugin from 'src/plugin-system/plugin.class';

export default class SearchFocusPlugin extends Plugin {
    init() {
        this.topBar = document.querySelector('.top-bar'); // Adjust the selector if needed
        this._registerEvents();
    }

    _registerEvents() {
        const searchInput = this.el; // 'this.el' is the search input element
        const searchButton = document.querySelector('.header-search-btn'); // The search button
        const closeButton = document.querySelector('.js-search-close-btn'); // The close button

        // Ensure all required elements are available
        if (!searchInput && !searchButton && !closeButton) {
            return;
        }

        // Add event listeners for focus and blur on the search input
        if (searchInput) {
            searchInput.addEventListener('focus', this._onSearchFocus.bind(this));
            searchInput.addEventListener('blur', this._onSearchBlur.bind(this));
        }

        // Add event listeners for focus and blur on the search button
        if (searchButton) {
            searchButton.addEventListener('focus', this._onSearchFocus.bind(this));
            searchButton.addEventListener('blur', this._onSearchBlur.bind(this));
        }

        // Add event listeners for focus and blur on the close button
        if (closeButton) {
            closeButton.addEventListener('focus', this._onSearchFocus.bind(this));
            closeButton.addEventListener('blur', this._onSearchBlur.bind(this));
        }

        // Listen for clicks anywhere on the document
        document.addEventListener('mousedown', this._onClickOutside.bind(this));

        // Monitor focus changes across the document for tab navigation
        document.addEventListener('focusin', this._onFocusChange.bind(this));
    }

    _onSearchFocus() {
        // Add the class in the next animation frame
        requestAnimationFrame(() => {
            document.body.classList.add('is-search-focused');
            this._toggleTopBarClass(true);
        });
    }

    _onSearchBlur() {
        // Do not remove the class immediately; rely on focus and click handlers
    }

    _onClickOutside(event) {
        const searchInput = this.el;
        const searchButton = document.querySelector('.header-search-btn');
        const closeButton = document.querySelector('.js-search-close-btn');
        const searchSuggestions = document.querySelector('.search-suggest, .js-search-result');

        // Check if the click is outside any of the focusable elements (search input, search button, close button, suggestions)
        if (
            searchInput &&
            !searchInput.contains(event.target) &&
            searchButton &&
            !searchButton.contains(event.target) &&
            closeButton &&
            !closeButton.contains(event.target) &&
            (!searchSuggestions || !searchSuggestions.contains(event.target)) // Clicked outside suggestions if they exist
        ) {
            // Remove the class in the next animation frame
            requestAnimationFrame(() => {
                document.body.classList.remove('is-search-focused');
                this._toggleTopBarClass(false);
            });
        }
    }

    _onFocusChange(event) {
        const searchInput = this.el;
        const searchButton = document.querySelector('.header-search-btn');
        const closeButton = document.querySelector('.js-search-close-btn');
        const searchSuggestions = document.querySelector('.search-suggest, .js-search-result');
        const focusedElement = document.activeElement;

        // Keep the class if the newly focused element is any of the search-related elements
        if (
            focusedElement === searchInput ||
            focusedElement === searchButton ||
            focusedElement === closeButton ||
            (searchSuggestions && searchSuggestions.contains(focusedElement)) // Keep the class if focus is inside suggestions
        ) {
            // Ensure the class is still active
            requestAnimationFrame(() => {
                document.body.classList.add('is-search-focused');
                this._toggleTopBarClass(true);
            });
        } else {
            // Remove the class if focus has moved outside of all search-related elements
            requestAnimationFrame(() => {
                document.body.classList.remove('is-search-focused');
                this._toggleTopBarClass(false);
            });
        }
    }

    _toggleTopBarClass(isActive) {
        if (this.topBar) {
            if (isActive) {
                this.topBar.classList.add('has-search-backdrop');
            } else {
                this.topBar.classList.remove('has-search-backdrop');
            }
        }
    }
}
