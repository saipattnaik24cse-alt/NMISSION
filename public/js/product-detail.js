// ===============================
// READ PRODUCT FROM URL OR LOCAL STORAGE
// ===============================
let productData = JSON.parse(localStorage.getItem("selectedProduct"));

const params = new URLSearchParams(window.location.search);
const productID = params.get("product");

// ALL PRODUCTS
const productList = {
  "im": {
    name: "Goodman White Oversized Tee",
    price: 799,
    originalPrice: 999,
    img: "im.webp"
  },
  "kanisk": {
    name: "Metallica Oversized Hoodie",
    price: 999,
    originalPrice: 1499,
    img: "kanisk.webp"
  },
  "M_1B": {
    name: "Killswitch Engage Tee",
    price: 799,
    originalPrice: 999,
    img: "M_1B.webp"
  },
  "M_4B": {
    name: "Sopranos Oversized Tee",
    price: 799,
    originalPrice: 999,
    img: "M_4B.webp"
  },
  "M_6B": {
    name: "Nightcrawler Acidwash Tee",
    price: 799,
    originalPrice: 999,
    img: "M_6B.webp"
  },
  "slayer": {
    name: "Slayer Oversized Tee",
    price: 799,
    originalPrice: 999,
    img: "Back_776a2721-cf79-41e9-bfc3-5a7008f9d13d.webp"
  }
};

// Save the product clicked
if (productID && productList[productID]) {
  productData = productList[productID];
  localStorage.setItem("selectedProduct", JSON.stringify(productData));
}

// No product found → Stop page
if (!productData) {
  document.body.innerHTML =
    "<h2 style='color:white;text-align:center;margin-top:50px;'>No product selected 😢</h2>";
  throw new Error("No product selected");
}

// ===============================
// DOM ELEMENTS
// ===============================
const productImg = document.getElementById("productImg");
const productName = document.getElementById("productName");
const originalPrice = document.getElementById("originalPrice");
const salePrice = document.getElementById("salePrice");
const discountInfo = document.getElementById("discountInfo");
const moneySaved = document.getElementById("moneySaved");
const quantityValue = document.getElementById("quantityValue");
const totalPrice = document.getElementById("totalPrice");
const addToCartBtn = document.getElementById("addToCartBtn");

let quantity = 1;

// ===============================
// FIX IMAGE PATH
// ===============================
productImg.src = "/images/" + productData.img;

// ===============================
// LOAD PRODUCT INTO PAGE
// ===============================
productName.textContent = productData.name;
originalPrice.textContent = `₹${productData.originalPrice}`;
salePrice.textContent = `₹${productData.price}`;
discountInfo.textContent =
  `${Math.round(((productData.originalPrice - productData.price) /
    productData.originalPrice) * 100)}% OFF`;
moneySaved.textContent = `You save ₹${productData.originalPrice - productData.price}`;
totalPrice.textContent = `Total: ₹${productData.price}`;

// ===============================
// QUANTITY SELECTOR
// ===============================
document.getElementById("increaseBtn").addEventListener("click", () => {
  quantity++;
  quantityValue.textContent = quantity;
  totalPrice.textContent = `Total: ₹${productData.price * quantity}`;
  moneySaved.textContent =
    `You save ₹${(productData.originalPrice - productData.price) * quantity}`;
});

document.getElementById("decreaseBtn").addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityValue.textContent = quantity;
    totalPrice.textContent = `Total: ₹${productData.price * quantity}`;
    moneySaved.textContent =
      `You save ₹${(productData.originalPrice - productData.price) * quantity}`;
  }
});

// ===============================
// SIZE SELECTOR
// ===============================
document.querySelectorAll(".size-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

// ===============================
// ADD TO CART (GUEST MODE → DB + redirect to cart)
// ===============================
addToCartBtn.addEventListener("click", async () => {
  console.log("Add to cart clicked!");

  const size = document.querySelector(".size-btn.selected")?.textContent;
  if (!size) {
    alert("Please select a size");
    return;
  }

  // Generate session ID for guests
  const sessionId = localStorage.getItem("sessionId") || "guest_" + Date.now();
  localStorage.setItem("sessionId", sessionId);

  const payload = {
    sessionId,
    productId: productID,
    name: productData.name,
    price: productData.price,
    size,
    quantity,
    image: "/images/" + productData.img
  };

  console.log("Sending payload:", payload);

  try {
    const response = await fetch("/guest-add-to-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log("Backend Response:", data);

    alert(data.message || "Added to cart!");

    window.location.href = "/cart.html";

  } catch (err) {
    console.error("ERROR:", err);
    alert("Server not responding");
  }
});
// try
// ===============================
// ADD TO CART (BACKEND + LOCAL CART + REDIRECT)
// ===============================
addToCartBtn.addEventListener("click", async () => {

  const size = document.querySelector(".size-btn.selected")?.textContent;
  if (!size) {
    alert("Please select a size");
    return;
  }

  // Generate session ID for guests
  const sessionId = localStorage.getItem("sessionId") || "guest_" + Date.now();
  localStorage.setItem("sessionId", sessionId);

  const payload = {
    sessionId,
    productId: productID,
    name: productData.name,
    price: productData.price,
    size,
    quantity,
    image: "/images/" + productData.img
  };

  // 🔥 SEND TO BACKEND
  try {
    await fetch("/guest-add-to-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn("Backend offline → using local cart only");
  }

  // 🔥 ALSO SAVE IN LOCAL CART (for checkout page UI)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItem = {
    id: Date.now(),  // unique ID
    name: productData.name,
    price: productData.price,
    originalPrice: productData.originalPrice,
    img: productData.img,
    quantity: quantity,
    size: size
  };

  // check if already exists
  const existing = cart.find(item =>
    item.name === cartItem.name && item.size === cartItem.size
  );

  if (existing) {
    existing.quantity += cartItem.quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

window.location.href = "cart.html";

});
