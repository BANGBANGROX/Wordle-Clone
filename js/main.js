document.addEventListener("DOMContentLoaded", () => {
  const genrateRandomWord = () => {
    const letters = [
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
    let word = "";

    for (let i = 0; i < 5; ++i) {
      const letter = letters[Math.floor(Math.random() * 25)];
      word += letter;
    }

    console.log(word);

    return word;
  };

  const createSquares = () => {
    const gameBoard = document.getElementById("board");

    for (let i = 0; i < 30; ++i) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", i + 1);
      gameBoard.appendChild(square);
    }
  };

  createSquares();

  const guessedWords = [[]];
  let availableSpace = 1;
  const word = genrateRandomWord();
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

  const getCurrentWordsArr = () => {
    const numberOfGuessedWords = guessedWords.length;

    return guessedWords[numberOfGuessedWords - 1];
  };

  const updateGuessedWords = (letter) => {
    const currentWordArr = getCurrentWordsArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));
      ++availableSpace;

      availableSpaceEl.textContent = letter;
    }
  };

  const deleteGuessedWords = () => {
    const currentWordArr = getCurrentWordsArr();

    if (currentWordArr && currentWordArr.length > 0) {
      currentWordArr.pop();

      --availableSpace;
      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpaceEl.textContent = "";
    }
  };

  const getTileColor = (letter, ind) => {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }

    const letterInThatPosition = word.charAt(ind);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }

    return "rgb(181, 159, 59)";
  };

  const handleSubmit = () => {
    const currentWordArr = getCurrentWordsArr();

    if (currentWordArr.length !== 5) {
      window.alert("Word must be 5 letters");
    }

    const currentWord = currentWordArr.join("");

    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 200;

    currentWordArr.forEach((letter, ind) => {
      setTimeout(() => {
        const tileColor = getTileColor(letter, ind);
        const letterId = firstLetterId + ind;
        const letterEl = document.getElementById(letterId);

        letterEl.classList.add("animate__flipInX");
        letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
      }, interval * ind);
    });

    ++guessedWordCount;

    if (currentWord === word) {
      window.alert("Congrats!");
    }

    if (guessedWords.length === 6) {
      window.alert(`Sorry, you have no more guesses! The word is ${word}`);
    }

    guessedWords.push([]);
  };

  for (let i = 0; i < keys.length; ++i) {
    keys[i].onclick = ({ target }) => {
      const key = target.getAttribute("data-key");

      console.log(key);

      if (key === "enter") {
        handleSubmit();
        return;
      }

      if (key === "del") {
        deleteGuessedWords();
      } else {
        updateGuessedWords(key);
      }
    };
  }
});
