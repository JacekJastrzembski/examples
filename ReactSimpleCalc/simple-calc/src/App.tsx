import './App.css'
import { calculate } from './obliczenia';

function App() {

  return (
    <>
      <div id="container">
        <h1>Kalkulator</h1>
        <div className="inputfield">
            <label htmlFor="a">Podaj pierwszą liczbę: </label><input type="number" id="a"></input>
        </div>
        <div className="inputfield">
            <label htmlFor="b">Podaj drugą liczbę: </label><input type="number" id="b"></input>
        </div>
        <div id="operations">
            <input type="button" value="DODAWANIE" onClick={() => calculate(1)}></input>
            <input type="button" value="ODEJMOWANIE" onClick={() => calculate(2)}></input>
            <input type="button" value="MNOŻENIE" onClick={() => calculate(3)}></input>
            <input type="button" value="DZIELENIE" onClick={() => calculate(4)}></input>
        </div>

        <div id="result"></div>
      </div>
    </>
  )
}

export default App
