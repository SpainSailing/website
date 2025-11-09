// Popup variables

async function toggleSpinner(response) {
  document.querySelector(".spinner-container").classList.toggle("active");
  if (response != undefined) {
    alert(response);
    location.reload();
  }
}

// Subscribe response
$(document).ready(function () {
  $("#subscribe").on("submit", function (e) {
    e.preventDefault();

    toggleSpinner();

    var formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "assets/php/subscribe.php",
      data: formData,
      success: function (response) {
        toggleSpinner(response);
      },
    });
  });
});

// Carousel

function setupCarousels() {
  const carousels = document.querySelectorAll(".carousel-container");
  carousels.forEach((carousel) => {
    carouselSetup(carousel.id);
  });
  console.log("hello");
}

function createDots(container, itemCount, carouselId) {
  // Create dots
  const dotsContainer = container.querySelector(".dots");
  dotsContainer.innerHTML = ""; // Clear any existing dots

  for (let i = 0; i < itemCount; i++) {
    const newDot = document.createElement("div");
    newDot.id = `${carouselId}-dot-${i}`;
    dotsContainer.appendChild(newDot);
  }
  if (document.querySelectorAll(".carousel-item").length != 0) {
    activeDot(carouselId, itemCount);
  }
}

function carouselSetup(carouselId) {
  const container = document.getElementById(carouselId);
  const items = container.querySelectorAll(".carousel-item"); // Get all carousel items in this specific carousel
  const itemCount = items.length;

  items.forEach((item, index) => {
    if (index === 0) item.classList.add("before");
    if (index === 1) item.classList.add("current");
    if (index === 2) item.classList.add("after");
  });

  createDots(container, itemCount, carouselId);
}

function back(carouselId) {
  const container = document.getElementById(carouselId);
  const items = container.querySelectorAll(".carousel-item"); // Get all carousel items in this specific carousel
  const itemCount = items.length;

  container.querySelector(".after").classList.remove("after");
  container.querySelector(".current").classList.replace("current", "after");
  container.querySelector(".before").classList.replace("before", "current");

  let currentId = parseInt(container.querySelector(".current").id);
  let nextId = currentId - 1 >= 0 ? currentId - 1 : itemCount - 1;
  container
    .querySelector(`.carousel-item[id="${nextId}"]`)
    .classList.add("before");

  activeDot(carouselId, itemCount);
}

function next(carouselId) {
  const container = document.getElementById(carouselId);
  const items = container.querySelectorAll(".carousel-item"); // Get all carousel items in this specific carousel
  const itemCount = items.length;

  container.querySelector(".before").classList.remove("before");
  container.querySelector(".current").classList.replace("current", "before");
  container.querySelector(".after").classList.replace("after", "current");

  let currentId = parseInt(container.querySelector(".current").id);
  let prevId = currentId + 1 <= itemCount - 1 ? currentId + 1 : 0;
  container
    .querySelector(`.carousel-item[id="${prevId}"]`)
    .classList.add("after");

  activeDot(carouselId, itemCount);
}

function activeDot(carouselId, itemCount) {
  const container = document.getElementById(carouselId);

  for (let i = 0; i < itemCount; i++) {
    const dot = container.querySelector(`#${carouselId}-dot-${i}`);
    if (dot) {
      dot.style.backgroundColor = "#fff";
    }
  }

  const currentDot = container.querySelector(
    `#${carouselId}-dot-${parseInt(container.querySelector(".current").id)}`
  );
  if (currentDot) {
    currentDot.style.backgroundColor = "#888";
  }
}

// Loading page
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("tour")) {
    //Carousels tour page
    const carouselContainer = document.querySelectorAll(".carousel-container");
    carouselContainer.forEach((carouselContainer, index) => {
      carouselSetup("carousel-" + index);
    });
  }

  const hamburgerButton = document.getElementById("hamburgerButton");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  hamburgerButton.addEventListener("click", function () {
    document.querySelector(".fa-bars").classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
  });

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    tile.addEventListener("click", function () {
      popupToggle(true, index); // Call your popupToggle function on click
    });
  });
});
