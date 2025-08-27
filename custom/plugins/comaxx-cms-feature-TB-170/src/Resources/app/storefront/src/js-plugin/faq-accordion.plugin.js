import Plugin from 'src/plugin-system/plugin.class';

export default class FaqAccordionPlugin extends Plugin {
    init() {
        this.accordion = this.el.querySelector('[data-faq-accordion]');
        this.items = this.el.querySelectorAll('[data-faq-item]');

        this.accordion.addEventListener('click', (event) => {
            const question = event.target.closest('[data-faq-question]');
            if (!question) return;

            const item = question.closest('[data-faq-item]');
            if (!item) return;

            if (item.classList.contains('active')) {
                this.closeItem(item);
            } else {
                this.openItem(item);
            }
        });

        // Close all items initially
        this.items.forEach((item) => {
            this.closeItem(item, false);
        });
    }

    openItem(item) {
        // Close all other items
        this.items.forEach((i) => {
            if (i !== item) {
                this.closeItem(i);
            }
        });

        item.classList.add('active');

        const answer = item.querySelector('[data-faq-answer]');
        if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    }

    closeItem(item, animate = true) {
        item.classList.remove('active');

        const answer = item.querySelector('[data-faq-answer]');
        if (answer) {
            if (animate) {
                answer.style.maxHeight = '0px';
            } else {
                answer.style.transition = 'none';
                answer.style.maxHeight = '0px';
                answer.offsetHeight;
                answer.style.transition = '';
            }
        }
    }
}
