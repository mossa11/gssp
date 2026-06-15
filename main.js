/*For this checkpoint you’ll have to recreate a shopping cart. In this scenario, it’s a cart in which items have already been preselected and from this particular screen the user is able to apply the following instructions:

You will create The JS needed for a shopping cart  to be fully fonctionnel

Adjust the quantity of each item through  “+” and “-” buttons.
Delete items from the cart.
Like items through a clickable heart-shaped button that will change color accordingly.
See the total price adjusted according to quantity and deletions.*/


// ─── Shopping Cart Logic ────────────────────────────────────────────────────

/**
 * Reads the unit price from a card element.
 * The .unit-price text looks like "100 $" — we strip the " $" and parse.
 */
function getUnitPrice(card) {
  const priceText = card.querySelector(".unit-price").textContent;
  return parseFloat(priceText.replace("$", "").trim());
}

/**
 * Recalculates and updates the total price displayed at the top.
 * Iterates all remaining cards, multiplying each unit price × quantity.
 */
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

// ─── Event Delegation on the product list ───────────────────────────────────

document.querySelector(".list-products").addEventListener("click", (e) => {
  // Always resolve to the <i> element, even if a child SVG/path was clicked
  const icon = e.target.closest("i");
  if (!icon) return;

  // ── "+" button ────────────────────────────────────────────────────────────
  if (icon.classList.contains("fa-plus-circle")) {
    const quantitySpan = icon.parentElement.querySelector(".quantity");
    quantitySpan.textContent = parseInt(quantitySpan.textContent, 10) + 1;
    updateTotal();
    return;
  }

  // ── "−" button ────────────────────────────────────────────────────────────
  if (icon.classList.contains("fa-minus-circle")) {
    const quantitySpan = icon.closest("div").querySelector(".quantity");
    const current = parseInt(quantitySpan.textContent, 10);
    if (current > 0) {
      quantitySpan.textContent = current - 1;
      updateTotal();
    }
    return;
  }

  // ── Trash / Delete button ─────────────────────────────────────────────────
  if (icon.classList.contains("fa-trash-alt")) {
    const outerCardBody = icon.closest(".card-body > .card").parentElement;
    outerCardBody.remove();
    updateTotal();
    return;
  }

  // ── Heart / Like button ───────────────────────────────────────────────────
  if (icon.classList.contains("fa-heart")) {
    icon.classList.toggle("liked");
    return;
  }
});

// ─── Initial total calculation (quantities start at 0, so total = 0) ────────
updateTotal();