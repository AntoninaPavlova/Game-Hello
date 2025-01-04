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

const windows = [startContainer, gameContainer, standingsContainer];

// FUNCTIONS
// Функция переключения видимости меню
const toggleMenuVisibility = () => {
  menuContainer.classList.toggle("hidden");
  bodyContainer.classList.toggle("active");
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
};

// Функция перенаправления на стартовую страницу с кнопок
const redirectToIndex = () => {
  location.href = "index.html";
};

// LISTENERS
linesElement.addEventListener("click", toggleMenuVisibility);
buttonBeginningElement.addEventListener("click", showStartsWindow);
buttonStandingsElement.addEventListener("click", showStandingsWindow);
buttonPlayElement.addEventListener("click", startGame);
