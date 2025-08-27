import Plugin from 'src/plugin-system/plugin.class';

export default class TabItemsPlugin extends Plugin {
    init() {
        this.tabButtons = this.el.querySelectorAll('[data-tab-trigger]');
        this.tabContents = this.el.querySelectorAll('[data-tab-content]');
        this.tabIndicator = this.el.querySelector('[data-tab-indicator]');

        if (!this.tabButtons.length || !this.tabIndicator) return;

        this.setActiveTab(this.tabButtons[0]);

        this.tabButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                this.createRipple(event);
                this.setActiveTab(button);
                this.setFocusedBackground(button);
            });
        });

        window.addEventListener('resize', () => {
            const active = this.el.querySelector('[data-tab-trigger].active');
            if (active) this.setIndicator(active);
        });

        document.addEventListener('click', (event) => {
            const isTabButton = Array.from(this.tabButtons).some((btn) => btn.contains(event.target));
            if (!isTabButton) {
                this.clearFocusedBackgrounds();
            }
        });
    }

    setActiveTab(activeButton) {
        const index = activeButton.dataset.tabIndex;

        this.tabButtons.forEach((btn) => btn.classList.remove('active'));
        this.tabContents.forEach((content) => content.classList.remove('active'));

        activeButton.classList.add('active');
        this.tabContents[index]?.classList.add('active');

        // ✅ Scroll active tab into view on small screens
        if (window.innerWidth <= 768) {
            activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }

        this.setIndicator(activeButton);
    }

    setIndicator(button) {
        const offsetLeft = button.offsetLeft;
        const width = button.offsetWidth;

        this.tabIndicator.style.width = `${width}px`;
        this.tabIndicator.style.transform = `translateX(${offsetLeft}px)`;
    }

    createRipple(event) {
        const button = event.currentTarget;

        const oldRipple = button.querySelector('.ripple');
        if (oldRipple) oldRipple.remove();

        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        button.appendChild(circle);

        // Optional: auto-remove ripple span after animation
        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    setFocusedBackground(button) {
        this.tabButtons.forEach((btn) => btn.classList.remove('background-focused'));
        button.classList.add('background-focused');
    }

    clearFocusedBackgrounds() {
        this.tabButtons.forEach((btn) => btn.classList.remove('background-focused'));
    }
}
