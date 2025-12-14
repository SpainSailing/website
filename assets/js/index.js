// popup toggles

const popupContainer = document.querySelector(".popups");
const popupOverlay = document.querySelector(".overlay");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");

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
    text: "Starting and finishing in the beautiful historic resort of Baiona, our Rias Baixas summer tours are 3, 4, 5 or 6 nights long. On a tour full of contrasts you can spend nights at anchor off incredible beaches, bays and islands. Our favourites include Barra Beach with its beautiful sandy beach and walks around the three Cabo Home lighthouses and the Celtic settlements, the Cies Islands with the most stunning beaches and scenery, and the bay of Aldan, with its quiet villages and atmospheric walk through the 'enchanted forest'. You might want to spend time in some of the marinas across the Rias, perhaps in Combarro, Sanxenxo or Vigo. The tour includes your accommodation onboard, all costs to do with the boat, breakfast and snacks, and your skipper, Tom. You are free to use the yacht's well-equipped galley and there are fantastic bars, restaurants and supermarkets throughout the Rias Baixas area. You will have to make your way to and from Baiona but we are happy to help.<br><a style='color: white;' href='tour.html'>Find out more...</a>", images: [
      "assets/images/rias_pop_view.webp",
      "assets/images/baiona_from_the_castle.webp",
      "assets/images/combarro_seafront.webp",
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
      "Our tours begin and end here in Baiona",
      "We will visit Combarro",
      "Baiona-Anchorage-Combarro-Anchorage-Baiona",
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
      "assets/images/baiona_from_the_castle.webp",
      "assets/images/food_attis_winery1.webp",
      "assets/images/marta_just_arrived.webp",
      "assets/images/marta_sailing1.webp",
      "assets/images/rias_pontevedra.webp",
      "assets/images/portrait.webp",
    ],
    captions: [
      "Tom in Combarro",
      "Spain Sailing's home marina in Baiona",
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


// Loading page
document.addEventListener("DOMContentLoaded", function () {
  // Popups
  if (popupOverlay != null) {
    popupOverlay.addEventListener("click", function () {
      popupToggle(false, null);
    });
    close.addEventListener("click", function () {
      popupToggle(false, null);
    });
  }
});