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

// LISTENERS
linesElement.addEventListener("click", toggleMenuVisibility);
buttonBeginningElement.addEventListener("click", showStartsWindow);
buttonStandingsElement.addEventListener("click", showStandingsWindow);
buttonPlayElement.addEventListener("click", startGame);
