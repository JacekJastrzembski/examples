
function calculate(operation){
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);

    var result;

    if (isNaN(a) || isNaN(b)) {
        alert('Proszę wprowadzić prawidłowe liczby!');
        return;
    }

    switch (operation) 
    {
        case 1:
            document.getElementById("result").innerHTML ="Wynik: " + (a+b);
            break;
        case 2:
            document.getElementById("result").innerHTML ="Wynik: " + (a-b);
            break;
        case 3:
            document.getElementById("result").innerHTML ="Wynik: " + (a*b);
            break;
        case 4:
            if (b === 0) {
                alert('Nie można dzielić przez zero!');
                return;
            }
            document.getElementById("result").innerHTML ="Wynik: " + (a/b);
            break;
        default:
            alert('Nieprawidłowa operacja!');
            return;
    }
}