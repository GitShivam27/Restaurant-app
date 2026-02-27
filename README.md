# Restaurant Multi Kitchen - Code Files

This repository contains a working codebase for a waiter-focused restaurant ordering app.

## 📁 Included Code Files
- **index.html** - Front-end UI for waiter ordering, billing, and payment
- **styles.css** - Responsive styling for app panels and controls
- **app.js** - Front-end logic with API calls for menu and order submission
- **server.js** - Node.js backend (no framework) for static files + API endpoints

## ✨ Features Implemented
- Table number + customer number input
- North Indian Veg / Non-Veg menu with dish descriptions
- Add-to-cart, subtotal, tax, and total calculations
- Send order to kitchen queue via API
- Billing payment methods: UPI QR / Cash / Card

## 🔗 API Endpoints
- `GET /api/menu` - Returns menu categories and dishes
- `GET /api/orders` - Returns kitchen queue orders
- `POST /api/orders` - Create and queue a new order

## 🚀 Run the App
```bash
node server.js
```

Open in your browser:
```
http://localhost:8000
```

## 📧 Contact
- Email: yshivam59@gmail.com
- GitHub: [@GitShivam27](https://github.com/GitShivam27)