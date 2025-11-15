// /js/cart.js (Final Version)

document.addEventListener("DOMContentLoaded", () => {
  // --- CACHED DOM ELEMENTS ---
  const cartItemsBox = document.getElementById("cartItemsBox");
  const cartCount = document.getElementById("cartCount");
  const subtotalEl = document.getElementById("subtotal");
  const discountEl = document.getElementById("discount");
  const shippingEl = document.getElementById("shipping");
  const totalFinalEl = document.getElementById("totalFinal");
  const checkoutBtn = document.getElementById("goPay");

  // Modal Elements
  const modal = document.getElementById("checkoutModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");

  // Step Elements
  const addressStep = document.getElementById("addressStep");
  const paymentStep = document.getElementById("paymentStep");
  const successStep = document.getElementById("successStep");

  // Form & Button Elements
  const addressForm = document.getElementById("addressForm");
  const addressSummary = document.getElementById("addressSummary");
  const backToAddressBtn = document.getElementById("backToAddressBtn");
  const confirmOrderBtn = document.getElementById("confirmOrderBtn");
  const shopAgainBtn = document.getElementById("shopAgainBtn");

  // --- STATE ---
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let shippingAddress = {};

  // --- CART RENDERING LOGIC ---
  function renderCart() {
    // Update cart item count in the header
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    // Disable checkout button if cart is empty
    if (cart.length === 0) {
      cartItemsBox.innerHTML = `<div style="padding:40px; text-align:center;">Your bag is empty.</div>`;
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = 0.5;
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = 1;
    }

    // Generate and display HTML for each cart item
    let html = "";
    let subtotal = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      html += `
        <div class="cart-card">
          <img src="/images/${item.img}" class="cart-img" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100'">
          <div class="cart-info">
            <span class="brand">NMISSION COLLECTION</span><h3>${item.name}</h3>
            <div class="cart-meta">Size: ${item.size}<br>Color: Standard</div>
            <div class="action-links"><span>Save to wishlist</span> | <span onclick="removeItem(${index})">Remove</span></div>
          </div>
          <div class="cart-actions">
            <div class="unit-price">₹${item.price}</div>
            <div class="qty-selector">
              <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
              <div class="qty-val">${item.quantity}</div>
              <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
            </div>
            <div class="total-price">₹${itemTotal}</div>
          </div>
        </div>`;
    });
    cartItemsBox.innerHTML = html;
    updateSummary(subtotal);
  }

  function updateSummary(subtotal) {
    const shipping = subtotal > 0 ? 100 : 0; // Mock shipping cost
    const discount = 0; // Mock discount
    const total = subtotal + shipping - discount;
    subtotalEl.innerText = `₹${subtotal}`;
    shippingEl.innerText = `₹${shipping}`;
    discountEl.innerText = `-₹${discount}`;
    totalFinalEl.innerText = `₹${total}`;
  }

  // --- MODAL & CHECKOUT LOGIC ---
  function openModal() { modal.style.display = 'flex'; }
  function closeModal() { modal.style.display = 'none'; resetModal(); }

  function resetModal() {
    addressStep.style.display = 'block';
    paymentStep.style.display = 'none';
    successStep.style.display = 'none';
    modalTitle.innerText = "Shipping Address";
    addressForm.reset();
  }

  function goToPaymentStep(e) {
    e.preventDefault(); // Prevent form from submitting traditionally
    shippingAddress = {
      name: document.getElementById('fullName').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      pincode: document.getElementById('pincode').value,
    };
    addressSummary.innerText = `Shipping to: ${shippingAddress.name}, ${shippingAddress.address}, ${shippingAddress.city} - ${shippingAddress.pincode}`;
    addressStep.style.display = 'none';
    paymentStep.style.display = 'block';
    modalTitle.innerText = "Confirm Payment";
  }

  function goToAddressStep() {
    addressStep.style.display = 'block';
    paymentStep.style.display = 'none';
    modalTitle.innerText = "Shipping Address";
  }

  // --- SUBMIT ORDER TO BACKEND ---
  async function submitOrder() {
    confirmOrderBtn.disabled = true; // Prevent multiple clicks
    confirmOrderBtn.textContent = "Processing...";

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      alert("Error: Session not found. Please refresh the page.");
      confirmOrderBtn.disabled = false;
      confirmOrderBtn.textContent = "Confirm & Place Order";
      return;
    }

    // This is the complete data object that will be sent to your server
    const orderDetails = {
      sessionId: sessionId,
      customer: shippingAddress,
      items: cart,
      paymentMethod: paymentMethod,
      orderSummary: {
        subtotal: subtotalEl.innerText,
        shipping: shippingEl.innerText,
        discount: discountEl.innerText,
        total: totalFinalEl.innerText
      }
    };

    try {
      // The fetch call to your server's endpoint
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Order successfully saved:", result);
        paymentStep.style.display = 'none';
        successStep.style.display = 'block';
        modalTitle.innerText = "Order Complete";
        localStorage.removeItem('cart'); // Clear cart from browser storage
        cart = []; // Clear the cart in the script
      } else {
        throw new Error(result.message || 'Failed to place order.');
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("There was an issue placing your order: " + error.message);
      confirmOrderBtn.disabled = false;
      confirmOrderBtn.textContent = "Confirm & Place Order";
    }
  }

  // --- EVENT LISTENERS ---
  checkoutBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  addressForm.addEventListener('submit', goToPaymentStep);
  backToAddressBtn.addEventListener('click', goToAddressStep);
  confirmOrderBtn.addEventListener('click', submitOrder);
  shopAgainBtn.addEventListener('click', () => location.reload()); // Reload page to show empty cart

  // --- GLOBAL FUNCTIONS for inline HTML onclick handlers ---
  window.changeQty = (index, change) => {
    if (cart[index].quantity + change > 0) {
      cart[index].quantity += change;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  };

  window.removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  // --- INITIAL PAGE LOAD ---
  renderCart();
});