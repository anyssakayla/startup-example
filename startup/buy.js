const taskData = JSON.parse(localStorage.getItem('taskData'));

// Assuming taskImage is passed as a parameter when creating the card
function createTaskCard(taskTitle, taskDescription, taskPrice, taskImage) {
    const cardContainer = document.getElementById('cardContainer');
    const card = document.createElement('div');
    card.className = 'cardcontainer col-xl-3 col-lg-4 col-md-5 col-sm-6 mb-4 mb-lg-0';

    // If taskImage is provided, create an image element
    if (taskImage) {
        const image = document.createElement('img');
        image.src = taskImage;
        image.className = 'card-img-top';
        card.appendChild(image);
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