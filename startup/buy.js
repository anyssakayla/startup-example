

const endpoint = 'http://localhost:8080/buy.js'; 

// Fetch data from MongoDB
fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const cardContainer = document.getElementById('cardContainer');
    const tasks = data.tasks || [];

  

    tasks.forEach(task => {
// Check if the task has these properties
if (task && task.taskTitle && task.taskDescription && task.taskPrice) {
  // Create a card for each task
  let imageContainer;
  const card = document.createElement('div');
  card.className = 'cardcontainer col-xl-3 col-lg-4 col-md-5 col-sm-6 mb-4 mb-lg-0 shadow-sm border-0 rounded';

  // If taskImage is provided, create an image element
  if (task.taskImage) {
    //console.log(taskImage);
    imageContainer = document.createElement('div'); //making a container so price could join
    imageContainer.className = 'image-container position-relative';

    const image = document.createElement('img');
    const possibleExtensions = ['jpg', 'jpeg', 'png'];

    // Try each extension
    let found = false;
    for (const fileExtension of possibleExtensions) {
      const imagePath = `uploads/${task.taskImage}`;
      // Check if the file exists
      if (fileExists(imagePath)) { //do i need await here?
        image.src = imagePath;
        found = true;
        break;
      }
    }
    if (!found) {
      // If no valid image is found, use default image
      image.src = 'images/default.jpg';
    }
    image.className = 'card-img-top';
    imageContainer.appendChild(image);

    const price = document.createElement('div');
    price.className = 'taskPrice position-absolute bottom-0 start-0 m-2';
    price.id = 'taskPrice';
    price.textContent = `$${task.taskPrice}`;
    imageContainer.appendChild(price);
   // cardBody.appendChild(price);


   // card.appendChild(imageContainer);
  }else{
    imageContainer = document.createElement('div'); //making a container so price could join
    imageContainer.className = 'image-container position-relative';
    const image = document.createElement('img');
    image.src = 'images/default.jpg';
    image.className = 'card-img-top';
    imageContainer.appendChild(image);
    //card.appendChild(image);

    const price = document.createElement('div');
    price.className = 'taskPrice position-absolute top-10 start-0 m-2';
    price.id = 'taskPrice';
    price.textContent = `$${task.taskPrice}`;
    imageContainer.appendChild(price);
  }
  if(imageContainer){
    card.appendChild(imageContainer);
  }
  

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardBody.style.padding = '10px';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = task.taskTitle;
  cardBody.appendChild(title);

  if (task.taskDescription) {
    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = task.taskDescription;
    cardBody.appendChild(description);
  }

  

  card.appendChild(cardBody);

  // const footer = document.createElement('div');
  // footer.className = 'footer';
  // card.appendChild(footer);

  cardContainer.appendChild(card);
}
});
  })
  .catch(error => console.error('Error fetching tasks:', error));

  async function fileExists(url) { //checks if file for image exists
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
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
    
    getZipCode(latitude, longitude); //still deciding if i want to do this part cause costs money
    function getZipCode(latitude, longitude) { //I have to use open cage to get actual zip code, but have to pay for it
      const apiKey = "YOUR_OPEN_CAGE_API_KEY"; // Replace with OpenCage API key
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

