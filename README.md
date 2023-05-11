## File Upload API App

A backend REST API microservices that can be used to accept files (media, pdf, docs, .zip) submission from user as an input.

The Overview of the app

![Image](./assets/file_upload.png)

### Endpoint

1. Upload files
   `Method: POST`
   `Endpoints: "/user"`

2. Get uploaded file for a user
   `Method: GET - "/user/userId"`

3. Update uploaded file
   `Method: PUT - "/user/imageId"`

4. Delete uploaded file
   `Method: DELETE - "/user/imageId"`

### Tools and dependencies

`Cloudinary:` For this project Cloudinary is used as the cloud storage platform where the images or files are stored. When the image is stored on Cloudinary, we get a image_url and image_id as our response.

`Multer:` Multer is a nodejs npm package and it is used as a middleware to handle multipart/ form-data that is to handle uploading of files.

`Other packages:` Express.js, Dotenv, Mongoose, MongoDB (Database)
