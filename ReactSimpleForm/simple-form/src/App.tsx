import { useEffect, useState } from 'react'
import './App.css'
import { form } from './form.ts'
function App() {
  useEffect(() => {
    form();
  }, []);
  // Alerty
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string): void => {
      setMessage(msg);
      setTimeout(() => setMessage(null), 4000);
  };

  const handleSubmit = () => {
      showMessage('Formularz został pomyślnie wysłany!');
  };

  const handleReset = () => {
      showMessage('Formularz został zresetowany!');
  };

  return (
    <>
      <div id="container">
      {message && <div className="alert">{message}</div>} {/* Wyświetlanie komunikatu */}

        <form onSubmit={handleSubmit} id="contact">
            <label className="formFont" htmlFor="name">Imię: </label><input type="text" id="name" required></input>
            <label className="formFont" htmlFor="email">Email: </label><input type="email" id="email" required></input>
            <label className="formFont" htmlFor="message">Wiadomość: </label><textarea rows={6} name="message" id="message" required></textarea>
            <button type="submit" id="submit">Wyślij</button>
        </form>
        <br></br>
        <button type="button" id="resetForm" onClick={handleReset}>Resetuj</button>
    </div>
    </>
  )
}

export default App;
