function calculate() {
    const conversionType = document.getElementById("conversionType").value;
    const inputValue = document.getElementById("inputValue").value.trim();
    const resultElement = document.getElementById("result");

    if (!inputValue) {
        resultElement.textContent = "Пожалуйста, введите значение";
        return;
    }

    try {
        let result;

        if (conversionType === "binToDec") {
            if (!/^[01]+$/.test(inputValue)) {
                throw new Error("Двоичное число должно содержать только 0 и 1");
            }

            result = parseInt(inputValue, 2);
        } else {
            if (!/^\d+$/.test(inputValue)) {
                throw new Error(
                    "Десятичное число должно содержать только цифры"
                );
            }

            result = Number(inputValue).toString(2);
        }

        resultElement.textContent = result;
    } catch (error) {
        resultElement.textContent = "Ошибка: " + error.message;
    }
}
