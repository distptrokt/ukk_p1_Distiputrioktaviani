let expression = "";

function appendToDisplay(value) {
    if (["Tidak bisa dibagi dengan 0", "Error"].includes(expression)) {
        expression = "";
    }

    let lastChar = expression.slice(-1);
    let operators = ["+", "-", "*", "/"];

    if (operators.includes(lastChar) && operators.includes(value) && value !== "-") {
        return;
    }

    expression += value;
    document.getElementById("display").innerText = expression;
}

function clearDisplay() {
    expression = "";
    document.getElementById("display").innerText = "0";
}

function backspace() {
    expression = expression.slice(0, -1);
    document.getElementById("display").innerText = expression.length > 0 ? expression : "0";
}

function calculateResult() {
    try {
        if (/\/0(?!\.\d)/.test(expression)) {
            throw new Error("Tidak bisa dibagi dengan 0");
        }
        
        if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
            throw new Error("Error");
        }
        
        let result = new Function("return " + expression)();
        document.getElementById("display").innerText = result;
        expression = result.toString();
    } catch (e) {
        document.getElementById("display").innerText = e.message;
        expression = "";
    }
}
