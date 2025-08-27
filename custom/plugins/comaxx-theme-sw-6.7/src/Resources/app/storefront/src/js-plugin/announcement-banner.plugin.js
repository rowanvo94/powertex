import Plugin from 'src/plugin-system/plugin.class';

export default class AnnouncementBannerPlugin extends Plugin {
    init() {
        const closeButton = this.el.querySelector('.announcement-banner .icon-x');
        const announcementBanner = this.el.closest('.announcement-banner');
        const headerMain = document.querySelector('.header-main');
        const bannerStorageKey = 'announcementBannerHiddenAt';

        // Function to check if the banner should be visible
        const shouldShowBanner = () => {
            const hiddenAt = localStorage.getItem(bannerStorageKey);
            if (!hiddenAt) {
                return true;
            }

            const now = new Date().getTime();
            const hiddenAtTime = parseInt(hiddenAt, 10);
            const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

            if ((now - hiddenAtTime) >= twentyFourHours) {
                return true;
            } else {
                return false;
            }
        };

        // Function to show the banner
        const showBanner = () => {
            if (announcementBanner) {
                announcementBanner.style.display = 'block'; // Show the banner
            }
        };

        // Check if the banner should be shown and reveal it if needed
        if (shouldShowBanner()) {
            showBanner();
        }

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                if (announcementBanner && headerMain) {
                    const heightWithBanner = headerMain.offsetHeight;

                    // Temporarily hide the announcement banner to measure height without it
                    announcementBanner.style.display = 'none';
                    const heightWithoutBanner = headerMain.offsetHeight;
                    announcementBanner.style.display = '';

                    headerMain.style.height = `${heightWithBanner}px`;
                    headerMain.offsetHeight; // Trigger a reflow
                    headerMain.style.transition = 'height 0.3s ease';

                    announcementBanner.style.opacity = '0';

                    setTimeout(() => {
                        headerMain.style.height = `${heightWithoutBanner}px`;
                    }, 0);

                    setTimeout(() => {
                        announcementBanner.remove();
                        headerMain.style.height = 'auto';
                        headerMain.style.transition = '';

                        // Save the current timestamp in localStorage
                        localStorage.setItem(bannerStorageKey, new Date().getTime().toString());
                    }, 300);
                }
            });
        }
    }
}
