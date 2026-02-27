const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;

const menu = {
  veg: [
    { id: 1, name: 'Paneer Butter Masala', desc: 'Rich tomato gravy with butter paneer cubes', price: 280 },
    { id: 2, name: 'Dal Makhani', desc: 'Slow-cooked black lentils in creamy sauce', price: 220 },
    { id: 3, name: 'Jeera Rice', desc: 'Basmati rice tempered with cumin', price: 150 },
    { id: 4, name: 'Butter Naan', desc: 'Soft tandoor naan topped with butter', price: 60 }
  ],
  nonveg: [
    { id: 5, name: 'Butter Chicken', desc: 'Chicken in creamy tomato butter sauce', price: 320 },
    { id: 6, name: 'Chicken Curry', desc: 'Classic north Indian chicken curry', price: 290 },
    { id: 7, name: 'Mutton Rogan Josh', desc: 'Aromatic Kashmiri-style mutton curry', price: 390 },
    { id: 8, name: 'Egg Curry', desc: 'Boiled eggs in spiced onion tomato gravy', price: 210 }
  ]
};

const orders = [];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript'
  }[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/menu') {
    sendJson(res, 200, menu);
    return;
  }

  if (req.method === 'GET' && req.url === '/api/orders') {
    sendJson(res, 200, { orders });
    return;
  }

  if (req.method === 'POST' && req.url === '/api/orders') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const order = {
          id: orders.length + 1,
          tableNo: payload.tableNo,
          customerPhone: payload.customerPhone || '',
          items: payload.items || [],
          status: 'New',
          createdAt: new Date().toISOString()
        };

        if (!order.tableNo || order.items.length === 0) {
          sendJson(res, 400, { message: 'tableNo and items are required' });
          return;
        }

        orders.unshift(order);
        sendJson(res, 201, { order });
      } catch (error) {
        sendJson(res, 400, { message: 'Invalid JSON payload' });
      }
    });
    return;
  }

  const safePath = req.url === '/' ? '/index.html' : req.url;
  const fullPath = path.join(process.cwd(), safePath);
  serveFile(res, fullPath);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
