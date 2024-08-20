const passwordBox = document.getElementById("password");
const copyMessage = document.getElementById("copyMessage");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbols = "@#$%^&*()+-_=?<>/|{}[]";
const similarChars = "iI1loO0";

function createPassword() {
  const length = document.getElementById("length").value;
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

  // Show the "Copied!" message
  copyMessage.style.display = "block";

  // Hide the message after 2 seconds
  setTimeout(() => {
    copyMessage.style.display = "none";
  }, 2000);
}
