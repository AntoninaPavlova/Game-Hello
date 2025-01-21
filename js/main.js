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
const buttonYesElement = document.querySelector(".variant-yes");
const buttonNoElement = document.querySelector(".variant-no");
const pointsElement = document.querySelector(".hello-game__csores-points");
const currentNumberElement = document.querySelector(".hello-game__current");
const totalElement = document.querySelector(".hello-game__total");
const resultContainer = document.querySelector(".hello-result");
const numberElement = document.querySelector(".hello-result__number");
const promocodeElement = document.querySelector(".hello-result__promocode");
const promotextElement = document.querySelector(".hello-result__promotext");
const startOverBtnElement = document.querySelector(".hello-result__btn.btn--play");
const buttonRegistrateElement = document.querySelector(".btn--registrate");
const registrationContainer = document.querySelector(".hello-registration");
const buttonFindOutResultElement = document.querySelectorAll(".btn--find-out-result");
const findOutResultContainer = document.querySelector(".hello-find-out-result");
const buttonReceiveCardElement = document.querySelectorAll(".btn--receive");
const receiveCardContainer = document.querySelector(".hello-app");

const windows = [
  startContainer,
  gameContainer,
  resultContainer,
  registrationContainer,
  standingsContainer,
  findOutResultContainer,
  receiveCardContainer,
];

let timeLeft = 10;
let timerId;
let currentIndex = 0;
let points = 0;
let promoCode = "";
let promoText = "";
let isTouchStart = false;
let swipe = 0;
let prevTouch = null;

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
  updatePoints();
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
    overGame();
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

  cardsElement.innerHTML = shuffledCards
    .map((card, index) => {
      return `<img class="hello-game__card" src="${card.img}" alt="card" style="z-index: ${
        shuffledCards.length - index
      };">`;
    })
    .join("");
};

// Функция для обработки клика вправо
const handleYesButtonClick = () => {
  if (currentIndex < cards.length) {
    if (cards[currentIndex].answer === true) {
      points++;
    }

    animateCardRight();

    setTimeout(() => {
      currentIndex++;
      updateCard();
      updatePoints();
    }, 400);
  }
};

// Функция для обработки клика влево
const handleNoButtonClick = () => {
  if (currentIndex < cards.length) {
    if (cards[currentIndex].answer === false) {
      points++;
    }

    animateCardLeft();

    setTimeout(() => {
      currentIndex++;
      updateCard();
      updatePoints();
    }, 400);
  }
};

// Функция для анимации карты вправо
const animateCardRight = () => {
  const cardElement = document.querySelector(".hello-game__card");
  if (cardElement) {
    cardElement.classList.add("slide-out-right");

    cardElement.addEventListener("animationend", () => {
      cardElement.classList.remove("slide-out-right");
    });
  }
};

// Функция для анимации карты влево
const animateCardLeft = () => {
  const cardElement = document.querySelector(".hello-game__card");
  if (cardElement) {
    cardElement.classList.add("slide-out-left");

    cardElement.addEventListener("animationend", () => {
      cardElement.classList.remove("slide-out-left");
    });
  }
};

// Функция для удаления карты
const deleteCard = () => {
  const cardElement = document.querySelector(".hello-game__card");
  if (cardElement) {
    cardElement.remove();
  }
};

// Функция для обновления текущей карты
const updateCard = () => {
  deleteCard();
  if (currentIndex < cards.length) {
    updateQuantityСards();
  } else {
    overGame();
  }
};

// Функция для обновления баллов
const updatePoints = () => {
  if (pointsElement && numberElement) {
    pointsElement.textContent = points;
    numberElement.textContent = points;
  }
};

// Функция для обновления количества карточек
const updateQuantityСards = () => {
  if (currentNumberElement && totalElement) {
    currentNumberElement.textContent = currentIndex + 1;
    totalElement.textContent = cards.length;
  }
};

// Функция для завершения игры
const overGame = () => {
  clearInterval(timerId);

  if (gameContainer && resultContainer) {
    gameContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
  }

  showTicket();
};

