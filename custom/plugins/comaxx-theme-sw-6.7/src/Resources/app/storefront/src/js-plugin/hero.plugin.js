import Plugin from 'src/plugin-system/plugin.class';

export default class HeroPlugin extends Plugin {
    init() {
        this.onResize = this.adjustHeroMinHeight.bind(this);

        this.adjustHeroMinHeight();
        window.addEventListener('resize', this.onResize);
    }

    adjustHeroMinHeight() {
        const heroInner = this.el.querySelector('.hero-section-inner');
        const heroContent = this.el.querySelector('.hero-content');
        const header = document.querySelector('.header-main');

        if (!heroInner || !heroContent || !header) {
            return;
        }

        // Choose correct CSS var based on screen width
        const isMobile = window.innerWidth < 768;
        const style = getComputedStyle(heroInner);
        const cssVar = isMobile ? '--hero-height-mobile' : '--hero-height-desktop';
        let minHeightCss = style.getPropertyValue(cssVar).trim();

        // Convert vh or px value to px
        let minHeightPx = 0;
        if (minHeightCss.endsWith('vh')) {
            const vhValue = parseFloat(minHeightCss);
            minHeightPx = window.innerHeight * (vhValue / 100);
        } else if (minHeightCss.endsWith('px')) {
            minHeightPx = parseFloat(minHeightCss);
        } else {
            minHeightPx = parseFloat(minHeightCss) || 0;
        }

        const requiredHeight = heroContent.offsetHeight + header.offsetHeight;

        if (requiredHeight > minHeightPx) {
            heroInner.style.minHeight = `${requiredHeight}px`;
        } else {
            heroInner.style.minHeight = '';
        }
    }

    destroy() {
        window.removeEventListener('resize', this.onResize);
        super.destroy();
    }
}
