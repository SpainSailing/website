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
  { from: new Date(2026, 4, 2), to: new Date(2026, 4, 16) }  // May 2–16
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
    },
    disable: [isDateDisabled],
  }
);

function isDateDisabled(date) {
  for (const range of blockedPeriods) {
    if (date >= range.from && date <= range.to) return true;
  }

  if (length > 0) {
    const day = date.getDay();
    const lastDay = 6 - length;
    if (day > lastDay) return true;
  }

  return false;
}

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function fitsInWeek(startDate, length) {
  const start = new Date(startDate);
  const end = addDays(start, length);

  const sunday = new Date(start);
  sunday.setDate(start.getDate() - start.getDay());

  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);

  return start >= sunday && end <= saturday;
}

function updateDates() {
  length = Number(document.getElementById("pricePickerLength").value);
  picker.redraw();
  picker.clear();
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
  alert("Hello, world!");
}

document.addEventListener("DOMContentLoaded", function () {
  updateDates();
});