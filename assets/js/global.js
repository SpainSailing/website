// Popup variables
const popupContainer = document.querySelector(".popups");
const popupOverlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");
var discount = 0;

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

// Discount response
$(document).ready(function () {
  $("#discountForm").on("submit", function (e) {
    e.preventDefault();

    toggleSpinner();

    var formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "assets/php/discount.php",
      data: formData,
      success: function (response) {
        discount = response;
        if (discount == 0) {
          alert("Incorrect code!");
        } else {
          alert("Correct code!");
        }
        toggleSpinner();
        addPrice();
      },
    });
  });
});

// Homepage popup toggles

const title = document.getElementById("title");
const text = document.getElementById("text");
const insertCarousel = document.getElementById("carousel-1");
let carouselHtml = "";

const components = [
  {
    title: "OUR YACHT",
    text: "Our yacht 'Marta' is a 42ft Beneteau Oceanis Clipper 423 sailing cruiser with excellent all-round performance to optimise our guests' sailing experience. In the spacious well-lit area below deck there are three double cabins for our guests and an additional cabin for the skipper. The two rear cabins have en-suite shower rooms with WC and wash-hand basin; the third cabin shares these facilities with the skipper. The well-equipped galley has a two-burner gas hob and oven. Meals taken on the yacht are self-catered. However, for guests' convenience breakfast essentials and light snacks will be readily available. It is anticipated that most guests will choose to have lunch and/or dinner whilst on shore.",
    images: [
      "assets/images/marta_sailing2.webp",
      "assets/images/marta_sailing3.webp",
      "assets/images/marta_saloon.webp",
      "assets/images/marta_galley.webp",
      "assets/images/marta_combarro_marina.webp",
      "assets/images/marta_cabin_fwd.webp",
      "assets/images/marta_heads_fwd.webp",
      "assets/images/marta_cabin_port.webp",
      "assets/images/marta_heads_port.webp",
      "assets/images/marta_stbaftcabin.webp",
      "assets/images/marta_heads_stb.webp",
      "assets/images/marta_bow_combarro.webp",
    ],
    captions: [
      "Marta tacking",
      "Marta",
      "Marta's comfortable, light and spacious saloon",
      "Marta's galley has a large fridge and a gas hob/oven",
      "Moored in Combarro marina",
      "The forward cabin",
      "The forward heads (bathroom with toilet, sink and shower)",
      "The port cabin",
      "The port cabin heads (bathroom with toilet, sink and shower)",
      "The starboard cabin",
      "The starboard cabin heads (toilet, sink and shower)",
      "Marta in Combarro marina",
    ],
  },
  {
    title: "THE SKIPPER",
    text: "Your highly experienced skipper is rated RYA Yachtmaster Instructor with many years teaching at sailing schools across the globe. Aside from this Tom has sailed to South America, crossed the Atlantic single-handed and competed in the hugely challenging Fastnet Race. Residing in Galicia, Tom is very familiar with the Rias Baixas region and speaks Spanish fluently. As skipper, he will ensure your safety at sea whilst also assisting with your choice of onshore excursions. Guests will usually be content to leave Tom at the helm while they relax and enjoy life at sea on board our beautiful yacht. Should anyone be looking for hands-on sailing experience, they will find Tom very receptive to providing instruction whenever the itinerary and conditions permit. In short - Tom's mission is to provide a 'cruising in miniature' experience that makes this a holiday with a difference.",
    images: [
      "assets/images/tom_bad_weather.webp",
      "assets/images/tom_instructs_yacht.webp",
      "assets/images/tom_cabin_yacht.webp",
      "assets/images/tom_explores_cies.webp",
      "assets/images/tom_marta_atlantic.webp",
      "assets/images/baiona_restaurant.webp",
      "assets/images/tom_explores_near_combarro.webp",
      "assets/images/tom_explores_museum.webp",
      "assets/images/tom_instructing_sailing.webp",
      "assets/images/tom_instructing_yacht.webp",
      "assets/images/tom_meal_restaurant.webp",
      "assets/images/tom_relaxes_marina.webp",
      "assets/images/tom_relaxing_on_board.webp",
      "assets/images/tom_showing_the_ropes.webp",
      "assets/images/tom_yacht_combarro.webp",
      "assets/images/tom_yacht_instruction.webp",
      "assets/images/tom_tambo.webp",
    ],
    captions: [
      "He's even cheerful in bad weather!",
      "Tom loves it when our guests want to have a go at sailing",
      "On board",
      "Just checking the sea conditions!",
      "Bringing Marta across the Atlantic Ocean",
      "Hiding in the crowd at the pulpo restaurant near Baiona",
      "One of many walks from the Combarro marina",
      "In the museum of the sea at Bueu, Ria de Pontevedra",
      "Tom is a calm and competent sailing instructor",
      "Tom instructing sailing",
      "He is sometimes invited out with our guests",
      "Moored up and time to relax",
      "Intructing sailing can be very had work!",
      "Tom showing everyone the ropes",
      "Tom in Combarro marina",
      "Many of our guests are keen to learn a bit about sailing",
      "Drifting past Tambo Island in a gentle breeze",
    ],
  },
  {
    title: "TOUR SUMMARY",
    text: "Starting and finishing in the wonderful historic town of Combarro, our Rias Baixas summer tours are 5 or 6 nights long. On a tour full of contrasts we will visit beautiful Baiona, a relaxed, well-to-do and slightly old-fashioned resort. We will also spend nights at anchor off incredible beaches, bays and islands. Our favourites include Barra Beach with its beautiful sandy beach and walks around the three Cabo Home lighthouses and the Celtic settlements, the Cies Islands with the most stunning beaches and scenery, and the bay of Aldan, with its quiet villages and atmospheric walk through the 'enchanted forest'. The tour includes your accommodation onboard, all costs to do with the boat, breakfast and snacks, and your skipper, Tom. You are free to use the yacht's well-equipped galley and there are fantastic bars, restaurants and supermarkets throughout the Rias Baixas area. You will have to make your way to and from Combarro but we are happy to help. We can be a little bit flexible on dates and tour lengths if needed.<br><a style='color: white;' href='tour.html'>Find out more...</a>", images: [
      "assets/images/rias_pop_view.webp",
      "assets/images/combarro_seafront.webp",
      "assets/images/baiona_from_the_castle.webp",
      "assets/images/rias_baixas_picture_resized.webp",
      "assets/images/rias_baixas_cabo_home1.webp",
      "assets/images/anchor_barra_pine.webp",
      "assets/images/rias_baixas_sunset.webp",
      "assets/images/rias_baixas_sign_santiago.webp",
      "assets/images/rias_pop_cies.webp",
      "assets/images/rias_pop_ons.webp",
      "assets/images/rb_walk_vilagarcia.webp",
      "assets/images/rias_baixas_cabo_lighthouse2.webp",
      "assets/images/combarro_marina.webp",
    ],
    captions: [
      "The Cies Islands viewed from Baiona's Monterreal Castle",
      "Our tours begin and end here in Combarro",
      "We will visit Baiona",
      "Combarro-Anchorage-Baiona-Anchorage-Combarro",
      "One of three lighthouses you can walk to from Barra Beach",
      "At anchor off Barra Beach",
      "The Cies Islands from Cabo Home",
      "The wonderful city of Santiago de Compostela is nearby",
      "Looking across the Cies Islands to the mainland",
      "The Burato do Inferno cave on Ons Island",
      "There are lots of places to go walking",
      "Another of Cabo Home's lighthouses",
      "Combarro marina",
    ],
  },
  {
    title: "ABOUT SPAIN SAILING",
    text: "Spain Sailing is a partnership between brothers Tom and Ed White. Tom skippers all the tours on our yacht 'Marta' while Ed looks after the business side. Originally from land-locked Leicestershire, Tom now lives in Rias Baixas in Galicia, and speaks fluent Spanish. He has many years of experience teaching sailing and he knows the Rias Baixas area well. He is rated RYA Yachtmaster Instructor and has worked in sailing schools around the world. His sailing experiences include crossing the Atlantic single-handed, and competing in the Fastnet Race. Ed lives with his family in Lincolnshire, UK and his background is in business and engineering. He is relatively new to sailing but has sailed 1,000 miles from the Azores to Spain (in Marta). Ed's son Tom (a different Tom!) develops and looks after the website.<br><a style='color: white;' href='contact.html'>Contact us...</a>",
    images: [
      "assets/images/tom_yacht_combarro.webp",
      "assets/images/combarro_marina2.webp",
      "assets/images/food_attis_winery1.webp",
      "assets/images/marta_just_arrived.webp",
      "assets/images/marta_sailing1.webp",
      "assets/images/rias_pontevedra.webp",
      "assets/images/portrait.webp",
    ],
    captions: [
      "Tom in Combarro",
      "Spain Sailing's home marina in Combarro",
      "Spain Sailing are happy to recommend some excellent wineries to visit",
      "Tom and Ed with Lydia having just arrived in Combarro after crossing 1000 miles of the Atlantic",
      "Our beautiful yacht Marta",
      "Pontevedra, near Combarro, is the region's capital",
      "Tom and Ed in the Cies Islands",
    ],
  },
];

