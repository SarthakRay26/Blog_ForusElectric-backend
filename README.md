# Scribbles & Scripts - Backend API

## 🚀 Blog Application Backend
This is the backend API for **Scribbles & Scripts**, a modern MERN stack blog application that allows users to create, read, update, and delete blog posts with a beautiful user interface.

## 🛠️ Tech Stack
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud NoSQL database with Mongoose ODM
- **JWT** - JSON Web Token for authentication
- **bcryptjs** - Password hashing library
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

## 📋 Features
- ✅ User registration and authentication
- ✅ JWT-based secure authentication system
- ✅ Password hashing with bcryptjs
- ✅ CRUD operations for blog posts
- ✅ Public blog feed (all users can see each other's posts)
- ✅ Protected routes with middleware
- ✅ Input validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ CORS configuration for frontend integration

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/SarthakRay26/Blog_ForusElectric-backend.git
   cd Blog_ForusElectric-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogapp?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5002
   ```
   
   **Note**: For MongoDB Atlas, use your Atlas connection string. For local MongoDB, use `mongodb://localhost:27017/blogapp`

4. **Database Connection**
   - **MongoDB Atlas**: Use the connection string from your Atlas cluster (recommended for production)
   - **Local MongoDB**: Start with `mongod` and use local connection string

5. **Run the application**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5002`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Posts Routes (`/api/posts`)
- `GET /api/posts` - Get all public posts
- `POST /api/posts` - Create new post (protected)
- `GET /api/posts/my` - Get current user's posts (protected)
- `PUT /api/posts/:id` - Update specific post (protected)
- `DELETE /api/posts/:id` - Delete specific post (protected)

## 🔐 Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📊 Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Post Model
```javascript
{
  title: String (required),
  content: String (required),
  author: ObjectId (ref: 'User'),
  authorName: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Frontend Integration
This backend is designed to work with the frontend React application:
- **Frontend Repository**: [Blog_ForusElectric-frontend](https://github.com/SarthakRay26/Blog_ForusElectric-frontend.git)
- **Frontend URL**: `http://localhost:3001`
- **CORS**: Configured to allow requests from the frontend

## 🔒 Security Features
- Password hashing with bcryptjs
- JWT token-based authentication
- Protected route middleware
- Input validation and sanitization
- Error handling middleware
- CORS configuration

## 📦 Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## 🛠️ Development
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Start production server
npm start
```

## 📄 Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author
**Sarthak Ray** - [GitHub Profile](https://github.com/SarthakRay26)

## 🎯 Project Status
✅ **Production Ready** - This backend API is fully functional and ready for production use with the corresponding frontend application.

---

**Happy Coding! 🚀**