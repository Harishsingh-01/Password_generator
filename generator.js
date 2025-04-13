const passwordbox = document.getElementById("inputbox");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const copyBtn = document.getElementById("copyBtn");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// Update length value display
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

// Copy password to clipboard
copyBtn.addEventListener("click", () => {
    if (passwordbox.value) {
        passwordbox.select();
        document.execCommand("copy");
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    }
});

function createpassword() {
    let password = "";
    let chars = "";
    
    // Get selected character types
    if (uppercaseCheckbox.checked) chars += uppercase;
    if (lowercaseCheckbox.checked) chars += lowercase;
    if (numbersCheckbox.checked) chars += numbers;
    if (symbolsCheckbox.checked) chars += symbols;
    
    // Ensure at least one character type is selected
    if (chars === "") {
        alert("Please select at least one character type!");
        return;
    }
    
    const length = parseInt(lengthSlider.value);
    
    // Ensure at least one character from each selected type
    if (uppercaseCheckbox.checked) {
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
    }
    if (lowercaseCheckbox.checked) {
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
    }
    if (numbersCheckbox.checked) {
        password += numbers[Math.floor(Math.random() * numbers.length)];
    }
    if (symbolsCheckbox.checked) {
        password += symbols[Math.floor(Math.random() * symbols.length)];
    }
    
    // Fill the rest of the password
    while (password.length < length) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    // Display the password with animation
    passwordbox.value = "";
    let i = 0;
    const interval = setInterval(() => {
        if (i < password.length) {
            passwordbox.value += password[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 50);
}