function popupToggle(open, index) {
  if (open) {
    // Change popup text and carousel
    // Text
    title.innerHTML = components[index].title;
    text.innerHTML = components[index].text;

    // Carousel images
    // First three
    carouselHtml +=
      '<div class="carousel-item before" id="0"><img src="' +
      components[index].images[0] +
      '" alt="Poio near Combarro"><div class="caption">' +
      components[index].captions[0] +
      "</div></div>";

    carouselHtml +=
      '<div class="carousel-item current" id="1"><img src="' +
      components[index].images[1] +
      '" alt="Poio near Combarro"><div class="caption">' +
      components[index].captions[1] +
      "</div></div>";

    carouselHtml +=
      '<div class="carousel-item after" id="2"><img src="' +
      components[index].images[2] +
      '" alt="Poio near Combarro"><div class="caption">' +
      components[index].captions[2] +
      "</div></div>";

    for (let i = 0; i < components[index].images.length - 3; i++) {
      let j = i + 3; // Correct calculation of j
      carouselHtml +=
        '<div class="carousel-item" id="' +
        j +
        '"><img src="' +
        components[index].images[j] +
        '" loading="lazy"><div class="caption">' +
        components[index].captions[j] +
        "</div></div>";
    }

    insertCarousel.innerHTML += carouselHtml;

    carouselSetup("carousel-1");
  } else {
    // Remove current carousel images
    let carouselElements = document.querySelectorAll(".carousel-item");
    carouselElements.forEach((element) => {
      element.remove();
    });
    // Clear carouselHtml
    carouselHtml = "";
  }

  // Make the popup appear
  popupContainer.classList.toggle("active");
  popupOverlay.classList.toggle("active");
  popup.classList.toggle("active");
}

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

