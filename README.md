
# Full Stack 💬 Chat App

A real-time chat application built with **React (Vite)**, **Node.js/Express**, **MongoDB**, and **Socket.IO**.  
Supports authentication, private messaging, and persistent chat history.


## 🚀 Features

- 🔐 User authentication (JWT + cookies)
- 👥 Real-time private & group messaging
- 🟢 Online/offline status
- 💾 Persistent chat history (MongoDB)
- 📱 Responsive UI with TailwindCSS + DaisyUI
- ⚡ Powered by Socket.IO for instant updates
- 👤 Profile picture upload via Cloudinary
- 🗂️ Global state management using Zustand


## 🛠️ Tech Stack

- **Frontend :** React (Vite), TailwindCSS, DaisyUI
- **Backend :** Node.js, Express, Socket.IO
- **Database :** MongoDB
- **Deployment :** Render (backend + frontend)


## 📸 Screenshots

💬 Chat Page

DARK THEME
![](https://github.com/Atulbhadoriya-55/chatApp/blob/main/frontend/public/dark.png)

LIGHT THEME
![](https://github.com/Atulbhadoriya-55/chatApp/blob/main/frontend/public/light.png)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

## 🔑 Environment Variables

Create a `.env` file inside the **backend/** folder with the following keys:

```env
# Server Configuration
PORT = 5000
NODE_ENV = development

# Database
MONGODB_URL = ......

# Authentication
JWT_SECRET = your_secret_key

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
```
## 🏗️ Build the app

To deploy this project run

```bash
  npm run build
```

## 🚀 Start the app

```bash
  npm run start
```
