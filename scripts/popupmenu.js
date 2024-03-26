// controls pop up menu for the create post button

document.addEventListener('DOMContentLoaded', function() {
    const threadTypeSelect = document.getElementById('threadType');
    const threadFormText = document.getElementById('threadFormText');
    const threadFormDocument = document.getElementById('threadFormDocument');
    const submitButton = document.getElementById('submitThread');
    const quillButton = document.getElementById('quillLink');

    threadTypeSelect.addEventListener('change', function() {
        
        if (threadTypeSelect.value === 'text') {
            threadFormText.style.display = 'block';
            threadFormDocument.style.display = 'none';
            submitButton.style.display = 'block'; 
            quillButton.style.display = 'none'; 
        
        } else if (threadTypeSelect.value === 'document') {
            threadFormText.style.display = 'none';
            threadFormDocument.style.display = 'block';
            
        }
    });

});