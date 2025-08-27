import Plugin from 'src/plugin-system/plugin.class';

export default class DetailDescriptionTogglePlugin extends Plugin {
    init() {
        const readMoreBtn = document.querySelector('.read-more-btn');
        const readLessBtn = document.querySelector('.read-less-btn');
        const descriptionContent = document.querySelector('.description-content');
        let isExpanded = false;

        if (readMoreBtn && readLessBtn && descriptionContent) {
            // Calculate the natural height of the content
            const naturalHeight = descriptionContent.scrollHeight;

            // Function to expand the content
            function expandContent() {
                descriptionContent.style.maxHeight = `${naturalHeight}px`;
                descriptionContent.classList.add('expanded');
                readMoreBtn.style.display = 'none';
                readLessBtn.style.display = 'flex';
                isExpanded = true;
            }

            // Function to collapse the content
            function collapseContent() {
                descriptionContent.style.maxHeight = '150px';
                descriptionContent.classList.remove('expanded');
                readMoreBtn.style.display = 'flex';
                readLessBtn.style.display = 'none';
                isExpanded = false;
            }

            // Event listener for Read More button
            readMoreBtn.addEventListener('click', function() {
                expandContent();
            });

            // Event listener for Read Less button
            readLessBtn.addEventListener('click', function() {
                collapseContent();
            });

            // Set initial height
            if (!isExpanded) {
                descriptionContent.style.maxHeight = '150px'; // Initial collapsed height
            }
        }
    }
}
