// JSON data for offers
const offers = [
  {"title": "Flat 25% Off on New Arrivals", "desc": "Get 25% off across all new arrivals this week!", "valid": "Till 31st Oct"},
  {"title": "Free Shipping Above ₹999", "desc": "Shop for ₹999 or more and get free delivery anywhere in India.", "valid": "All Month"},
  {"title": "Buy 2 Get 1 Free – Hoodies", "desc": "Add 3 hoodies to your cart and pay for only 2!", "valid": "This Weekend"}
];

// Generate scrolling clickable offers
const offerBar = document.getElementById("offerText");
offerBar.innerHTML = offers.map((o, i) => `<span class='offer-item' data-index='${i}'>${o.title} (${o.valid}) 🔥 </span>`).join(" ");

// Make each offer clickable
document.querySelectorAll(".offer-item").forEach(item => {
  item.style.cursor = "pointer";
  item.addEventListener("click", () => {
    const index = item.getAttribute("data-index");
    localStorage.setItem("selectedOffer", JSON.stringify(offers[index]));
    window.location.href = "offers.html";
  });
});