// Map
function dropdown() {
  const dropdownButtons = document.querySelectorAll(".dropdown-button");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dropdownItem = button.nextElementSibling;
      const arrowIcon = button.querySelector(".arrow");

      if (dropdownItem.classList.contains("shown")) {
        // Collapse the dropdown
        dropdownItem.style.height = `${dropdownItem.scrollHeight}px`; // Set to current height first
        requestAnimationFrame(() => {
          dropdownItem.style.height = "0px"; // Then transition to 0px
        });
        dropdownItem.classList.remove("shown");
        arrowIcon.classList.remove("rotated");
      } else {
        // Expand the dropdown
        dropdownItem.classList.add("shown");
        dropdownItem.style.height = "0px"; // Ensure it starts from 0px
        requestAnimationFrame(() => {
          dropdownItem.style.height = `${dropdownItem.scrollHeight}px`; // Transition to the full height
        });

        // After the transition ends, reset the height to auto
        dropdownItem.addEventListener(
          "transitionend",
          function onTransitionEnd() {
            if (dropdownItem.classList.contains("shown")) {
              dropdownItem.style.height = "auto";
            }
            dropdownItem.removeEventListener("transitionend", onTransitionEnd);
          }
        );
        arrowIcon.classList.add("rotated");
      }
    });
  });
}