//  Функция отображает, какой промокод и текст должны быть показаны на экране в зависимости от количества набранных очков
const showTicket = () => {
  if (points >= 0 && points < 10 && ticket) {
    promoCode = ticket[10].promocode;
    promoText = ticket[10].promotext;
  } else if (points >= 10 && points < 30 && ticket) {
    promoCode = ticket[30].promocode;
    promoText = ticket[30].promotext;
  } else if (points >= 30 && points < 50 && ticket) {
    promoCode = ticket[50].promocode;
    promoText = ticket[50].promotext;
  } else if (points >= 50 && points < 70 && ticket) {
    promoCode = ticket[70].promocode;
    promoText = ticket[70].promotext;
  }

  if (promocodeElement && promotextElement) {
    promocodeElement.innerHTML = promoCode;
    promotextElement.innerHTML = promoText;
  }
};

// Функция показа окна с регистрацией
const showRegistrationWindow = () => {
  if (resultContainer && registrationContainer) {
    resultContainer.classList.add("hidden");
    registrationContainer.classList.remove("hidden");
  }
};

// Функция показа окна с очками
const showPointsWindow = () => {
  windows.forEach((window) => {
    if (window && window !== findOutResultContainer) {
      window.classList.add("hidden");
    }
  });

  if (findOutResultContainer) {
    findOutResultContainer.classList.remove("hidden");
  }
};

// Функция показа окна с ссылками на приложения
const showAppWindow = () => {
  windows.forEach((window) => {
    if (window && window !== receiveCardContainer) {
      window.classList.add("hidden");
    }
  });

  if (receiveCardContainer) {
    receiveCardContainer.classList.remove("hidden");
  }
};

// Функция вызывается, когда начинается нажатие мыши или касание экрана.
const handleMouseDown = (e) => {
  if (e.touches === undefined) {
    e.preventDefault();
  }
  isTouchStart = true;
  prevTouch = e.type === "mousedown" ? { pageX: e.pageX } : { pageX: e.touches[0].pageX };
};

// Функция вызывается, когда заканчивается нажатие мыши или касание экрана.
const handleMouseUp = (e) => {
  isTouchStart = false;

  if (swipe > 50) {
    handleYesButtonClick();
  } else if (swipe < -50) {
    handleNoButtonClick();
  }

  swipe = 0;
  prevTouch = null;
};

// Функция вызывается, когда происходит движение мыши.
const handleMouseMove = (e) => {
  if (isTouchStart) {
    swipe += e.movementX || 0;
  }
};

// Функция вызывается, когда происходит движение касания.
const handleTouchMove = (e) => {
  const touch = e.touches[0];

  if (prevTouch && isTouchStart) {
    e.movementX = Math.trunc(touch.pageX - prevTouch.pageX);
    swipe += e.movementX || 0;
  }

  prevTouch = touch;
};

// LISTENERS
linesElement.addEventListener("click", toggleMenuVisibility);
buttonBeginningElement.addEventListener("click", showStartsWindow);
buttonStandingsElement.addEventListener("click", showStandingsWindow);
buttonPlayElement.addEventListener("click", startGame);
buttonYesElement.addEventListener("click", handleYesButtonClick);
buttonNoElement.addEventListener("click", handleNoButtonClick);
startOverBtnElement.addEventListener("click", redirectToIndex);
buttonRegistrateElement.addEventListener("click", showRegistrationWindow);
buttonFindOutResultElement.forEach((button) => {
  button.addEventListener("click", showPointsWindow);
});
buttonReceiveCardElement.forEach((button) => {
  button.addEventListener("click", showAppWindow);
});
cardsElement.addEventListener("mousedown", handleMouseDown);
cardsElement.addEventListener("mouseup", handleMouseUp);
cardsElement.addEventListener("mousemove", handleMouseMove);
cardsElement.addEventListener("touchstart", handleMouseDown);
cardsElement.addEventListener("touchend", handleMouseUp);
cardsElement.addEventListener("touchmove", handleTouchMove);
