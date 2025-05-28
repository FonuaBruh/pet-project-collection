document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate');
    const lengthInput = document.getElementById('length');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');

    function generatePassword() {
        const length = parseInt(lengthInput.value);
        const hasUppercase = uppercaseCheckbox.checked;
        const hasLowercase = lowercaseCheckbox.checked;
        const hasNumbers = numbersCheckbox.checked;
        const hasSymbols = symbolsCheckbox.checked;

        let chars = '';
        
        if (hasUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (hasLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (hasNumbers) chars += '0123456789';
        if (hasSymbols) chars += '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

        if (!chars) {
            alert('Выберите хотя бы один набор символов!');
            return '';
        }

        let password = '';
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }

        return password;
    }

    generateBtn.addEventListener('click', function() {
        passwordInput.value = generatePassword();
    });

    copyBtn.addEventListener('click', function() {
        if (!passwordInput.value) return;
        
        passwordInput.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Скопировано!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    generateBtn.click();
});