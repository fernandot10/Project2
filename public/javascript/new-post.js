// const { Uploader } = require("uploader");
// const process = require('dotenv').config();

// enables uploader
const uploader = Uploader({
  apiKey: 'public_12a1xxC4o3CDyyMhsDqXADirSt2i',
});

function uploadFile() {
  const title = document.querySelector('#title').value.split(' ').join('');
  const artist = document.querySelector('#artist').value.split(' ').join('');

  console.log(`${title}-${artist}.jpg`);

    var albumCover = uploader.open({ 
        "maxFileCount": 1,
        "editor": {
            "images": {
            "cropRatio": 1,
            }
        },
        "mimeTypes": [
            "image/jpeg",
            "image/png"
        ],
        "multi": false,
        "path": {
          "fileName": `${title}-${artist}.jpg`,
          "fileNameVariablesEnabled": true,
          "folderPath": "/uploads",
          "folderPathVariablesEnabled": true
        },
    }).then(
      files => alert(files.length === 0 
                     ? "No file selected!" 
                     : `File uploaded!`),
      error => alert(error)
    )
    return albumCover
}

const submitForm = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const artist = document.querySelector('#artist').value.trim();
  const genre = document.querySelector('#genre').value.trim();
  const year = document.querySelector('#year').value.trim();
  const review = document.querySelector('#content').value.trim();
  const cover = uploader.url(`/uploads/${title.split(' ').join('')}-${artist.split(' ').join('')}.jpg`, { transformation: "thumbnail" });

  console.log(title, artist, genre, year, cover, review);

  if (title && artist && genre && year && cover && review) {
    const response = await fetch('/api/reviews/new-post', {
      method: 'POST',
      credentials: 'include',    
      body: JSON.stringify({ title, artist, genre, year, cover, review }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Post made!')
      document.location.replace('/dashboard');
    } else {
      alert('Failed to post review!');
    }
  }
}

document.querySelector('#image').addEventListener('click', uploadFile);
document.querySelector('#submit').addEventListener('click', submitForm);