function map() {
  // Initialize the map and set its view to Madrid
  var map = L.map("map").setView([40.4168, -3.7038], 5); // Center over Madrid

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Marker for the Rias Baixas
  var riasMarker = L.marker([42.363, -8.734]).addTo(map);
  riasMarker.bindPopup("<b>Rias Baixas</b>").openPopup();

  // Add markers for Combarro and Baiona
  var combarroMarker = L.marker([42.42783, -8.70422]);
  var baionaMarker = L.marker([42.120494, -8.844767]);

  // Define the provided route points
  var routePoints = [
    [42.42783, -8.70422],
    [42.4192, -8.7084],
    [42.387, -8.7568],
    [42.3683, -8.857],
    [42.3515, -8.8708],
    [42.257, -8.8879],
    [42.1727, -8.8797],
    [42.14921, -8.85241],
    [42.12841, -8.84022],
    [42.120494, -8.844767],
  ];

  // Function to interpolate points between two points
  function interpolate(p1, p2, steps) {
    const latStep = (p2[0] - p1[0]) / steps;
    const lngStep = (p2[1] - p1[1]) / steps;
    const points = [];

    for (let i = 0; i <= steps; i++) {
      points.push([p1[0] + latStep * i, p1[1] + lngStep * i]);
    }

    return points;
  }

  // Generate the smooth curve points
  var smoothPoints = [];
  const stepsBetweenPoints = 30; // Number of interpolated points between each pair

  for (let i = 0; i < routePoints.length - 1; i++) {
    const segmentPoints = interpolate(
      routePoints[i],
      routePoints[i + 1],
      stepsBetweenPoints
    );
    smoothPoints = smoothPoints.concat(segmentPoints.slice(0, -1)); // Avoid duplicate points
  }

  // Create a polyline for the route
  var polyline = L.polyline(smoothPoints, {
    color: "blue",
    weight: 2,
  });

  // Event listener for zoom changes
  map.on("zoomend", function () {
    var zoomLevel = map.getZoom(); // Get current zoom level
    if (zoomLevel >= 8) {
      map.removeLayer(riasMarker); // Remove the Rias Baixas marker from the map
      riasMarker.closePopup();
      combarroMarker.addTo(map); // Add the Combarro marker back to the map when zoomed out
      baionaMarker.addTo(map); // Add the Baiona marker back to the map when zoomed out
      polyline.addTo(map);
    } else {
      map.removeLayer(polyline);
      riasMarker.addTo(map);
      riasMarker.openPopup();
      map.removeLayer(combarroMarker); // Remove the Combarro marker from the map
      map.removeLayer(baionaMarker); // Remove the Baiona marker from the map
    }
  });
}

// Booking page price selector

