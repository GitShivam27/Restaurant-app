let menu = { veg: [], nonveg: [] };
let activeCategory = 'veg';
const cart = new Map();

const menuList = document.getElementById('menuList');
const cartList = document.getElementById('cartList');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const kitchenQueue = document.getElementById('kitchenQueue');
const paymentMode = document.getElementById('paymentMode');
const upiBox = document.getElementById('upiBox');
const appStatus = document.getElementById('appStatus');

function setStatus(message, isError = false) {
  appStatus.textContent = message;
  appStatus.classList.toggle('error', isError);
}

async function loadMenu() {
  try {
    const response = await fetch('/api/menu');
    if (!response.ok) {
      throw new Error('Could not load menu');
    }
    menu = await response.json();
    renderMenu();
    setStatus('Menu loaded from API');
  } catch (error) {
    setStatus('Failed to load menu API', true);
  }
}

async function loadKitchenQueue() {
  try {
    const response = await fetch('/api/orders');
    if (!response.ok) {
      throw new Error('Could not load orders');
    }
    const data = await response.json();
    kitchenQueue.innerHTML = '';
    data.orders.forEach((order) => {
      const li = document.createElement('li');
      li.textContent = `#${order.id} Table ${order.tableNo} (${order.customerPhone || 'No phone'}) - ${order.items.length} items - Status: ${order.status}`;
      kitchenQueue.appendChild(li);
    });
  } catch (error) {
    setStatus('Failed to load kitchen queue', true);
  }
}

function renderMenu() {
  menuList.innerHTML = '';
  (menu[activeCategory] || []).forEach((item) => {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <small>${item.desc}</small>
        <small>₹${item.price}</small>
      </div>
      <button>Add</button>`;
    card.querySelector('button').addEventListener('click', () => addItem(item));
    menuList.appendChild(card);
  });
}

function addItem(item) {
  const existing = cart.get(item.id) || { ...item, qty: 0 };
  existing.qty += 1;
  cart.set(item.id, existing);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = '';
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.qty;
    const li = document.createElement('li');
    li.textContent = `${item.name} x ${item.qty} = ₹${item.price * item.qty}`;
    cartList.appendChild(li);
  });
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;
  subtotalEl.textContent = subtotal;
  taxEl.textContent = tax;
  totalEl.textContent = total;
}

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.category;
    renderMenu();
  });
});

document.getElementById('sendToKitchen').addEventListener('click', async () => {
  const tableNo = document.getElementById('tableNo').value;
  const customerPhone = document.getElementById('customerPhone').value;
  const items = Array.from(cart.values());

  if (!tableNo || items.length === 0) {
    alert('Please enter table number and add at least one dish.');
    return;
  }

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tableNo, customerPhone, items })
    });

    if (!response.ok) {
      throw new Error('Order submission failed');
    }

    await loadKitchenQueue();
    alert('Order sent to kitchen.');
    setStatus('Order saved and sent to kitchen');
  } catch (error) {
    setStatus('Failed to send order to kitchen', true);
  }
});

document.getElementById('clearOrder').addEventListener('click', () => {
  cart.clear();
  renderCart();
});

paymentMode.addEventListener('change', () => {
  upiBox.style.display = paymentMode.value === 'upi_qr' ? 'block' : 'none';
});

document.getElementById('markPaid').addEventListener('click', () => {
  const status = document.getElementById('paymentStatus');
  status.textContent = `Payment Paid via ${paymentMode.value}`;
  status.classList.add('paid');
});

loadMenu();
loadKitchenQueue();
renderCart();

