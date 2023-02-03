const { Uploader } = require("uploader");

// enables uploader
const uploader = Uploader({
  apiKey: process.env.API_KEY;
});

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
    "multi": false,

     }).then(
    error => {
      alert(error);
    }
  );