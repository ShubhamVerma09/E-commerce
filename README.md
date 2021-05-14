# E-commerce
E-commerce Project which have auth and product  APIs 
---
* Project Contain Auth API and Product API.
    * Auth API
        * SignUp API
        * SignIn API
    * Product API
        * Add Product API
        * Get All Product API
        * Get Single Product API
        * Update Product API
        * Search Product by Keyword API
* Command: 
    * Install node packages
    ```
        npm install
    ```
    * Run Project.
    ```
        npm start
    ```
* Custome Error Code
    * Range of 1800 is for client side validation.
    * Range of 2000 is for server side error.
* Scope to Update
    * We should upload image to s3 bucket and store url to db which is cost effective solution and on FE we just need to add url to source and image get loaded.
    