Admin Dashboard Project

This is a MEAN stack web application.
It is a responsive dashboard with login, registration, and role-based access for Admins and Users.

Features:
1. Login & Register: You can create an account as an Admin or a User. I haven't added advanced validation or SSO yet, just a simple username and password login.
2. Role-Based Access: Users only see a welcome message. Admins can see the dashboard with a pie chart showing online vs offline users. Admins should log in again to see the updated status of users. Admins can also delete users directly using the delete button.

Tech Used: Angular 18, Bootstrap 5, Chart.js, Node.js, Express, MongoDB Atlas.

System requirements/ Versions used:
Node.js: v22.20.0
Angular CLI: v21.1.4
Chart.js: v4.5.1
Bootstrap: v5.3.0 (used via link in index.html)
OS: Windows x64

How to Run Locally:

Backend (Server):
1. Open the backend folder in a terminal.
2. Run "npm install" to install the dependencies.
3. Run "node server.js" to start the server.
   The server runs on port 5000.
   I have included a .env.example file. Create a .env file and replace with mongodb connection string.

Frontend (Client):
1. Open the frontend folder in a new terminal.
2. Run "npm install" to install the dependencies.
3. Run "ng serve" to start the Angular app.
4. Open your browser and go to http://localhost:4200

Login Credentials:
You can register a new user or use these existing accounts:
Admin: username: admin1, password: password123
User: username: user1, password: pass123
