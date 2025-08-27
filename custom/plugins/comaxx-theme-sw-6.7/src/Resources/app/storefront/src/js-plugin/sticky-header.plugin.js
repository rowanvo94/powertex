import Plugin from 'src/plugin-system/plugin.class';

export default class StickyHeaderPlugin extends Plugin {
    init() {
        this.topBar = document.querySelector('.top-bar');
        this.header = document.querySelector('.header-main');
        this.body = document.body;
        this.banner = document.querySelector('.announcement-banner');

        this.searchToggleBtn = document.querySelector('.js-search-toggle-btn');

        this.hasMobileStickyScrollUp = document.querySelector('[data-mobile-sticky-header-scroll-up]') !== null;
        this.isMobile = window.matchMedia('(max-width: 767px)').matches;

        if (!this.header || !this.topBar) return;

        if (this.body.classList.contains('page-has-hero')) {
            this.header.classList.add('has-hero');
        } else {
            this.header.classList.remove('has-hero');
        }

        this.lastScrollY = window.scrollY;
        this.isSticky = false;

        if (this.isMobile && this.hasMobileStickyScrollUp) {
            this.header.classList.add('scroll-top'); // Altijd scroll-top aan
            this._initMobileScrollUpDown();
        } else {
            this.header.classList.remove('scroll-top'); // Verwijder anders
            this._initDefaultSticky();
        }

        this._setupAnnouncementBanner();

        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.matchMedia('(max-width: 767px)').matches;

            if (this.isMobile !== wasMobile) {
                if (this.isMobile && this.hasMobileStickyScrollUp) {
                    this.header.classList.add('scroll-top');
                    this._removeScrollListeners();
                    this._initMobileScrollUpDown();
                } else {
                    this.header.classList.remove('scroll-top');
                    this._removeScrollListeners();
                    this._initDefaultSticky();
                }
            }
        });

        // Optioneel: eventlistener om direct te reageren op toggle veranderingen
        if (this.searchToggleBtn) {
            this.searchToggleBtn.addEventListener('click', () => {
                // Bij het klikken updaten we meteen scroll gedrag
                // (voor het geval aria-expanded pas later verandert)
                this._onMobileScrollUpDown();
            });
        }
    }

    _removeScrollListeners() {
        window.removeEventListener('scroll', this._onMobileScrollUpDownBound);
        window.removeEventListener('scroll', this._onScrollBound);
    }

    _initDefaultSticky() {
        this._removeScrollListeners();

        this._recalculateHeights();

        this._onScrollBound = this._onScroll.bind(this);
        window.addEventListener('scroll', this._onScrollBound);
        window.addEventListener('resize', this._recalculateHeights.bind(this));

        this._updateStickyState();
    }

    _initMobileScrollUpDown() {
        this._removeScrollListeners();

        this._recalculateHeights();

        this._onMobileScrollUpDownBound = this._onMobileScrollUpDown.bind(this);
        window.addEventListener('scroll', this._onMobileScrollUpDownBound);

        this._updateMobileStickyState();

        this.lastScrollY = window.scrollY;
    }

    _recalculateHeights() {
        const topBarStyle = this.topBar ? getComputedStyle(this.topBar) : null;
        const isTopBarVisible = topBarStyle && topBarStyle.display !== 'none';

        this.topBarHeight = this.topBar && isTopBarVisible ? this.topBar.offsetHeight : 0;
        this.headerHeight = this.header ? this.header.offsetHeight : 0;
        this.bannerHeight = this.banner && getComputedStyle(this.banner).display !== 'none' ? this.banner.offsetHeight : 0;
    }

    _onScroll() {
        this.lastScrollY = window.scrollY;

        if (this.ticking) return;

        window.requestAnimationFrame(() => {
            this._updateStickyState();
            this.ticking = false;
        });

        this.ticking = true;
    }

    _updateStickyState() {
        const contentMain = document.querySelector('.content-main');
        const hasHero = this.body.classList.contains('page-has-hero');
        const hasScrolled = this.lastScrollY > 0;
        const shouldStick = this.lastScrollY >= this.topBarHeight;

        if (hasScrolled && shouldStick && !this.isSticky) {
            this.header.classList.add('is-sticky');
            this.isSticky = true;

            if (hasHero && contentMain) {
                contentMain.style.marginTop = `-${this.headerHeight}px`;
            }
        } else if (!hasScrolled && this.isSticky) {
            this.header.classList.remove('is-sticky');
            this.isSticky = false;

            if (hasHero && contentMain) {
                contentMain.style.marginTop = '';
            }
        }
    }

    _updateMobileStickyState() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 0 && !this.header.classList.contains('is-sticky')) {
            this.header.classList.add('is-sticky');
            this.isSticky = true;

            const contentMain = document.querySelector('.content-main');
            const hasHero = this.body.classList.contains('page-has-hero');
            if (hasHero && contentMain) {
                contentMain.style.marginTop = `-${this.headerHeight}px`;
            }
        }
    }

    _onMobileScrollUpDown() {
        if (!this.isMobile) return;

        const currentScrollY = window.scrollY;
        const contentMain = document.querySelector('.content-main');
        const hasHero = this.body.classList.contains('page-has-hero');

        const isSearchOpen = this.searchToggleBtn?.getAttribute('aria-expanded') === 'true';

        if (currentScrollY === 0) {
            this.header.classList.remove('is-sticky', 'scroll-up', 'scroll-down');
            this.isSticky = false;

            if (hasHero && contentMain) {
                contentMain.style.marginTop = '';
            }

            this.lastScrollY = currentScrollY;
            return;
        }

        if (currentScrollY > 0 && !this.header.classList.contains('is-sticky')) {
            this.header.classList.add('is-sticky');
            this.isSticky = true;

            if (hasHero && contentMain) {
                contentMain.style.marginTop = `-${this.headerHeight}px`;
            }
        }

        if (!isSearchOpen) {
            if (currentScrollY > 350) {
                if (currentScrollY > this.lastScrollY) {
                    this.header.classList.add('scroll-down');
                    this.header.classList.remove('scroll-up');
                } else if (currentScrollY < this.lastScrollY) {
                    this.header.classList.add('scroll-up');
                    this.header.classList.remove('scroll-down');
                }
            } else {
                this.header.classList.remove('scroll-up', 'scroll-down');
            }
        } else {
            this.header.classList.remove('scroll-down', 'scroll-up');
        }

        this.lastScrollY = currentScrollY;
    }

    _setupAnnouncementBanner() {
        if (!this.banner) return;

        const closeButton = this.banner.querySelector('.icon');
        if (!closeButton) return;

        closeButton.addEventListener('click', () => {
            this.banner.style.display = 'none';
            this._recalculateHeights();
        });
    }
}
