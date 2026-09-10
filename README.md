# Mini Social Post Application

A full-stack social media application where users can create posts, interact with other users, and share content through a public feed.

## Features

- User Signup and Login
- Secure password hashing using bcrypt
- JWT-based authentication
- Create posts with text, image, or both
- Public social feed
- Like and Unlike posts
- Display total likes
- Comment on posts
- Display total comments
- Logout functionality
- Responsive and clean UI
- MongoDB Atlas database

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS

### Database
- MongoDB Atlas

---

## Project Structure

```

social-post/

├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreatePost.jsx
│   │   │   └── CreatePost.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Signup.css
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── Feed.jsx
│   │   │   └── Feed.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── backend/
    ├── models/
    │   ├── User.js
    │   └── Post.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   └── postRoutes.js
    │
    ├── server.js
    └── package.json

```

---

## Authentication

### Signup

Users can create an account using:

- Username
- Email
- Password

Passwords are securely hashed using bcrypt before being stored in MongoDB.

### Login

Users can log in using their email and password.

After successful authentication, a JWT token is generated and stored on the frontend.

## Create Post

Users can create:

- Text-only posts
- Image-only posts
- Posts containing both text and an image

At least one field is required.

## Public Feed

All posts are displayed on the public feed.

Each post displays:

- Username
- Post date
- Text content
- Image, if available
- Like count
- Comment count
- Comments

Posts are displayed with the newest posts first.

## Likes

Users can like and unlike posts.

When a user likes a post, their user ID is stored in the post's likes array and the total like count is updated.

Clicking the Like button again removes the like.

## Comments

Users can comment on any post.

Each comment stores:

- User ID
- Username
- Comment text
- Creation time

The comment count is updated when a new comment is added.

## Database

MongoDB Atlas is used as the database.

The application uses two collections:

- users
- posts

### Users Collection

Stores:

- username
- email
- password

### Posts Collection

Stores:

- userId
- username
- text
- image
- likes
- comments
- createdAt
- updatedAt

## API Endpoints

### Authentication

POST /api/auth/signup

POST /api/auth/login

### Posts

POST /api/post

GET /api/post

PUT /api/post/:id/like

POST /api/post/:id/comment

## Installation

### Clone the repository

```bash
git clone https://github.com/kaurashi/social-post.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd backend
npm install
node server.js
```

The backend runs on:

http://localhost:5000

## Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

## Application Flow

Signup

↓

Login

↓

JWT Authentication

↓

Social Feed

↓

Create Post

↓

Post Saved in MongoDB

↓

Public Feed

↓

Like / Unlike

↓

Comment

↓

Logout

## Responsive Design

The application is designed to work across desktop and mobile screen sizes using responsive CSS.

## Deployment

The frontend can be deployed using Vercel or Netlify.

The backend can be deployed using Render.

MongoDB Atlas is used as the production database.

## Author

Ashmeet Kaur

GitHub: https://github.com/kaurashi