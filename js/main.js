"use strict";

// VARIABLES
const linesElement = document.querySelector(".hello-header__lines");
const menuContainer = document.querySelector(".hello-menu");
const bodyContainer = document.querySelector("body");

// FUNCTIONS
const toggleMenuVisibility = () => {
  menuContainer.classList.toggle("hidden");
  bodyContainer.classList.toggle("active");
};

// LISTENERS
linesElement.addEventListener("click", toggleMenuVisibility);
