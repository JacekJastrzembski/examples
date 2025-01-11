import { useEffect, useState } from 'react'
import './ContactForm.css'

function ContactForm() {

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ firstName:"" ,email:"", message:""});
  const [formReset, setFormReset] = useState(true);

  const handleInputChange = (event: { target: any; }) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setContactForm(prevState => ({
      ...prevState,
      [name]: value,
    }))
  };

  // Ładowanie danych z localStorage
  useEffect(() => {
    const savedFirstName = localStorage.getItem('firstName');
    const savedEmail = localStorage.getItem('email');
    const savedMessage = localStorage.getItem('message');

    if (savedFirstName) {
      setFormReset(false);
      setContactForm(prevState => ({
        ...prevState,
        firstName: savedFirstName
      }));
    }
    if (savedEmail) {
      setFormReset(false);
      setContactForm(prevState => ({
        ...prevState,
        email: savedEmail
      }));
    }
    if (savedMessage) {
      setFormReset(false);
      setContactForm(prevState => ({
        ...prevState,
        message: savedMessage
      }));
    }
  }, []);

  // Obsługa wysyłania formularza
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Zapis do localStorage
    localStorage.setItem('firstName', contactForm.firstName);
    localStorage.setItem('email', contactForm.email);
    localStorage.setItem('message', contactForm.message);

    setTimeout(() => setFormReset(false), 100);
    showMessage('Formularz został pomyślnie wysłany!');
  };

  // Obsługa resetowania formularza
  const handleReset = (): void => {
    setContactForm({ firstName: "", email: "", message: "" });

    localStorage.removeItem('firstName');
    localStorage.removeItem('email');
    localStorage.removeItem('message');

    setFormReset(true);

    showMessage('Formularz został zresetowany!');
  };

  // Funkcja do wyświetlania komunikatów
  const showMessage = (msg: string): void => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 4000); 
  };

  return (
    <>
      <div id="container">
      {alertMessage && <div className="alert">{alertMessage}</div>}
        <form id="contact" onSubmit={handleSubmit}>
          <div className="contactForm">
            <div className="inputfield">
              <label>Imię: </label>
              <input type="text" id="name" name="firstName" placeholder="Imię" value={contactForm.firstName} onChange={handleInputChange} required />
            </div>
            <div className="inputfield">
              <label>Email: </label>
              <input type="email" id="email" name="email" placeholder="Email" value={contactForm.email} onChange={handleInputChange} required />
            </div>
            <div className="inputfield">
              <label>Wiadomość: </label>
              <textarea id="message" name="message" rows={6} placeholder="Wiadomość" value={contactForm.message} onChange={handleInputChange} required/>
            </div>
            <button className="submitButton" type="submit" id="submit">Wyślij</button>
          </div>
        </form>
        {!formReset && (
          <button type="button" id="resetForm" onClick={handleReset}>Resetuj</button>
        )}
      </div>
    </>
  )
}

export default ContactForm;
