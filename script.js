const passwordBox = document.getElementById("password");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbols = "@#$%^&*()+-_=?<>/|{}[]";
const similarChars = "iI1loO0";

const lengthDisplay = document.getElementById("lengthDisplay");
const lengthSlider = document.getElementById("lengthSlider");

// Update the password length display when the slider is adjusted
lengthSlider.oninput = function () {
  lengthDisplay.textContent = this.value;
};

function createPassword() {
  const length = lengthSlider.value;
  const includeSymbols = document.getElementById("includeSymbols").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeLowercase = document.getElementById("includeLowercase").checked;
  const includeUppercase = document.getElementById("includeUppercase").checked;
  const excludeDuplicates =
    document.getElementById("excludeDuplicates").checked;
  const excludeSimilar = document.getElementById("excludeSimilar").checked;

  let availableChars = "";

  if (includeUppercase) availableChars += upperCase;
  if (includeLowercase) availableChars += lowerCase;
  if (includeNumbers) availableChars += number;
  if (includeSymbols) availableChars += symbols;

  if (excludeSimilar) {
    availableChars = availableChars
      .split("")
      .filter((char) => !similarChars.includes(char))
      .join("");
  }

  // Check if availableChars is empty or length is 0 or less
  if (availableChars.length < 1) {
    passwordBox.value =
      "Unable to create a password with 1 or fewer available characters";
    return;
  }

  let password = "";
  const usedChars = {};

  for (let i = 0; i < length; i++) {
    let randomChar =
      availableChars[Math.floor(Math.random() * availableChars.length)];

    if (excludeDuplicates && usedChars[randomChar]) {
      i--;
      continue;
    }

    password += randomChar;
    usedChars[randomChar] = true;
  }

  passwordBox.value = password;
}

function copyPassword() {
  passwordBox.select();
  document.execCommand("copy");

  // Show "Copied!" notification
  const copiedNotification = document.createElement("div");
  copiedNotification.innerText = "Copied!";
  copiedNotification.classList.add("copied-notification");

  document.body.appendChild(copiedNotification);

  // Remove the notification after 1.5 seconds
  setTimeout(() => {
    copiedNotification.remove();
  }, 1500);
}
