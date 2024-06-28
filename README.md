# Architecture
## Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
## Why did the backend use a NoSQL MongoDB database?

The Travlr Express application includes two different frontend developments. The admin-only frontend for Travlr is built as an Angular SPA (Single-Page Application). The client-facing frontend is built using the MVC (Model, View, Controller) architecture, and page contents are rendered and served directly from the parent application using the HBS view-template engine for dynamic pages. The Angular admin-only frontend is structured on components and page contents are rendered client-side on the browser after connecting to the parent Express application backend through CORS (Cross-Origin Resource Sharing) to receive and send data. Both the client-facing express frontend and the admin Angular SPA reaches the application’s database to get or save data by interacting with the applications RESTful API. Travlr is a MEAN stack application using a NoSQL MongoDB database which stores documents as BSON or Binary JSON (Javascript Object Notation) making it particularly suitable for Travlr since Javascript uses JSON to hold or format data. MongoDB is also very scalable and it provides support for indexing and complex querying. 


# Functionality
## How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
## Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

JSON is simply a way of representing or formatting data in modern programming and can be used by other programming languages although it is derived from the JavaScript programming language. The frontend of the application communicates with the application backend by sending and receiving data in JSON format. Many parts of the application’s view or pages includes reused component which can be tedious to replicate for all pages, view templating engines such as Handlebars provides partials that can be defined once then reused on any page where necessary. Angular been structured specifically on components naturally lend itself for component reuse in the application. 


# Testing
## Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

Both frontends of the application gets, updates, and creates documents on the database through the applications RESTful API through define routes or endpoints. Tools like Postman can be used to test the endpoints to make sure the frontends can communicate with the backend server especially when views are not yet defined to view the data on the client. Database visualizing tools like MongoDB Compass or DBeaver can also be used to view document creation and update by action triggered from the frontend. Common errors to be encountered while connecting between the Angular SPA and the RESTful API server include:
* Not providing functions on the component’s controller to handle on-click events generated from a component’s view element such as buttons.
* Not properly implementing the data service component connecting the angular SPA with the backend API routes.
* Not adding header option for authorization while sending http requests to secured routes.

Secure authentication to the Travlr application is done through the use of passport.js which is middleware managing user authentication (local strategy) at the backend by generating encrypted JWTs (JSON Web Tokens) for every newly created authorized user. The JWTs are passed along in headers of request coming from the frontends to the backend through a secured endpoint to ensure requesting user is authorized. Methods are added after user schema definitions to process information passed in from client before they are attached to the model making them suitable for generating passwords hash and salts for users and their associated JWTs.


# Reflection
## How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This course introduced me to full-stack Javascript development using the MEAN stack. It helped me to clarify the connection between the backend or logic tier of an application and the frontend or presentation tier and how both relates to the data tier. I learned how to use a RESTful API with the backend to process communication between several frontends and the application’s database. I learned how to use view-templating engine to render views on an Express server and how to choose when and why to use server-side rendering and client-side rendering. I also learnt how to provide secure authentication and session management to an Express application using authentication middleware and JWTs.
