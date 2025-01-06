"use strict";

// VARIABLES
const linesElement = document.querySelector(".hello-header__lines");
const menuContainer = document.querySelector(".hello-menu");
const bodyContainer = document.querySelector("body");

const startContainer = document.querySelector(".hello-start");
const buttonBeginningElement = document.querySelector(".btn--beginning");
const buttonStandingsElement = document.querySelector(".btn--standings");
const standingsContainer = document.querySelector(".hello-standings");

const buttonPlayElement = document.querySelector(".hello-start__btn.btn--play");
const gameContainer = document.querySelector(".hello-game");

const timerElement = document.querySelector(".hello-game__timer-time");

const cardsElement = document.querySelector(".hello-game__cards");

const windows = [startContainer, gameContainer, standingsContainer];

let timeLeft = 60;
let timerId;

// FUNCTIONS
// Функция переключения видимости меню
const toggleMenuVisibility = () => {
  menuContainer.classList.toggle("hidden");
  bodyContainer.classList.toggle("active");
};

// Функция перенаправления на стартовую страницу с кнопок
const redirectToIndex = () => {
  location.href = "index.html";
};

// Функция перенаправления на стартовую страницу из меню
const showStartsWindow = () => {
  redirectToIndex();
  toggleMenuVisibility();
  if (startContainer) {
    startContainer.classList.add("hidden");
  }
};

// Функция показа окна с турнирной таблицей
const showStandingsWindow = () => {
  toggleMenuVisibility();

  windows.forEach((window) => {
    if (window && window !== standingsContainer) {
      window.classList.add("hidden");
    }
  });

  if (standingsContainer) {
    standingsContainer.classList.remove("hidden");
  }
};

// Функция обработки нажатия кнопки "начать игру"
const startGame = () => {
  startContainer.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  startTimer();
  displayCards();
};

// Функция для запуска таймера
const startTimer = () => {
  if (!timerId) {
    timerId = setInterval(() => {
      timeLeft--;
      updateTimer();
    }, 1000);
  }
};

// Функция для обновления таймера на странице
const updateTimer = () => {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  if (timerElement) {
    timerElement.textContent = `${minutes}:${seconds}`;
  }

  if (timeLeft <= 0) {
    clearInterval(timerId);
    // переход на страницу завершения игры
  }
};

// Функция для перемешивание колоды с использованием алгоритма Фишера — Йетса
const shuffleArray = (array) => {
  if (!array || array.length === 0) {
    return array;
  }

  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
};

// Функция для отображения колоды карт
const displayCards = () => {
  const shuffledCards = shuffleArray(cards);
  console.log("🚀 ~ displayCards ~ cards:", cards);

  cardsElement.innerHTML = shuffledCards
    .map((card, index) => {
      return `<img class="hello-game__card" src="${card.img}" alt="card" style="z-index: ${
        shuffledCards.length - index
      };">`;
    })
    .join("");
};

// LISTENERS
linesElement.addEventListener("click", toggleMenuVisibility);
buttonBeginningElement.addEventListener("click", showStartsWindow);
buttonStandingsElement.addEventListener("click", showStandingsWindow);
buttonPlayElement.addEventListener("click", startGame);
