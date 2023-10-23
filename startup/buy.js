const taskData = JSON.parse(localStorage.getItem('taskData'));

// Assuming taskImage is passed as a parameter when creating the card
function createTaskCard(taskTitle, taskDescription, taskPrice, taskImage) {
    const cardContainer = document.getElementById('cardContainer');
    const card = document.createElement('div');
    card.className = 'cardcontainer col-xl-3 col-lg-4 col-md-5 col-sm-6 mb-4 mb-lg-0 shadow-sm border-0 rounded';

    // If taskImage is provided, create an image element
    if (taskImage) {
      const image = document.createElement('photo');
      image.a
      image.src = taskImage;
      image.className = 'card-img-top';
      card.appendChild(image);
        // const image = document.createElement('img');
        // image.src = taskImage;
        // image.className = 'card-img-top';
        // card.appendChild(image);
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = taskTitle;
    cardBody.appendChild(title);

    // Add other task details to the card body...

    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

// Call the function with retrieved task details
if (taskData) {
  createTaskCard(taskData.title, taskData.description, taskData.price, taskData.image);
}

//for the locaion button, offcanvas, and input
document.addEventListener('DOMContentLoaded', function() {
  const locationButton = document.getElementById('location-button');
  const offcanvasElement = document.getElementById('locationCanvas');
  const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    const saveZipCodeButton = document.getElementById('saveZipCode');
  const zipCodeInput = document.getElementById('zipCode');
  const locationText = document.getElementById('location-text');
  console.log(zipCodeInput);

  locationButton.addEventListener('click', function() {
      offcanvas.show();
  });

  saveZipCodeButton.addEventListener('click', function() {
      const newZipCode = zipCodeInput.value;
      console.log(newZipCode);
      // Do something with the new ZIP code (e.g., validate or process it)
      // For example, you can update the displayed tasks based on the new ZIP code
      locationText.innerText = newZipCode;
      offcanvas.hide();
  });

  // offcanvas.addEventListener('hidden.bs.offcanvas', function() {
  //     // Clear the input field when the offcanvas is closed
  //     zipCodeInput.value = '';
  // });
});






function geoFindMe() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = "";
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    
    getZipCode(latitude, longitude);
    function getZipCode(latitude, longitude) {
      const apiKey = "YOUR_OPEN_CAGE_API_KEY"; // Replace with your OpenCage API key
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results[0] && data.results[0].components) {
            const zipCode = data.results[0].components.postcode;
            const address = data.results[0].formatted;
            status.textContent = `Address: ${address}, Zip Code: ${zipCode}`;
          } else {
            status.textContent = "Location information not available.";
          }
        })
        .catch((error) => {
          status.textContent = "Error fetching location data.";
        });
    }
  }

  function error() {
    status.textContent = "Unable to retrieve your location";
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);

