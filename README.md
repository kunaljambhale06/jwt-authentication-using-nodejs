# Authentication and Authorization using Node.js

This repository demonstrates how authentication and authorization work in a backend application using Node.js and Express.

I built this project while learning how user registration, login, password hashing, JWT generation, and cookie-based authentication are implemented on the server side. The goal of this project was to understand how user identity is handled securely and how login sessions are maintained using tokens.

The application allows users to:
- Register by creating an account
- Login using email and password
- Store a JWT token in cookies after successful login
- Logout by clearing the authentication token

Password security is handled using bcrypt, where user passwords are hashed before storing them in the database and verified during login. JSON Web Tokens (JWT) are generated after successful authentication and stored in cookies to maintain the login state.

This project focuses on understanding authentication logic and backend flow rather than building a production-ready system. It helped me learn how authentication works internally before applying it to larger applications.
