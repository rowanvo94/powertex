import Plugin from 'src/plugin-system/plugin.class';

export default class ListingColorSwatchPlugin extends Plugin {
    init() {
        const hasOnlyColor = this.el.dataset.hasOnlyColor === '1';
        if (!hasOnlyColor) return;

        this._registerEvents();
    }

    _registerEvents() {
        const swatches = this.el.querySelectorAll('.color-swatch');
        if (!swatches.length) return;

        const productBox = this.el.closest('.product-box');
        const buyForm = productBox ? productBox.querySelector('form') : null;
        const detailBtn = productBox ? productBox.querySelector('.btn-detail') : null;
        const buyBtn = productBox ? productBox.querySelector('.btn-buy') : null;

        // Standaard: alleen detail-knop zichtbaar
        if (detailBtn && buyBtn) {
            detailBtn.style.display = 'flex';
            buyBtn.style.display = 'none';
        }

        swatches.forEach((swatch) => {
            swatch.addEventListener('click', (event) => {
                event.preventDefault();
                const variantId = swatch.dataset.variantId;

                // Active state
                swatches.forEach((s) => s.classList.remove('active'));
                swatch.classList.add('active');

                // Update form inputs
                if (buyForm) {
                    const idInput = buyForm.querySelector('input[name$="[id]"]');
                    const refInput = buyForm.querySelector('input[name$="[referencedId]"]');
                    if (idInput) idInput.value = variantId;
                    if (refInput) refInput.value = variantId;

                    const event = new Event('variant-updated', { bubbles: true });
                    buyForm.dispatchEvent(event);
                }

                // Toggle knoppen: nu buy-knop tonen
                if (detailBtn && buyBtn) {
                    detailBtn.style.display = 'none';
                    buyBtn.style.display = 'flex';
                }
            });
        });
    }
}
