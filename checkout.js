function loadCheckout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<h2 style="color:white;">Your cart is empty</h2>`;
    return;
  }

  let html = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    html += `
      <div class="cart-item">
        <img src="${item.img}" class="cart-img" />

        <div class="item-details">
          <h3>${item.name}</h3>
          <p>Qty: ${item.quantity}</p>
          <p>Price: ₹${item.price}</p>
          <p><b>Total: ₹${item.price * item.quantity}</b></p>

          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  cartItemsDiv.innerHTML = html;
  document.getElementById("subtotal").textContent = "₹" + subtotal;
  document.getElementById("total").textContent = "₹" + subtotal;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCheckout();
}

document.getElementById("checkoutBtn").onclick = () => {
  document.getElementById("checkoutPopup").style.display = "flex";
};

document.getElementById("cancelCheckout").onclick = () => {
  document.getElementById("checkoutPopup").style.display = "none";
};

document.getElementById("confirmOrderBtn").onclick = () => {
  alert("Order Confirmed! Your items will be delivered soon.");
  localStorage.removeItem("cart");
  window.location.href = "/";
};

loadCheckout();
