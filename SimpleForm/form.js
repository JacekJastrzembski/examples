// Załaduj zapisane dane z localStorage przy ładowaniu strony
window.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('name');
    const savedEmail = localStorage.getItem('email');
    const savedMessage = localStorage.getItem('message');

    if (savedName) document.getElementById('name').value = savedName;
    if (savedEmail) document.getElementById('email').value = savedEmail;
    if (savedMessage) document.getElementById('message').value = savedMessage;
    if (savedName){
        document.getElementById('resetForm').style.visibility = 'visible';
    } document.getElementById('resetForm').style.visibility = 'hidden';
    
});

document.getElementById('contact').addEventListener('submit', function(event) {
    event.preventDefault(); // Zapobiega domyślnemu wysłaniu formularza

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Wszystkie pola są wymagane!');
        return;
    }

    // Zapisz dane do localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('message', message);
    
    alert('Formularz został pomyślnie wysłany i dane zapisane!');

    document.getElementById('resetForm').style.visibility = 'visible';
});

document.getElementById('resetForm').addEventListener('click', function() {
    // Wyczyszczenie pól formularza
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

    // Usunięcie danych z localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('message');

    alert('Formularz został zresetowany!');

    document.getElementById('resetForm').style.visibility = 'hidden';
});