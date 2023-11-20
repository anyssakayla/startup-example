//For the profile image
// Get the file input and preview
const fileInput = document.getElementById('file');
const previewImage = document.getElementById('preview-image');


fileInput.addEventListener('change', function() {
    const file = fileInput.files[0]; // Get the selected file

    // Check if a file is selected
    if (file) {
        const reader = new FileReader(); 
        reader.onload = function(event) {
            // Set the preview image source to the selected file
            previewImage.src = event.target.result;
        };
        reader.readAsDataURL(file); 
    } else {
        // If no file is selected, use this as a default
        previewImage.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    }
});

