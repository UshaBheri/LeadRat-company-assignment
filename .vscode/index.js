const seatingArrangement = document.getElementById("seatingArrangement");
const seatTypeSelect = document.getElementById("seatType");
const seatCountInput = document.getElementById("seatCount");
const proceedButton = document.getElementById("proceed");
const seatCountInput = document.getElementById("seatCount");

const rows = 8; // Define the number of rows
const seatsPerRow = 9; // Define the number of seats per row

// Initialize the seating arrangement
const seats = [];
for (let i = 0; i < rows; i++) {
    seats[i] = new Array(seatsPerRow).fill("available");
}

// Function to create and display the seating arrangement
function createSeatingArrangement() {
    seatingArrangement.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < seatsPerRow; j++) {
            const seat = document.createElement("div");
            seat.className = "seat";
            seat.dataset.row = i;
            seat.dataset.seat = j;
            seat.addEventListener("click", toggleSeat);
            seatingArrangement.appendChild(seat);
        }
        seatingArrangement.appendChild(document.createElement("br"));
    }
}

// Function to toggle seat status
function toggleSeat(event) {
    const row = event.target.dataset.row;
    const seat = event.target.dataset.seat;

    if (seats[row][seat] === "available") {
        seats[row][seat] = "unavailable";
        event.target.style.backgroundColor = "red";
    } else {
        seats[row][seat] = "available";
        event.target.style.backgroundColor = "green";
    }
}

// Proceed button click event
proceedButton.addEventListener("click", () => {
    const seatType = seatTypeSelect.value;
    const seatCount = parseInt(seatCountInput.value);

    // Check if the selected number of seats of the specified type is available
    let availableSeats = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < seatsPerRow; j++) {
            if (seats[i][j] === "available") {
                availableSeats++;
                if (availableSeats === seatCount) {
                    // Book the selected seats
                    for (let k = 0; k < seatCount; k++) {
                        seats[i][j - k] = "unavailable";
                    }
                    alert(`Booked ${seatCount} ${seatType} seat(s).`);
                    createSeatingArrangement();
                    return;
                }
            }
        }
    }
    alert(`Not enough available ${seatType} seats.`);
});

// Initialize the seating arrangement on page load
createSeatingArrangement();
