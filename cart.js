// ─── Shopping Cart Logic ────────────────────────────────────────────────────

function getUnitPrice(card) {
  const priceText = card.querySelector(".unit-price").textContent;
  return parseFloat(priceText.replace("$", "").trim());
}

function updateTotal() {
  const cards = document.querySelectorAll(".card-body > .card");
  let total = 0;

  cards.forEach((card) => {
    const qty = parseInt(card.querySelector(".quantity").textContent, 10);
    const price = getUnitPrice(card);
    total += qty * price;
  });

  document.getElementById("totalprice").textContent = total + " $";
}

// ─── Event Delegation on the product list 

document.querySelector(".list-products").addEventListener("click", (e) => {
  // Always resolve to the <i> element, even if a child SVG/path was clicked
  const icon = e.target.closest("i");
  if (!icon) return;

  // ── "+" button 
  if (icon.classList.contains("fa-plus-circle")) {
    const quantitySpan = icon.parentElement.querySelector(".quantity");
    const current = parseInt(quantitySpan.textContent, 10);
    quantitySpan.textContent = current + 1;
    updateTotal();
    return;
  }

  // ── "−" button 
  if (icon.classList.contains("fa-minus-circle")) {
    const quantitySpan = icon.parentElement.querySelector(".quantity");
    const current = parseInt(quantitySpan.textContent, 10);
    if (current > 0) {
      quantitySpan.textContent = current - 1;
      updateTotal();
    }
    return;
  }

  // ── Trash / Delete button 
  if (icon.classList.contains("fa-trash-alt")) {
    const outerCardBody = icon.closest(".card-body > .card").parentElement;
    outerCardBody.remove();
    updateTotal();
    return;
  }

  // ── Heart / Like button 
  if (icon.classList.contains("fa-heart")) {
    icon.classList.toggle("liked");
    return;
  }
});

// ─── Initial total calculation (quantities start at 0, so total = 0) 
updateTotal();
