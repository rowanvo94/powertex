import Plugin from 'src/plugin-system/plugin.class';

export default class StickyHeaderScrollTopPlugin extends Plugin {
    init() {
        this.header = document.querySelector('.header-main.scroll-top');
        this.topBar = document.querySelector('.top-bar');
        this.body = document.body;
        this.contentMain = document.querySelector('.content-main');
        this.hasMobileStickyException = document.querySelector('[data-mobile-sticky-header-not-sticky]');
        this.mobileStickyDefault = document.querySelector('[data-mobile-sticky-header-default]');

        this.searchToggleBtn = document.querySelector('.js-search-toggle-btn'); // toegevoegd

        if (!this.header) return;

        if (this.body.classList.contains('page-has-hero')) {
            this.header.classList.add('has-hero');
        } else {
            this.header.classList.remove('has-hero');
        }

        this._onScroll = this._onScroll.bind(this);
        this._onResize = this._onResize.bind(this);

        this.enabled = false;
        this.mode = null;

        window.addEventListener('resize', this._onResize);
        this._onResize();

        // Optioneel: luister op click toggle om scroll direct te updaten
        if (this.searchToggleBtn) {
            this.searchToggleBtn.addEventListener('click', () => {
                this._onScroll();
            });
        }
    }

    _enable() {
        if (this.enabled && this.mode === 'default') return;

        this._disable();
        this.lastScrollY = window.scrollY;
        this._recalculateOffsets();

        this._setInitialHeaderState();
        window.addEventListener('scroll', this._onScroll);
        this.enabled = true;
        this.mode = 'default';
    }

    _enableMobileDefault() {
        if (this.enabled && this.mode === 'mobile-default') return;

        this._disable();

        window.addEventListener('scroll', this._onScroll);
        this.enabled = true;
        this.mode = 'mobile-default';

        this._onScroll();
    }

    _disable() {
        if (!this.enabled) return;

        window.removeEventListener('scroll', this._onScroll);
        this.header.classList.remove('scroll-up', 'scroll-down', 'is-sticky');
        this._resetContentMargin();
        this.enabled = false;
        this.mode = null;
    }

    _onResize() {
        this._recalculateOffsets();

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            if (this.hasMobileStickyException) {
                this._disable();
            } else if (this.mobileStickyDefault) {
                this._enableMobileDefault();
            } else {
                this._enable();
            }
        } else {
            this._enable();
        }
    }

    _recalculateOffsets() {
        const topBarStyle = this.topBar ? getComputedStyle(this.topBar) : null;
        const isTopBarVisible = topBarStyle && topBarStyle.display !== 'none';
        const topBarHeight = this.topBar && isTopBarVisible ? this.topBar.offsetHeight : 0;

        this.triggerOffset = (this.header?.offsetHeight || 0) + topBarHeight;
    }

    _setInitialHeaderState() {
        const currentScrollY = window.scrollY;
        const isMobile = window.innerWidth < 768;
        const scrollDownTrigger = isMobile ? 350 : this.triggerOffset;

        if (currentScrollY > scrollDownTrigger) {
            this.header.classList.add('scroll-down');
            this.header.classList.remove('scroll-up', 'is-sticky');
            this._resetContentMargin();
        } else {
            this.header.classList.remove('scroll-down', 'scroll-up', 'is-sticky');
            this._resetContentMargin();
        }
    }

    _onScroll() {
        const currentScrollY = window.scrollY;
        const isMobile = window.innerWidth < 768;
        const scrollDownTrigger = isMobile ? 350 : this.triggerOffset;

        // Check of search toggle open is
        const isSearchOpen = this.searchToggleBtn?.getAttribute('aria-expanded') === 'true';

        if (currentScrollY <= 0) {
            this.header.classList.remove('is-sticky', 'scroll-up', 'scroll-down');
            this._resetContentMargin();
            this.lastScrollY = currentScrollY;
            return;
        }

        if (this.mode === 'mobile-default' && isMobile) {
            if (currentScrollY > 0) {
                this.header.classList.add('is-sticky');
            } else {
                this.header.classList.remove('is-sticky');
            }
            this.header.classList.remove('scroll-up', 'scroll-down');

            if (this.body.classList.contains('page-has-hero') && this.contentMain) {
                if (currentScrollY > 0) {
                    this.contentMain.style.marginTop = `-${this.header.offsetHeight}px`;
                } else {
                    this.contentMain.style.marginTop = '';
                }
            }
            this.lastScrollY = currentScrollY;
            return;
        }

        const scrollDiff = currentScrollY - (this.lastScrollY || 0);
        if (Math.abs(scrollDiff) < 10) {
            return;
        }

        const scrollingUp = scrollDiff < 0;
        const headerRect = this.header.getBoundingClientRect();
        const hasHero = this.body.classList.contains('page-has-hero');
        const topBarStyle = this.topBar ? getComputedStyle(this.topBar) : null;
        const isTopBarVisible = topBarStyle && topBarStyle.display !== 'none';
        const topBarHeight = this.topBar && isTopBarVisible ? this.topBar.offsetHeight : 0;
        const isAtTop = currentScrollY <= topBarHeight;

        if (isAtTop) {
            this.header.classList.remove('is-sticky', 'scroll-up', 'scroll-down');
            this._resetContentMargin();
            this.lastScrollY = currentScrollY;
            return;
        }

        const isHeaderStuck = headerRect.top <= 0;

        if (isHeaderStuck) {
            this.header.classList.add('is-sticky');

            if (hasHero && this.contentMain) {
                const offset = this.header.offsetHeight;
                this.contentMain.style.marginTop = `-${offset}px`;
            }

            if (!isSearchOpen) {
                if (scrollingUp && currentScrollY > scrollDownTrigger) {
                    this.header.classList.add('scroll-up');
                    this.header.classList.remove('scroll-down');
                } else if (!scrollingUp && currentScrollY > scrollDownTrigger) {
                    this.header.classList.add('scroll-down');
                    this.header.classList.remove('scroll-up');
                } else if (currentScrollY <= scrollDownTrigger) {
                    this.header.classList.remove('scroll-up', 'scroll-down');
                }
            } else {
                // Search open: geen scroll-up/down classes
                this.header.classList.remove('scroll-up', 'scroll-down');
            }
        } else {
            this.header.classList.remove('is-sticky', 'scroll-up', 'scroll-down');
            this._resetContentMargin();
        }

        this.lastScrollY = currentScrollY;
    }

    _resetContentMargin() {
        const hasHero = this.body.classList.contains('page-has-hero');
        if (hasHero && this.contentMain) {
            this.contentMain.style.marginTop = '';
        }
    }
}
