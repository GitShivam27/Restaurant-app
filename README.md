diff --git a/README.md b/README.md
index 31dc135c6ca5690c76269a6a48048987a846ef06..d75e76709cd9895720fc0433401555f625c288a5 100644
--- a/README.md
+++ b/README.md
@@ -1,9 +1,28 @@
-- 👋 Hi, I’m @GitShivam27
-- 🌱 I’m currently learning DevOps AWS
-- 📫Reach me at yshivam59@gmail.com
+# Restaurant Multi Kitchen - Code Files
 
+This repository contains a working codebase for a waiter-focused restaurant ordering app.
 
-<!---
-GitShivam27/GitShivam27 is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
-You can click the Preview link to take a look at your changes.
---->
+## Included code files
+- `index.html` - front-end UI for waiter ordering, billing, and payment
+- `styles.css` - responsive styling for app panels and controls
+- `app.js` - front-end logic with API calls for menu and order submission
+- `server.js` - Node.js backend (no framework) for static files + API endpoints
+
+## Features implemented
+- Table number + customer number input
+- North Indian Veg / Non-Veg menu with dish descriptions
+- Add-to-cart, subtotal, tax, and total
+- Send order to kitchen queue via API
+- Billing payment method: UPI QR / Cash / Card
+
+## API endpoints
+- `GET /api/menu` - returns menu categories and dishes
+- `GET /api/orders` - returns kitchen queue orders
+- `POST /api/orders` - create and queue a new order
+
+## Run the app
+```bash
+node server.js
+```
+Open in browser:
+- `http://localhost:8000`
