<<<<<<< HEAD
<img width="1435" height="772" alt="Screenshot 2025-10-14 at 12 21 11 AM" src="https://github.com/user-attachments/assets/29768614-1bcd-412d-8a71-1bbcdb313ba5" />
<img width="1435" height="772" alt="Screenshot 2025-10-14 at 12 21 50 AM" src="https://github.com/user-attachments/assets/c9f1681e-c80b-4f0a-9786-20c556e64a6c" />
<img width="1435" height="772" alt="Screenshot 2025-10-14 at 12 22 27 AM" src="https://github.com/user-attachments/assets/b5d18bbb-34d8-4581-81cc-f7f25456ef65" />
<img width="1435" height="772" alt="Screenshot 2025-10-14 at 12 22 56 AM" src="https://github.com/user-attachments/assets/b33a3a32-2898-461f-ad42-eeace0e1b986" />
<img width="1435" height="772" alt="Screenshot 2025-10-14 at 12 23 19 AM" src="https://github.com/user-attachments/assets/9d874d23-4201-4d59-adb1-865623eb2b15" />
=======
# AnilAmai E-commerce Store

A modern, full-stack e-commerce platform for Tamil cinema fandom merchandise, featuring authentication, wishlist functionality, and subscription management.

## Features

### Frontend
- **Authentication System**: Login/Signup with JWT tokens
- **User Profile Management**: Complete user profiles with address management
- **Wishlist Functionality**: Add/remove products from wishlist, move to cart
- **Shopping Cart**: Add to cart, quantity management, checkout
- **Product Catalog**: Brand-specific stores (Anil & Amai)
- **Subscription System**: Newsletter subscription with preferences
- **Responsive Design**: Mobile-first design with dark/light themes
- **Modern UI**: Built with React, TypeScript, Tailwind CSS, and shadcn/ui

### Backend
- **Express.js API**: RESTful API with JWT authentication
- **User Management**: Registration, login, profile updates
- **Wishlist API**: CRUD operations for user wishlists
- **Subscription Management**: Newsletter subscription handling
- **Admin Endpoints**: User and subscription management
- **Security**: Password hashing, JWT tokens, CORS protection

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui components
- React Router for navigation
- React Query for data fetching
- Lucide React for icons

### Backend
- Node.js with Express.js
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests
- UUID for unique identifiers

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Anil-Amai-1
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   npm install express cors bcryptjs jsonwebtoken uuid concurrently
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or start them separately:
   # Backend (runs on port 3001)
   npm run server
   
   # Frontend (runs on port 5173)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health check: http://localhost:3001/api/health

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add product to wishlist
- `DELETE /api/wishlist/:productId` - Remove product from wishlist
- `POST /api/wishlist/move-to-cart` - Move product to cart

### Subscriptions
- `POST /api/subscribe` - Subscribe to newsletter
- `DELETE /api/subscribe` - Unsubscribe from newsletter

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/subscriptions` - Get all subscriptions (admin only)

## Usage

### Authentication
1. Click "Login" in the header
2. Switch between Login and Sign Up tabs
3. Fill in the required information
4. Upon successful login, you'll see user menu in header

### Wishlist
1. Browse products on any page
2. Click the heart icon to add to wishlist (requires login)
3. View wishlist in user profile
4. Move items from wishlist to cart

### User Profile
1. Click user icon in header after login
2. Select "Profile" to view/edit profile
3. Update personal information and address
4. Manage subscription preferences

### Subscription
1. Scroll to footer and click "Subscribe to Newsletter"
2. Choose notification preferences
3. Subscribe to receive updates

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── AuthModal.tsx  # Login/signup modal
│   ├── Header.tsx     # Navigation header
│   ├── Footer.tsx     # Footer with subscription
│   └── ...
├── contexts/          # React contexts
│   ├── AuthContext.tsx    # Authentication state
│   ├── CartContext.tsx    # Shopping cart state
│   └── WishlistContext.tsx # Wishlist state
├── pages/             # Page components
│   ├── HomePage.tsx
│   ├── UserProfilePage.tsx
│   └── ...
├── hooks/             # Custom React hooks
└── lib/               # Utility functions

server.js              # Express.js backend server
```

## Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=3001
```

## Production Deployment

### Frontend
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend
```bash
# Set environment variables
export JWT_SECRET=your-production-secret
export PORT=3001

# Start the server
node server.js
```

## Security Notes

- Change the JWT_SECRET in production
- Use HTTPS in production
- Implement rate limiting
- Add input validation and sanitization
- Use a proper database (PostgreSQL, MongoDB, etc.)
- Implement proper error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email hello@anilamai.com or create an issue in the repository.
>>>>>>> d8ad530 (updating tshirt designs and dummy backend)
