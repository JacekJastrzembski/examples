// Lista dropdown
export function dropFunc() {

    const dropButton = document.querySelector('.drop-button');
    const dropList = document.querySelector('.drop-list');

    dropButton.addEventListener('click', (event) => {

        const isVisible = dropList.style.display === 'block';
        dropList.style.display = isVisible ? 'none' : 'block';

        if (!isVisible) {
            // Sprawdź, czy lista mieści się w ekranie
            const rect = dropList.getBoundingClientRect();
            if (rect.bottom > window.innerHeight) {
                // Przewiń stronę w dół, aby lista była widoczna
                dropList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.drop')) {
            dropList.style.display = 'none';
        }
    });
}