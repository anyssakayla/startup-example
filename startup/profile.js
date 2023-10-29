//For the profile image
// Get the file input and the preview image element
const fileInput = document.getElementById('file');
const previewImage = document.getElementById('preview-image');

// Add an event listener to the file input
fileInput.addEventListener('change', function() {
    const file = fileInput.files[0]; // Get the selected file

    // Check if a file is selected
    if (file) {
        const reader = new FileReader(); // Create a new FileReader
        reader.onload = function(event) {
            // Set the preview image source to the selected file
            previewImage.src = event.target.result;
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        // If no file is selected, reset the preview image source
        previewImage.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    }
});

