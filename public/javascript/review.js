const { Uploader } = require("uploader");

// enables uploader
const uploader = Uploader({
  apiKey: process.env.API_KEY;
});

function uploadFile() {
    uploader.open({ 
        "maxFileCount": 1,
        "editor": {
            "images": {
            "crop": true,
            "cropRatio": 1,
            "cropShape": "circ"
            }
        },
        "mimeTypes": [
            "image/jpeg"
        ],
        "multi": false
    }).then(
      files => alert(files.length === 0 
                     ? "No file selected!" 
                     : `File uploaded!\n\n${files[0].fileUrl}`),
      error => alert(error)
    );  
}
