// JSON data for all products
const productsData = {
  "newArrivals": [
    {"name": "Goodman White Oversized Tee", "price": 799, "originalPrice": 999, "img": "images/im.webp"},
    {"name": "Fight Club Oversized Tee", "price": 799, "originalPrice": 999, "img": "images/M_6B.webp"},
    {"name": "Sopranos Oversized Tee", "price": 799, "originalPrice": 999, "img": "images/M_1B.webp"},
    {"name": "Nightcrawler Acidwash Oversized Tee", "price": 799, "originalPrice": 999, "img": "images/M_4B.webp"}
  ],
  "recycled": [
    {"name": "Killswitch Engage Tee", "price": 799, "originalPrice": 999, "img": "images/kanisk.webp"},
    {"name": "AC/DC Tee", "price": 799, "originalPrice": 999, "img": "images/Back_776a2721-cf79-41e9-bfc3-5a7008f9d13d.webp"},
    {"name": "Killswitch Engage Tee", "price": 799, "originalPrice": 999, "img": "images/Back_edb71e12-6912-409b-89e8-c11f7344efcf (1).webp"},
    {"name": "Vintage Front Print Tee", "price": 799, "originalPrice": 999, "img": "images/Front.jpg"}
  ]
};

// Function to render products dynamically
function renderProducts(sectionId, productsArray) {
  const container = document.getElementById(sectionId);
  container.innerHTML = productsArray.map(p => `
    <div class="product-card" onclick="openProductDetail('${p.name}', '${p.img}', ${p.price}, ${p.originalPrice})">
      <div class="product-image-container">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <p class="product-name">${p.name}</p>
      <p class="product-price">
        <span class="original-price">Rs. ${p.originalPrice}</span> Rs. ${p.price}
      </p>
    </div>
  `).join('');
}

// Render both sections
renderProducts("newArrivals", productsData.newArrivals);
renderProducts("recycledProducts", productsData.recycled);

// Function to pass selected product data to the detail page
function openProductDetail(name, img, price, originalPrice) {
  const selectedProduct = { name, img, price, originalPrice };
  localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  window.location.href = "product-detail.html";
}
