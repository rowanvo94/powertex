import Plugin from 'src/plugin-system/plugin.class';

export default class ShowSecondThumbPlugin extends Plugin {
    init() {
        // Get all product image elements within the current product box
        this.mediaList = this.el.querySelectorAll('.product-image');

        // If there are exactly 2 images, proceed with the hover functionality
        if (this.mediaList.length === 2) {
            // Assign primary and secondary images
            this.primaryImage = this.mediaList[0];
            this.secondaryImage = this.mediaList[1];

            // Set the initial state to show the first image and hide the second image
            this.primaryImage.style.opacity = '1';
            this.secondaryImage.style.opacity = '0';
            this.secondaryImage.style.transition = 'opacity 0.3s ease-in-out';

            // Register events for hover functionality
            this._registerEvents();
        }
    }

    _registerEvents() {
        this.el.addEventListener('mouseenter', this._showSecondImage.bind(this));

        this.el.addEventListener('mouseleave', (event) => {
            const related = event.relatedTarget;

            // Check if mouse moved to product image container or wishlist button
            if (!this.el.contains(related) && !(related && related.closest('.product-wishlist'))) {
                this._showFirstImage();
            }
        });
    }

    _showSecondImage() {
        // Hide the primary image and show the secondary image on hover
        this.primaryImage.style.opacity = '0';
        this.secondaryImage.style.opacity = '1';
    }

    _showFirstImage() {
        // On mouseleave, show the primary image again and hide the secondary image
        this.primaryImage.style.opacity = '1';
        this.secondaryImage.style.opacity = '0';
    }
}
