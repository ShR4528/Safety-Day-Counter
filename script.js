// // Set the start date or reset date to track days since last accident
// function setStartDate() {
//     if (!localStorage.getItem('startDate')) {
//         localStorage.setItem('startDate', new Date().toISOString());  // Set to today
//     }
// }

// // Function to calculate the number of days since the start date or reset
// function calculateDaysSinceStart() {
//     const startDate = new Date(localStorage.getItem('startDate'));
//     const today = new Date();
//     const diffTime = Math.abs(today - startDate);
//     return Math.floor(diffTime / (1000 * 60 * 60 * 24));  // Convert milliseconds to days
// }

// // Display the day count, starting from 0
// function displayDayCount() {
//     const dayCount = calculateDaysSinceStart();
//     document.getElementById('first-day-count').textContent = `${dayCount} Days`;
//     document.getElementById('second-day-count').textContent = `${dayCount} Days`;
// }

// // Reset the day counter to 0 by updating the start date to today
// function resetDayCount() {
//     localStorage.setItem('startDate', new Date().toISOString());
//     displayDayCount();  // Update display to show 0 days
// }

// // Initialize on page load
// window.onload = function() {
//     setStartDate();
//     displayDayCount();

//     // Add reset functionality to button
//     document.getElementById('resetButton').addEventListener('click', resetDayCount);
// };

// Set or reset start date and time for both days and time
function setStartDate() {
    if (!localStorage.getItem('startDate')) {
        localStorage.setItem('startDate', new Date().toISOString());
    }
    if (!localStorage.getItem('startTime')) {
        localStorage.setItem('startTime', new Date().toISOString());
    }
}

// Calculate number of days since last reset
function calculateDaysSinceStart() {
    const startDate = new Date(localStorage.getItem('startDate'));
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));  // Convert milliseconds to days
}

// Calculate time (hours, minutes, seconds) since last reset
function calculateTimeSinceStart() {
    const startTime = new Date(localStorage.getItem('startTime'));
    const now = new Date();
    const diffTime = Math.abs(now - startTime);
    const hours = Math.floor(diffTime / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diffTime / (1000 * 60)) % 60;
    const seconds = Math.floor(diffTime / 1000) % 60;
    return { hours, minutes, seconds };
}

// Display day count and time since last reset
function displayData() {
    const dayCount = calculateDaysSinceStart();
    const { hours, minutes, seconds } = calculateTimeSinceStart();

    document.getElementById('first-day-count').textContent = `${dayCount} Days`;
    document.getElementById('second-day-count').textContent = `${dayCount} Days`;

    document.getElementById('time-count').textContent = 
        `${hours}h ${minutes}m ${seconds}s since last reset`;
}

// Reset the day and time counters
function resetDayCount() {
    localStorage.setItem('startDate', new Date().toISOString());
    localStorage.setItem('startTime', new Date().toISOString());
    displayData();  // Update display
}

// Function to reset only time without resetting the day count
function resetTime() {
    localStorage.setItem('startTime', new Date().toISOString());
    displayData();
}

// Automatically update the time display every second
setInterval(displayData, 1000);

// Initialize on page load
window.onload = function() {
    setStartDate();
    displayData();

    // Attach keyboard event for reset day and time
    document.addEventListener('keydown', function(event) {
        if (event.key === 'r' || event.key === 'R') {
            resetDayCount();  // Reset day and time
        }
        if (event.key === 't' || event.key === 'T') {
            resetTime();  // Reset only time
        }
    });
};