const tours = [
  {
    date: "25th May 2025 -> 30th May 2025",
    configs: [
      "One person",
      "Two persons",
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [1425, 1890, 3700, 4100, 4500],
    booked: true,
  },
  {
    date: "1st June 2025 -> 7th June 2025",
    configs: [
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [4090, 4570, 5050],
    booked: true,
  },
  {
    date: "15th June 2025 -> 20th June 2025",
    configs: [
      "One person",
      "Two persons",
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [1475, 1950, 3800, 4200, 4600],
    booked: true,
  },
  {
    date: "22nd June 2025 -> 28th June 2025",
    configs: [
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [4180, 4660, 5140],
    booked: true,
  },
  {
    date: "6th July 2025 -> 11th July 2025",
    configs: [
      "One person",
      "Two persons",
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [1525, 2070, 4100, 4500, 4900],
    booked: true,
  },
  {
    date: "13th July 2025 -> 19th July 2025",
    configs: [
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [4510, 4990, 5470],
    booked: true,
  },
  {
    date: "27th July 2025 -> 1st August 2025",
    configs: [
      "One person",
      "Two persons",
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [1555, 2110, 4100, 4500, 4900],
    booked: false,
  },
  {
    date: "3rd August 2025 -> 9th August 2025",
    configs: [
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [4510, 4990, 5470],
    booked: false,
  },
  {
    date: "17th August 2025 -> 22nd August 2025",
    configs: [
      "One person",
      "Two persons",
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [1555, 2110, 4100, 4500, 4900],
    booked: false,
  },
  {
    date: "24th August 2025 -> 30th August 2025",
    configs: [
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [4510, 4990, 5470],
    booked: false,
  },
  {
    date: "7th September 2025 -> 12th September 2025",
    configs: [
      "One person",
      "Two persons",
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [1475, 1950, 3800, 4200, 4600],
    booked: false,
  },
  {
    date: "14th September 2025 -> 20th September 2025",
    configs: [
      "Up to 4 persons (whole boat)",
      "5 persons (whole boat)",
      "6 persons (whole boat)",
    ],
    prices: [4090, 4570, 5050],
    booked: false,
  },
];

const pricePicker = document.querySelector("#pricePicker");

function updatePrice(select) {
  // Change configuration dropdown
  if (select.id === "pricePickerDate") {
    const selectedDate = parseInt(select.value);
    const configs = tours[selectedDate].configs;

    const pricePickerConfig = document.getElementById("pricePickerConfig");

    pricePickerConfig.innerHTML =
      "<option disabled selected>Configuration</option>";

    configs.forEach((config, index) => {
      const newOption = document.createElement("option");
      newOption.value = index;
      newOption.textContent = `${config}`;
      pricePickerConfig.appendChild(newOption);
    });
    document.getElementById("priceDisplayer").innerText = "Price: ";
  } else {
    // Work out price
    addPrice();
  }
}

function addPrice() {
  const selectedDate = document.getElementById("pricePickerDate").value;
  const selectedConfig = document.getElementById("pricePickerConfig").value;
  const price = tours[selectedDate].prices[selectedConfig];
  if (discount == 0) {
    document.querySelector("#priceDisplayer").innerText = "Price: £" + price;
  } else {
    document.querySelector("#priceDisplayer").innerHTML =
      "Price: £" +
      price * (1 - discount / 100) +
      "<br>" +
      discount +
      "% discount";
    // Remove discount bit
    document.getElementById("discountForm").classList.add("hidden");
    document.getElementById("discountCheckContainer").style.display = "none";
  }
}

function updatePaypal(price) {
  const selectedDate = document.getElementById("pricePickerDate").value;
  const selectedConfig = document.getElementById("pricePickerConfig").value;
  const tourDate = selectedDate;
  const configName = selectedConfig;

  const description = `Booking: ${tourDate} | ${configName}`;

  // Clear the previous button container
  document.getElementById("paypal-button-container").innerHTML = "";

  // Render new PayPal buttons
  paypal
    .Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              description: description,
              amount: {
                value: price.toFixed(2), // Ensure proper formatting
                currency_code: "GBP", // Replace with your preferred currency
              },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert("Transaction completed by " + details.payer.name.given_name);
        });
      },
      onError: function (err) {
        console.error("PayPal error:", err); // Log errors for debugging
        alert("An error occurred with PayPal. Please try again.");
      },
    })
    .render("#paypal-button-container");
}

function displayCheckout() {
  if (document.getElementById("priceDisplayer").innerText.includes("£")) {
    const selectedDate = document.getElementById("pricePickerDate").value;
    const selectedConfig = document.getElementById("pricePickerConfig").value;
    var price = tours[selectedDate].prices[selectedConfig];
    if (discount != 0) {
      price *= 1 - discount / 100;
    }

    document.getElementById("payInfo").innerHTML =
      "<b>Tour:</b> " +
      document.getElementById("pricePickerDate").options[
        document.getElementById("pricePickerDate").selectedIndex
      ].text +
      "<br><b>Configuration:</b> " +
      document.getElementById("pricePickerConfig").options[
        document.getElementById("pricePickerConfig").selectedIndex
      ].text +
      "<br><b>Total price:</b> £" +
      price +
      "<br><b>Deposit (to be paid now):</b> £" +
      (price * 0.25).toFixed(2);
    updatePaypal(price.toFixed(2) * 0.25);

    document.querySelector(".pay").classList.remove("hidden");
    document.querySelector(".picker").style.display = "none";
  } else {
    alert("Please select a tour!");
  }
}

// Loading page
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.href.includes("tour")) {
    //Carousels tour page
    const carouselContainer = document.querySelectorAll(".carousel-container");
    carouselContainer.forEach((carouselContainer, index) => {
      console.log(index);
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

  // Popups
  if (popupOverlay != null) {
    popupOverlay.addEventListener("click", function () {
      popupToggle(false, null);
    });
    close.addEventListener("click", function () {
      popupToggle(false, null);
    });
  }

  // Price picker
  if (pricePicker != null) {
    // Add options for the date
    const pricePickerDate = document.getElementById("pricePickerDate");
    pricePickerDate.innerHTML = "<option disabled selected>Date:</option>";

    for (let i = 0; i < tours.length; i++) {
      const newOption = document.createElement("option");
      newOption.value = i;
      newOption.textContent = tours[i].date;
      if (tours[i].booked) {
        newOption.disabled = true;
      }
      pricePickerDate.appendChild(newOption);
    }
    // Change price and configurations if something is changed
    pricePicker.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", () => updatePrice(select));
    });
  }



  // Paypal
  updatePaypal();
});
