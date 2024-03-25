// controls pop up menu for the create post button

document.addEventListener('DOMContentLoaded', function() {
    const threadTypeSelect = document.getElementById('threadType');
    const threadBodyText = document.getElementById('threadBodyText');
    const threadBodyDocument = document.getElementById('threadBodyDocumentDiv');
    const threadBodyImage = document.getElementById('threadBodyImage');
    const submitTextButton = document.getElementById('submitText');
    const submitDocumentButton = document.getElementById('submitDocument');
    const submitImageButton = document.getElementById('submitImage');

    // default is for text thread
    threadTypeSelect.value = 'text';
    threadBodyDocument.style.display = 'none';
    threadBodyImage.style.display = 'none';
    submitDocumentButton.style.display = 'none';
    submitImageButton.style.display = 'none';

    // updates based on the thread we need to upload
    threadTypeSelect.addEventListener('change', function() {
        const selectedType = threadTypeSelect.value;

        threadBodyText.style.display = 'none';
        threadBodyDocument.style.display = 'none';
        threadBodyImage.style.display = 'none';

        submitTextButton.style.display = 'none';
        submitDocumentButton.style.display = 'none';
        submitImageButton.style.display = 'none';

        if (selectedType === 'text') {
            threadBodyText.style.display = 'block';
            submitTextButton.style.display = 'block';
        } else if (selectedType === 'document') {
            threadBodyDocument.style.display = 'block';
            submitDocumentButton.style.display = 'block';
        } else if (selectedType === 'image') {
            threadBodyImage.style.display = 'block';
            submitImageButton.style.display = 'block';
        }
    });
});

function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
}
