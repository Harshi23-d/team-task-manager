# Team Task Manager

A full-stack web application designed for efficient team project management, featuring Role-Based Access Control (RBAC).

## 🚀 Key Features
- **Authentication:** Secure Signup and Login using JWT.
- **Project Management:** Admins can create and manage projects.
- **Task Tracking:** Members can add tasks to projects and track their progress (To Do, In Progress, Done).
- **Role-Based Access:** UI elements and API actions are restricted based on user roles (Admin vs. Member).

## 🛠 Tech Stack
- **Frontend:** React.js, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** Railway.app

## 🌐 Live Application
[View the Live Application](<YOUR_LIVE_RAILWAY_URL>)

## 📂 Repository
[GitHub Repository](<YOUR_GITHUB_REPO_URL>)

## ⚙️ How to Run Locally
1. Clone this repository: `git clone <YOUR_GITHUB_REPO_URL>`
2. Install dependencies:
   - Go to `/backend`: `npm install`
   - Go to `/frontend`: `npm install`
3. Create a `.env` file in the `backend` folder and add:
   - `MONGO_URI=your_mongodb_atlas_connection_string`
   - `JWT_SECRET=your_secret_key`
4. Start the backend: `node index.js`
5. Start the frontend: `npm start`