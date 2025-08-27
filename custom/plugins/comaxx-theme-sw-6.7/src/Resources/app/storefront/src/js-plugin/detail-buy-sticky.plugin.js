import Plugin from 'src/plugin-system/plugin.class';

export default class DetailBuySticky extends Plugin {
    init() {
        this.stickyBuyWidget = document.querySelector('[data-buy-sticky]');
        this.buyForm = document.querySelector('.product-detail-form-container');
        this.header = document.querySelector('.header-main');
        this.mobileWidth = 768;

        if (!this.stickyBuyWidget || !this.buyForm || !this.header) return;

        this.stickyBuyWidget.setAttribute('hidden', '');
        this._logHeaderState('Page load');

        this._setupScrollHandler();
        this._startGlobalHeaderWatcher(); // NEW: always watch header
    }

    _setupScrollHandler() {
        window.addEventListener('scroll', this._onScroll.bind(this));
        window.addEventListener('resize', this._debounce(this._onScroll.bind(this), 100));
    }

    _debounce(func, wait) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(), wait);
        };
    }

    _isHeaderVisible() {
        const rect = this.header.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        return {
            visible: isVisible,
            height: isVisible ? this.header.offsetHeight : 0,
        };
    }

    _logHeaderState(context) {
        const { visible, height } = this._isHeaderVisible();
    }

    _startGlobalHeaderWatcher() {
        let lastHeight = null;

        const check = () => {
            const headerState = this._isHeaderVisible();

            if (window.innerWidth > this.mobileWidth) {
                if (lastHeight !== headerState.height) {
                    lastHeight = headerState.height;

                    if (!this.stickyBuyWidget.hasAttribute('hidden')) {
                        // Sticky buy is active → adjust its top
                        this.stickyBuyWidget.style.top = `${headerState.height}px`;
                        this._logHeaderState('Updated top while active');
                    } else {
                        // Sticky buy not yet active → pre-adjust
                        this.stickyBuyWidget.style.marginTop = `${headerState.height}px`;
                        this._logHeaderState('Pre-adjusted margin-top while inactive');
                    }
                }
            }

            requestAnimationFrame(check);
        };

        requestAnimationFrame(check);
    }

    _onScroll() {
        const headerState = this._isHeaderVisible();
        const stickyBuyHeight = this.stickyBuyWidget.offsetHeight;
        const isMobile = window.innerWidth <= this.mobileWidth;
        const buyFormBottom = this.buyForm.getBoundingClientRect().bottom;

        this._logHeaderState('Scroll');

        if (buyFormBottom <= 0) {
            if (this.stickyBuyWidget.hasAttribute('hidden')) {
                this.stickyBuyWidget.removeAttribute('hidden');
                this.stickyBuyWidget.style.position = 'fixed';
                this.stickyBuyWidget.style.left = '0';
                this.stickyBuyWidget.style.right = '0';
                this.stickyBuyWidget.style.zIndex = '999';

                if (isMobile) {
                    this.stickyBuyWidget.style.transition = 'transform 0.2s ease-out';
                    this.stickyBuyWidget.style.transform = 'translateY(100%)';
                    void this.stickyBuyWidget.offsetWidth;
                    this.stickyBuyWidget.style.transform = 'translateY(0)';
                } else {
                    this.stickyBuyWidget.style.top = `-${stickyBuyHeight}px`;
                    void this.stickyBuyWidget.offsetWidth;
                    this.stickyBuyWidget.style.top = `${headerState.height}px`;
                }
            }
        } else {
            if (!this.stickyBuyWidget.hasAttribute('hidden')) {
                if (isMobile) {
                    this.stickyBuyWidget.style.transition = 'transform 0.2s ease-out';
                    this.stickyBuyWidget.style.transform = 'translateY(100%)';
                } else {
                    this.stickyBuyWidget.style.top = `-${stickyBuyHeight}px`;
                }
                setTimeout(() => {
                    this.stickyBuyWidget.setAttribute('hidden', '');
                }, 200);
            }
        }
    }
}
