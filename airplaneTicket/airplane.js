const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const planeSelect = document.getElementById("plane");
const w = document.getElementById("StartTooltiptext");
const m = document.getElementById("MidTooltiptext");
const h = document.getElementById("EndTooltiptext");


populateUI();

let ticketPrice = +planeSelect.value;

w.addEventListener("click", (e) => {
  console.log("w");
  ticketPrice = +parseInt(w.textContent);
  updateSelectedCount();
});

m.addEventListener("click", (e) => {
  console.log("m");
  ticketPrice = +parseInt(m.textContent);
  updateSelectedCount();
});

h.addEventListener("click", (e) => {
  console.log("h");
  ticketPrice = +parseInt(h.textContent);
  updateSelectedCount();
});


function setplaneData(planeIndex, planePrice) {
  localStorage.setItem("selectedplaneIndex", planeIndex);
  localStorage.setItem("selectedplanePrice", planePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  console.log("selected seat count: " + selectedSeatsCount);


  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setplaneData(planeSelect.selectedIndex, planeSelect.value);
}


function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedplaneIndex = localStorage.getItem("selectedplaneIndex");

  if (selectedplaneIndex !== null) {
    planeSelect.selectedIndex = selectedplaneIndex;
    console.log("selectedplaneIndex" + selectedplaneIndex);
  }
}
console.log(populateUI())

planeSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setplaneData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

updateSelectedCount();