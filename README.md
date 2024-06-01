# Estate-Ease Backend
As the name suggests, Estate-Ease is designed to simplify the process of renting or buying properties.

# What it does
The backend of Estate-Ease handles the server-side logic, data management, and API endpoints for property listings and user authentication. It provides a robust foundation for managing user interactions, data storage, and secure communication between the frontend and the server.

# What problem it solves
Estate-Ease addresses the complexity and inefficiency often associated with property searches and user management. By providing a secure and efficient backend, it ensures reliable data handling, authentication, and seamless integration with the frontend.

# How I built it
I built the backend of this project using Node.js, Express.js, Prisma MongoDB, and several other technologies and libraries:

1. Node.js & Express.js: For developing robust server-side logic and API endpoints.
2. Prisma MongoDB: Simplified database operations with Prisma's powerful ORM.
3. JWT Cookie Authentication: Implemented secure user authentication and route protection.
4. bcrypt: Enhanced security by storing hashed passwords.
5. Middleware Integration: Ensured efficient request handling and validation.
6. Prisma CRUD Operations: Streamlined data management with Prisma.
7. API Testing: Thoroughly tested APIs using Postman.
8. Axios: Managed HTTP requests from the frontend.
9. CORS: Enabled cross-origin requests.
10. Cloudinary: Facilitated image uploads.
11. MVC Model: Implemented and structured code following the Model-View-Controller pattern.
12. WebSocket.io: Enabled real-time chat functionality.
13. useRef & Auto Scroll: Enhanced user experience with auto-scroll in chat.
# Steps:
- Initial Setup: Started with setting up a Node.js server.
- Database Configuration: Set up Prisma with MongoDB and created database schemas.
- API Development: Developed RESTful API endpoints using Express.js for property listings, user registration, login, and other functionalities.
- Authentication: Implemented JWT for secure authentication and bcrypt for password hashing.
- Middleware: Integrated middleware for request validation and error handling.
- Testing: Verified API endpoints using Postman.
- Image Handling: Used Cloudinary for handling image uploads.
- WebSockets: Integrated WebSocket.io for real-time chat functionality.
- MVC Structure: Structured the project following the MVC model for clean and maintainable code.
# Dependencies
- express
- prisma
- @prisma/client
- mongodb
- nodemon
- bcrypt
- cookie-parser
- jsonwebtoken
- shortid
- cors
- cloudinary
- websocket.io
