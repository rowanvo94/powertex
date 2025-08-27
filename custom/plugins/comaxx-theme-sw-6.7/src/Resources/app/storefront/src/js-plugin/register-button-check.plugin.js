import Plugin from 'src/plugin-system/plugin.class';

export default class RegisterButtonCheckPlugin extends Plugin {
    init() {
        this.form = this.el;
        this.submitButton = this.form.querySelector('.register-submit button');

        if (!this.form || !this.submitButton) {
            return;
        }

        this.requiredFields = [];
        this.previousValues = new Map();

        this._observeRequiredFields();
        this._startPolling();
        this._checkValidity();
    }

    _isVisible(element) {
        return element.offsetParent !== null;
    }

    _updateRequiredFields() {
        const allFields = Array.from(this.form.querySelectorAll('input, select, textarea'));

        const visibleRequiredFields = allFields.filter((field) => {
            const isRequired = field.dataset.validation?.includes('required') || field.getAttribute('aria-required') === 'true' || field.hasAttribute('required');

            return isRequired && this._isVisible(field);
        });

        const added = visibleRequiredFields.filter((field) => !this.requiredFields.includes(field));
        const removed = this.requiredFields.filter((field) => !visibleRequiredFields.includes(field));

        this.requiredFields = visibleRequiredFields;

        removed.forEach((field) => {
            field.replaceWith(field.cloneNode(true));
            this.previousValues.delete(field);
        });

        added.forEach((field) => {
            if (!this.previousValues.has(field)) {
                this.previousValues.set(field, field.value);

                field.addEventListener('input', () => {
                    this.previousValues.set(field, field.value);
                    this._checkValidity();
                });
            }
        });
    }

    _observeRequiredFields() {
        const updateFields = () => this._updateRequiredFields();

        updateFields();

        const observer = new MutationObserver((mutationsList) => {
            let shouldUpdate = false;

            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && ['data-validation', 'aria-required', 'required', 'style', 'class'].includes(mutation.attributeName)) {
                    shouldUpdate = true;
                }
                if (mutation.type === 'childList') {
                    shouldUpdate = true;
                }
            }

            if (shouldUpdate) {
                updateFields();
                this._checkValidity();
            }
        });

        observer.observe(this.form, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-validation', 'aria-required', 'required', 'style', 'class'],
        });
    }

    _startPolling() {
        this.pollInterval = setInterval(() => {
            let changed = false;

            this.requiredFields.forEach((field) => {
                const prev = this.previousValues.get(field);
                const current = field.value;

                if (prev !== current) {
                    this.previousValues.set(field, current);
                    changed = true;
                }
            });

            if (changed) {
                this._checkValidity();
            }
        }, 200);
    }

    _checkValidity() {
        let allValid = true;

        this.requiredFields.forEach((field) => {
            const trimmed = field.value.trim();

            if (trimmed.length === 0) {
                allValid = false;
            }
        });

        this.submitButton.disabled = !allValid;
    }
}
