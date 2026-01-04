const today = new Date();
const startDate = new Date("2026-03-01");
const endDate = new Date("2026-09-30");

const firstBookingAllowed = addDays(today, 20);

const prices = {
  2: 2750,
  3: 2750,
  4: 3000,
  5: 3000,
  6: 3200,
  7: 3200,
  8: 2950
};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const lengthMultipliers = {3: 1.0, 4: 1.1, 5: 1.2, 6: 1.3};
const noGuestMultipliers = {1: 1.0, 2: 1.0, 3: 1.0, 4: 1.0, 5: 1.08, 6: 1.16};

const eclipseStartDate = new Date("2026-08-09");
const eclipseEndDate = new Date("2026-08-15");
const eclipseDefaultPrice = 7500;

const blockedPeriods = [
  { from: new Date(2026, 0, 1), to: new Date(2026, 2, 31) }, // Jan–March
  { from: new Date(2026, 3, 5), to: new Date(2026, 3, 10) }, // April 6–10
  { from: new Date(2026, 4, 2), to: new Date(2026, 4, 16) },  // May 2–16
  { from: new Date(2026, 4, 25), to: new Date(2026, 4, 29) },
  { from: new Date(2026, 6, 6), to: new Date(2026, 6, 10) },
];

let price = 0.00;
let tourStartDate = new Date();
let tourEndDate = new Date();
let length = 0;

const picker = flatpickr("#datePicker", 
  {
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "d-m-Y",
    minDate: (firstBookingAllowed > startDate) ? firstBookingAllowed : startDate,
    maxDate: endDate,
    onChange: function (selectedDates, dateStr, instance) {
      const date = selectedDates[0];
      tourStartDate = new Date(date);
      tourEndDate = addDays(date, length-0);
      document.getElementById("pricePickerEndDate").innerHTML = (date !== undefined) ? 
      `${months[tourEndDate.getMonth()]} ${tourEndDate.getDate()}, ${tourEndDate.getFullYear()}` : "Please choose a start date.";

      updatePrice();
    },
    disable: [isDateDisabled],
  }
);

function overlapsBlockedPeriod(start, length) {
  const firstNight = new Date(start);
  const lastNight = addDays(start, length - 1);

  return blockedPeriods.some(({ from, to }) => {
    return firstNight <= to && lastNight >= from;
  });
}

function isDateDisabled(date) {
  const start = new Date(date);

  if (blockedPeriods.some(r => start >= r.from && start <= r.to)) {
    return true;
  }

  if (!length || length <= 0) return false;

  if (!fitsInWeek(start, length)) return true;

  if (overlapsBlockedPeriod(start, length)) return true;

  return false;
}

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function fitsInWeek(start, length) {
  const startDay = start.getDay(); // Sun=0, Mon=1
  const lastNight = addDays(start, length - 1);
  const lastDay = lastNight.getDay();

  if (lastDay === 0 && length > 1) return false;

  return startDay + (length - 1) <= 6;
}

function updateDates() {
  length = Number(document.getElementById("pricePickerLength").value);
  picker.redraw();
  picker.clear();
}

function initPaypal() {
  paypal.Buttons({
  createOrder: function (data, actions) {

    if (!price || price <= 0 || isNaN(price)) {
      alert("Select dates, length and guests first.");
      return actions.reject();
    }

    const description = `Dates: ${tourStartDate.toLocaleDateString()} to ${addDays(tourStartDate, length - 1).toLocaleDateString()},
    Nights: ${length},
    Person(s): ${document.getElementById("pricePickerPersons").value},
    Total price: £${price},
    Deposit now: £${(price / 4).toFixed(2)}`;

        return actions.order.create({
          purchase_units: [{
            description,
            amount: {
              value: (price / 4).toFixed(2),
              currency_code: "GBP"
            }
          }]
        });
      },

      onApprove: function (data, actions) {
        return actions.order.capture().then(details => {
          alert("Transaction completed by " + details.payer.name.given_name);
        });
      },

      onError: function (err) {
        console.error("PayPal error:", err);
      }
    }).render("#paypal-button-container");

}

function displayCheckout() {
  if (!(tourStartDate instanceof Date) || isNaN(tourStartDate.getTime())) {
    alert("Please choose a start date.");
    return;
  }

  document.querySelector(".pay").style.display = "flex";

  const description = `<b>Dates:</b> ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}<br>
    <b>Nights:</b> ${document.getElementById("pricePickerLength").value}<br>
    <b>Person(s):</b> ${document.getElementById("pricePickerPersons").value}<br>
    <b>Total price:</b> £${price}<br>
    <b>Deposit to be payed now:</b> £${(price/4).toFixed(2)}`;

  document.getElementById("payInfo").innerHTML = description;
}

function updatePrice() {
  if (!tourStartDate || !length || isNaN(length)) {
    price = 0;
    return;
  }

  const guests = Number(document.getElementById("pricePickerPersons").value);
  const tourEnd = addDays(tourStartDate, length - 1);

  const overlapsEclipse =
    tourStartDate <= eclipseEndDate && tourEnd >= eclipseStartDate;

  const lengthMult = lengthMultipliers[length] ?? 1.0;

  if (overlapsEclipse) {
    price = eclipseDefaultPrice * lengthMult;

    price = Math.round(price * 100) / 100;
    document.getElementById("priceValue").innerText = `£${price.toFixed(2)}`;
    return;
  }

  const basePrice = prices[length] ?? 0;
  const guestMult = noGuestMultipliers[guests] ?? 1.0;

  price = basePrice * lengthMult * guestMult;
  price = Math.round(price * 100) / 100;

  document.getElementById("priceValue").innerText = `£${price.toFixed(2)}`;
  document.querySelector(".pay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  updateDates();
  initPaypal();
});

document.getElementById("pricePickerLength").addEventListener("change", () => {
  updateDates();
  updatePrice();
});

document.getElementById("pricePickerPersons").addEventListener("change", updatePrice);