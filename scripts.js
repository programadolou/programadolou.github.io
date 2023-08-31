// document.addEventListener("DOMContentLoaded", function() {
//     if (localStorage.getItem('authorized') !== 'true') {
//         window.location.href = 'login.html';
//     }
//     // rest of your code
// });     

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is loaded");  // Debugging line
    const mainMenu = document.getElementById("main-menu");
    const girlfriendButton = document.getElementById("girlfriend-button");
    const irrelevantButton = document.getElementById("irrelevant-button");
    const foquitaButton = document.getElementById("foquita-button");
    
    foquitaButton.addEventListener("click", function () {
        console.log("Button clicked");  // Debugging line
        window.location.href = 'foquita.html';
    });    
    
    const virtualCalendar = document.getElementById("virtual-calendar");
    const monthDropdown = document.getElementById("monthDropdown");
    const virtualCalendarButton = document.getElementById("virtual-calendar-button");
    const calendar = document.getElementById("calendar");
    const viewer = document.getElementById("viewer");
  
    const blockedAccess = document.getElementById("blocked-access");
  
    virtualCalendar.style.display = "none";
    blockedAccess.style.display = "none";

    girlfriendButton.addEventListener("click", function () {
      mainMenu.style.display = "none";
      virtualCalendar.style.display = "block";  // Show the calendar button
      monthDropdown.style.display = "block";  // Show the calendar button
    });
  
    irrelevantButton.addEventListener("click", function () {
      mainMenu.style.display = "none";
      blockedAccess.style.display = "block";
    });
  
    // virtualCalendarButton.addEventListener("click", function () {
    //     virtualCalendarButton.style.display = "none";  // Hide the calendar button
    //     virtualCalendar.style.display = "block";  // Show the calendar
    //     console.log("entered calendar");
    //     blockedAccess.style.display = "none"; // Hide the blocked access div
    //     calendar.innerHTML = "";
    //     viewer.innerHTML = "";
    //   });
      
});

// HEARTS
const container = document.getElementById('heart-container');
let counter = 0;
console.log("hearts");
document.addEventListener('mousemove', function (e) {
  counter++;
  if (counter % 10 !== 0) return;  // only create a heart every 10 mousemoves

  let heart = document.createElement('div');
  heart.className = 'heart';
  container.appendChild(heart);

  const rect = container.getBoundingClientRect();

  heart.style.left = (e.clientX - rect.left) + 'px';
  heart.style.top = (e.clientY - rect.top) + 'px';

  setTimeout(() => {
    heart.remove();
  }, 1000);
});

// VIRTUAL ALBUM
// Fetch images and create the calendar-like structure
fetch('photos.json')
    .then(response => response.json())
    .then(imageData => {
        const calendar = document.getElementById('calendar');
        const viewer = document.getElementById('viewer');
        const dropdown = document.getElementById('monthDropdown');

        // Convert dates to yyyy-mm-dd format for easy comparison
        const imageDates = imageData.map(data => {
            data.date = new Date(data.date).toISOString().split('T')[0];
            return data;
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time part

        // Get the previously opened images from localStorage
        const openedImages = JSON.parse(localStorage.getItem('openedImages')) || [];

        // Populate dropdown with all months of the current year
        for (let i = 0; i < 12; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.text = new Date(today.getFullYear(), i, 1).toLocaleString('default', { month: 'long' });
            dropdown.appendChild(option);
        }

        dropdown.addEventListener('change', function () {
            // Clear the calendar
            calendar.innerHTML = '';

            const selectedMonth = this.value;

            // Create an array of all days in the selected month
            const daysInMonth = new Date(today.getFullYear(), parseInt(selectedMonth) + 1, 0).getDate();
            for (let i = 1; i <= daysInMonth; i++) {
                let date = new Date(today.getFullYear(), selectedMonth, i).toISOString().split('T')[0];

                const day = document.createElement('div');
                day.classList.add('calendar__day');

                const dayNumber = document.createElement('span');
                dayNumber.classList.add('date-number');
                dayNumber.innerText = i;
                day.appendChild(dayNumber);

                // Find the data for this date
                const data = imageDates.find(d => d.date === date);
                if (data) {
                    const giftIcon = document.createElement('span');
                    giftIcon.classList.add('unopened');
                    day.appendChild(giftIcon);

                    // When a day is clicked, handle opening and closing of images
                    day.addEventListener('click', () => {
                        if (new Date(date) <= today) {
                            if (!openedImages.includes(date)) {
                                // Open the image
                                openedImages.push(date);
                                giftIcon.style.display = 'none'; // Hide the gift icon
                                viewer.style.display = 'block';

                                const img = document.createElement('img');
                                img.src = data.path;
                                img.classList.add('viewer__image');
                                viewer.innerHTML = '';
                                viewer.appendChild(img);
                            } else {
                                // Close the image
                                openedImages.splice(openedImages.indexOf(date), 1);
                                giftIcon.style.display = 'none'; // Don't show the gift icon again
                                viewer.style.display = 'none';
                                viewer.innerHTML = '';
                            }

                            // Save the opened images to localStorage
                            localStorage.setItem('openedImages', JSON.stringify(openedImages));
                        }
                    });

                    // Check if the image is already opened and update the UI
                    if (openedImages.includes(date)) {
                        giftIcon.style.display = 'none';
                    } else if (new Date(date) > today) {
                        giftIcon.style.display = 'none';
                        day.classList.add('disabled'); // Make future dates non-interactive
                    }
                } else {
                    // If no image data for this date, make it non-interactive
                    day.classList.add('disabled');
                }

                calendar.appendChild(day);
            }
        });

        // Trigger change event to populate the calendar for the current month
        dropdown.value = today.getMonth();
        dropdown.dispatchEvent(new Event('change'));
    });

