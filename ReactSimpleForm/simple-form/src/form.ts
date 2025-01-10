export function form(): void {

    const nameInput= document.getElementById('name') as HTMLInputElement | null;
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;
    const resetForm = document.getElementById('resetForm') as HTMLButtonElement | null;
    const contactForm = document.getElementById('contact') as HTMLFormElement | null;

    if (!nameInput || !emailInput || !messageInput || !resetForm || !contactForm) {
        console.error('Nie znaleziono wymaganych elementów w DOM.');
        return;
    }

// Załaduj zapisane dane z localStorage przy ładowaniu strony
    const loadSavedData = (): void => {
        const savedName = localStorage.getItem('name');
        const savedEmail = localStorage.getItem('email');
        const savedMessage = localStorage.getItem('message');

        if (savedName) {
            nameInput.value = savedName;
        }
        if (savedEmail) {
            emailInput.value = savedEmail;
        }
        if (savedMessage) {
            messageInput.value = savedMessage;
        }
        
        resetForm.style.visibility = savedName || savedEmail || savedMessage ? 'visible' : 'hidden';
    };

    loadSavedData();

// Zapisz dane formularza
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Zapisanie danych do localStorage
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('message', message);

        resetForm.style.visibility = 'visible';
    });

// Resetowanie formularza
    resetForm.addEventListener('click', function() {
        // Wyczyszczenie pól formularza
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';

        // Usunięcie danych z localStorage
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('message');

        resetForm.style.visibility = 'hidden';
    });
}