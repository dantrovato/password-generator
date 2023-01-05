// Array of special characters to be included in password
const specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

// Array of numeric characters to be included in password
const numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// These are constants that we use within the helper function `numOfCharsIsValid()`.
const minNumOfChars = 10;
const maxNumOfChars = 64;

// Message to use while prompting about password length.
const enterLengthMessage =
  "Enter number of charachers you'd want your password to be. Pick a number between 10 and 64";

// Helper function to validate user input.
// Makes sure they enter the correct number of characters.
function numOfCharsIsValid(userInput) {
  // Explicitly conver userInput to a number - this is not needed but it's good practice.
  const num = Number(userInput);
  return num >= minNumOfChars && num <= maxNumOfChars;
}

// Helper function to abstract logic from `getPasswordOptions()` in getting length of password.
function getPasswordLength() {
  let lengthOfPassword = prompt(enterLengthMessage);

  while (!numOfCharsIsValid(lengthOfPassword)) {
    alert("What did I just say about this number??");
    lengthOfPassword = prompt(enterLengthMessage);
  }

  alert("Atta gender neutral teen");
  return lengthOfPassword;
}

// Helper function to getCharacterTypes() that tells us if the user picked no option.
function noCharChosen(choices) {
  return choices.filter((choice) => choice).length === 0;
}

// Helper function to bstract logic from `getPasswordOptions()` in getting the types of characters.
function getCharacters() {
  let special;
  let numbers;
  let lowercase;
  let uppercase;

  // The while loop keeps asking the user to keep an option until at least one is selected.
  while (noCharChosen([special, numbers, lowercase, uppercase])) {
    alert(
      "You have a choice of characters to choose from. Pick at least one of the following four choices. You may pick all of them."
    );
    special = confirm(
      "Shall your password contain a special character like a * or a #?"
    );
    numbers = confirm("Shall your password contain a number?");
    lowercase = confirm("Shall your password contain a lowercase letter?");
    uppercase = confirm("Shall your password contain an uppercase letter?");
  }

  // Array of arrays for all the possible characters.
  const characters = [
    specialCharacters,
    numericCharacters,
    lowerCasedCharacters,
    upperCasedCharacters,
  ];

  // Array of the options the user selected. Each option will either be true or false
  const types = [special, numbers, lowercase, uppercase];

  // Returns an array within an array containing all the characters that can be used in the password.
  // We use the flat() method to extract the subarray.
  return characters.filter((char, index) => types[index]).flat(); // array
}

// Function to prompt user for password options
function getPasswordOptions() {
  const length = getPasswordLength();
  const characters = getCharacters(); // characters are placed in an array
  generatePassword(length, characters);
}

// Function for getting a random element from an array
function getRandom(arr) {
  return Math.floor(Math.random() * arr.length);
}

// Function to generate password with user choices
function generatePassword(length, characters) {
  let password = "";
  while (password.length <= length) {
    const index = Math.floor(Math.random() * characters.length);
    password += characters[index];
  }

  writePassword(password);
}

// Get references to the #generate element
const generateBtn = document.querySelector("#generate"); // button

// Write password to the #password input
function writePassword(password) {
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);
generateBtn.addEventListener("click", getPasswordOptions);
