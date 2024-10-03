let scrapbooks = {};
let currentScrapbook = null;
let currentIndex = 0;

// Update the scrapbook list UI
function updateScrapbookList() {
    const scrapbookList = document.getElementById('scrapbook-list');
    scrapbookList.innerHTML = ''; // Clear existing list
    for (let name in scrapbooks) {
        const button = document.createElement('button');
        button.innerText = name;
        button.onclick = () => switchScrapbook(name);
        scrapbookList.appendChild(button);
    }
}

// Switch to a selected scrapbook
function switchScrapbook(name) {
    currentScrapbook = name;
    document.getElementById('current-scrapbook-name').innerText = name;
    document.getElementById('create-entry').style.display = 'block';
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('generated-story').innerText = '';
    displayScrapbookEntries();
}

// Display all entries in the current scrapbook
function displayScrapbookEntries() {
    const scrapbookView = document.getElementById('scrapbook-view');
    scrapbookView.innerHTML = ''; // Clear current view
    const entries = scrapbooks[currentScrapbook] || [];
    entries.forEach(entry => {
        const scrapbookEntry = document.createElement('div');
        scrapbookEntry.classList.add('scrapbook-entry');
        scrapbookEntry.innerHTML = `
            <div class="scrapbook-image">${entry.image}</div>
            <div class="scrapbook-story">${entry.story}</div>
            <hr>
        `;
        scrapbookView.appendChild(scrapbookEntry);
    });
}

// Save the current entry to the selected scrapbook
function saveToScrapbook() {
    const imageHTML = document.getElementById('image-preview').innerHTML;
    const storyHTML = document.getElementById('generated-story').innerHTML;

    // Check if there is content to save (image or story)
    if (!imageHTML && !storyHTML) {
        alert("Please upload an image or write a story before saving.");
        return;
    }

    const newEntry = {
        image: imageHTML,
        story: storyHTML
    };

    if (!scrapbooks[currentScrapbook]) {
        scrapbooks[currentScrapbook] = [];
    }

    scrapbooks[currentScrapbook].push(newEntry);
    document.getElementById('image-preview').innerHTML = '';
    document.getElementById('generated-story').innerText = '';
    displayScrapbookEntries();
    alert(`Entry saved to ${currentScrapbook}!`);
}

// Navigate to next entry
function nextEntry() {
    const entries = scrapbooks[currentScrapbook];
    if (!entries || entries.length === 0) {
        alert("No entries available.");
        return;
    }

    currentIndex++;

    if (currentIndex >= entries.length) {
        currentIndex = 0; // Loop back to the first entry
    }

    const nextEntry = entries[currentIndex];
    document.getElementById('image-preview').innerHTML = nextEntry.image;
    document.getElementById('generated-story').innerText = nextEntry.story;
}

// Handle image upload
const imageInput = document.getElementById('upload-image');
const dropZone = document.getElementById('drop-zone');
const imagePreview = document.getElementById('image-preview');

dropZone.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', handleImageUpload);

function handleImageUpload() {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">
                                  <div class="watermark">HeartLens</div>`;
    };
    reader.readAsDataURL(file);
}

// Placeholder for recording button
document.getElementById('record-button').addEventListener('click', () => {
    alert("Microphone recording started (this is a placeholder).");
});

// Allow editing story
function editStory() {
    const storyText = document.getElementById('generated-story').innerText;
    const newStory = prompt("Edit your story:", storyText);
    if (newStory !== null) {
        document.getElementById('generated-story').innerText = newStory;
    }
}

function saveStory() {
    alert("Story saved!");
}

// Create a new scrapbook
document.getElementById('create-scrapbook-button').addEventListener('click', () => {
    const scrapbookName = prompt('Enter a name for your new scrapbook:');
    if (scrapbookName && !scrapbooks[scrapbookName]) {
        scrapbooks[scrapbookName] = [];
        switchScrapbook(scrapbookName);
        updateScrapbookList();
        alert(`New scrapbook "${scrapbookName}" created!`);
    } else if (scrapbooks[scrapbookName]) {
        alert("A scrapbook with this name already exists.");
    }
});

// Initialize with no scrapbooks created
updateScrapbookList();
