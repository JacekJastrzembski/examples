import React, { useState } from 'react';
import './calculator.css';

function Calculator() {
    const [inputs, setInputs] = useState({ a: '', b: '' });
    const [result, setResult] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    };

    const calculate = (operation: number) => {
      const a = parseFloat(inputs.a);
      const b = parseFloat(inputs.b);
  
      if (isNaN(a) || isNaN(b)) {
        alert('Proszę wprowadzić prawidłowe liczby!');
        return;
      }
  
      let calcResult: string;
  
      switch (operation) {
        case 1:
          calcResult = `Wynik: ${a + b}`;
          break;
        case 2:
          calcResult = `Wynik: ${a - b}`;
          break;
        case 3:
          calcResult = `Wynik: ${a * b}`;
          break;
        case 4:
          if (b === 0) {
            alert('Nie można dzielić przez zero!');
            return;
          }
          calcResult = `Wynik: ${a / b}`;
          break;
        default:
          alert('Nieprawidłowa operacja!');
          return;
      }
  
      setResult(calcResult);
    };
  
    const resetCalculator = () => {
      setInputs({ a: '', b: '' });
      setResult(null);
    };
  
    return (
      <div id="container">
        <h1>Kalkulator</h1>
        <div className="inputfield">
          <label>Podaj pierwszą liczbę: </label>
          <input type="number" id="a" name="a" value={inputs.a} onChange={handleChange} />
        </div>
        <div className="inputfield">
          <label>Podaj drugą liczbę: </label>
          <input type="number" id="b" name="b" value={inputs.b} onChange={handleChange} />
        </div>
        <div id="operations">
          <input type="button" value="DODAWANIE" onClick={() => calculate(1)} />
          <input type="button" value="ODEJMOWANIE" onClick={() => calculate(2)} />
          <input type="button" value="MNOŻENIE" onClick={() => calculate(3)} />
          <input type="button" value="DZIELENIE" onClick={() => calculate(4)} />
        </div>
        <div id="result">
          {result && <p>{result}</p>}
        </div>
        <button className="resetButton" type="reset" onClick={resetCalculator}>RESETUJ</button>
      </div>
    );
  }
  
  export default Calculator;