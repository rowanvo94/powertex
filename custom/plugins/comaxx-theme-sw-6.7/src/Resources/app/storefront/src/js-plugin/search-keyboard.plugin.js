import Plugin from 'src/plugin-system/plugin.class';

export default class SearchKeyboardPlugin extends Plugin {
    init() {
        this._registerEvents();
    }

    _registerEvents() {
        // Listen for the tab navigation and focus changes
        document.addEventListener('focusin', this._onFocusChange.bind(this));
        // Listen for keydown events for handling tabbing inside search-suggest
        document.addEventListener('keydown', this._handleTabNavigation.bind(this));
    }

    _onFocusChange(event) {
        const searchInput = document.querySelector('input[type="search"]');
        const searchSuggestions = document.querySelector('.search-suggest, .js-search-result');
        const focusedElement = document.activeElement;

        // If focus is inside the search input or suggestions, prevent removal of suggestions
        if (searchSuggestions && (searchInput === focusedElement || searchSuggestions.contains(focusedElement))) {
            return;  // Don't remove the suggestions if focus is inside the search input or suggestions
        }

        // If focus is outside both, remove suggestions
        this._removeSearchSuggestions();
    }

    _removeSearchSuggestions() {
        const searchSuggestions = document.querySelector('.search-suggest, .js-search-result');

        // If search suggestions are found, remove them from the DOM
        if (searchSuggestions) {
            searchSuggestions.remove();
        }
    }

    _handleTabNavigation(event) {
        const searchInput = document.querySelector('input[type="search"]');
        const searchSuggestions = document.querySelector('.search-suggest');
        const searchResultItems = searchSuggestions ? searchSuggestions.querySelectorAll('li a') : [];
        const closeButton = document.querySelector('.js-search-close-btn');

        if (event.key === 'Tab') {
            const activeElement = document.activeElement;

            // 1. If the search input is focused and search suggestions are present, tab should move into the first result
            if (searchInput && searchInput === activeElement && searchSuggestions && searchResultItems.length > 0) {
                event.preventDefault();  // Prevent tabbing to the next item outside
                searchResultItems[0].focus(); // Tab to the first search result
                return;
            }

            // 2. Inside the search suggestions, tabbing should move through the list of items
            if (searchSuggestions && searchResultItems.length > 0) {
                // If we're at the last search result item and trying to move forward:
                if (activeElement === searchResultItems[searchResultItems.length - 1]) {
                    event.preventDefault();  // Prevent default tabbing behavior
                    this._removeSearchSuggestions();  // Close the search suggestions
                    // Let the tab go to the next available focusable element outside the search
                    return;
                }
            }

            // 3. If tabbing from search input, focus should move to close button first if visible
            if (searchInput && activeElement === searchInput && closeButton && closeButton.offsetParent !== null) {
                event.preventDefault(); // Prevent tabbing to other header elements
                closeButton.focus(); // Focus on close button
                return;
            }

            // 4. If tabbing from search close, return focus to the search input
            if (closeButton && activeElement === closeButton && searchInput) {
                event.preventDefault();
                searchInput.focus();  // Return focus to the search input
                return;
            }

            // 5. If focus is back on the search input and no search suggestions are present,
            // let tabbing continue to the next focusable element in the page
            if (searchInput && activeElement === searchInput && !searchSuggestions) {
                event.preventDefault(); // Prevent tabbing into search again
                this._moveToNextFocusableElement();  // Move focus to the next focusable element
            }
        }
    }

    // Helper function to find and move focus to the next available focusable element in the page
    _moveToNextFocusableElement() {
        // Find all focusable elements
        const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        let nextElementFound = false;

        for (let i = 0; i < focusableElements.length; i++) {
            const element = focusableElements[i];
            if (nextElementFound && element !== document.activeElement) {
                // Move focus to the next element
                element.focus();
                return;
            }
            if (element === document.activeElement) {
                nextElementFound = true; // We've found the active element, now focus the next one
            }
        }
    }
}
