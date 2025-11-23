This guide explains how to run the full-stack Blogging Platform locally with both frontend and backend.

Step 1. Clone the Repository
git clone https://github.com/<your-username>/MyBlog.git
cd MyBlog

Setup 2. Backend Setup (/server)
    Navigate to the backend folder: 
    run in your terminal- ```cd server```
    Install dependencies:- ```npm install```


Create a .env file inside the server folder and add:
>>  PORT=8000
    DB_USERNAME=<your_mongodb_username>
    DB_PASSWORD=<your_mongodb_password>
    MONGODB_URL=<your_full_mongodb_connection_string>
    ACCESS_SECRET_KEY=<your_jwt_access_secret>
    REFRESH_SECRET_KEY=<your_jwt_refresh_secret>
    CLIENT_URL=http://localhost:3000
    BASE_URL=http://localhost:8000        <<

Start the backend:
    run in backend terminal(inside server):- ```npm start```

Your backend will run at: http://localhost:8000


step 3. Frontend Setup (/client)

Navigate to the frontend folder:
    run in terminal:- ```cd client```

Install dependencies:
    run in terminal inside client:- ```npm install```

Start the frontend:
    run in terminal inside client:- ```npm start```

Your frontend will run at: http://localhost:3000