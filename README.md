# MyBlog — Frontend

The frontend of a full-stack blogging platform built with Vite + React.
Previously deployed on AWS EC2.

## Tech Stack
- React.js, JavaScript (ES6+)
- Vite
- REST API integration
- JWT-based authentication

## Features
- Browse and read blogs with category-based filtering
- Rich text editor for blog creation
- Admin dashboard for content and user management
- Comment moderation — approve, reject, pending queue
- Subscriber management
- Responsive design across all screen sizes

## Backend
The backend repo is here: [blog-app-backend](https://github.com/RohitGkmit08/blog-app-backend)

## Local Setup
```bash
npm install
npm run dev
```

Configure your backend URL in `src/services/api.js`.

## Status
Previously deployed on AWS EC2 with Nginx and PM2 (instance stopped).
