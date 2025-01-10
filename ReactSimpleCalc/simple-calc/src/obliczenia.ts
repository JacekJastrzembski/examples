export function calculate(operation: number): void {
    
    const aInput = document.getElementById("a") as HTMLInputElement;
    const bInput = document.getElementById("b") as HTMLInputElement;
    const resultDiv = document.getElementById("result") as HTMLDivElement;

    if (!aInput || !bInput || !resultDiv) {
        alert('Brakuje wymaganych elementów w DOM!');
        return;
    }

    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);

    if (isNaN(a) || isNaN(b)) {
        alert('Proszę wprowadzić prawidłowe liczby!');
        return;
    }

    let result: string;

    switch (operation) {
        case 1:
            result = `Wynik: ${a + b}`;
            break;
        case 2:
            result = `Wynik: ${a - b}`;
            break;
        case 3:
            result = `Wynik: ${a * b}`;
            break;
        case 4:
            if (b === 0) {
                alert('Nie można dzielić przez zero!');
                return;
            }
            result = `Wynik: ${a / b}`;
            break;
        default:
            alert('Nieprawidłowa operacja!');
            return;
    }

    resultDiv.innerHTML = result;
}