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
