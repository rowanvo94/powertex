import Plugin from 'src/plugin-system/plugin.class';

export default class RegisterTogglePlugin extends Plugin {
    init() {
        this._initEventListeners();
        this._checkInvalidFields(); // Check invalid fields after page reload
    }

    _initEventListeners() {
        // Event delegation for the toggle button
        document.addEventListener('click', (event) => {
            if (event.target.matches('.js-toggle-register')) {
                this._toggleForm(event.target);
            }
        });
    }

    _toggleForm(button) {
        // Find the form-collapse element directly
        const form = document.querySelector('.form-collapse');

        if (form) {
            if (form.classList.contains('show')) {
                this._slideUp(form, button);
            } else {
                this._slideDown(form, button);
            }
        }
    }

    _slideUp(form, button) {
        const advantagesDiv = document.querySelector('.advantages-register'); // Select the div

        form.style.height = form.scrollHeight + 'px'; // Set height to full before collapsing
        requestAnimationFrame(() => {
            form.classList.remove('show');
            form.style.height = '0'; // Collapse to height 0
        });

        form.addEventListener(
            'transitionend',
            () => {
                form.style.height = ''; // Remove inline height to allow for dynamic content changes
                if (advantagesDiv) {
                    advantagesDiv.style.display = 'block'; // Show the div again when form collapses
                }
            },
            { once: true }
        );

        // Show button after collapse
        setTimeout(() => {
            button.style.display = 'block'; // Show button again if needed
        }, 300); // Match this timeout with your CSS transition duration
    }

    _slideDown(form, button) {
        const advantagesDiv = document.querySelector('.advantages-register'); // Select the div

        form.classList.add('show');
        form.style.height = '0'; // Reset height to start from 0
        form.offsetHeight; // Trigger reflow to enable transition
        form.style.height = form.scrollHeight + 'px'; // Expand to full height

        form.addEventListener(
            'transitionend',
            () => {
                form.style.height = 'auto'; // Allow form to grow dynamically if content changes
            },
            { once: true }
        );

        // Hide the advantages div when the form expands
        if (advantagesDiv) {
            advantagesDiv.style.display = 'none';
        }

        // Hide the button once the form has fully expanded
        button.style.display = 'none';
    }

    // Check if there are any invalid fields after page load and expand the form
    _checkInvalidFields() {
        const invalidFields = document.querySelectorAll(
            '.form-control.is-invalid'
        );
        const form = document.querySelector('.form-collapse');
        const button = document.querySelector('.js-toggle-register');

        // If there are invalid fields, expand the form
        if (invalidFields.length > 0 && form && button) {
            this._slideDown(form, button);
        }
    }
}
