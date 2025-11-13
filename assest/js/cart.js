import header from "../utils/utils.js";

let productCart = document.querySelector(".cart .row");
let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

const displayProduct = () => {
  productCart.innerHTML = "";

  if (cartData.length === 0) {
    productCart.innerHTML = `
      <div class="text-center py-5">
        <h4>Your cart is empty 🛒</h4>
        <a href="/index.html" class="btn btn-primary mt-3">Shop Now</a>
      </div>`;
    updateCartTotal();
    return;
  }

  cartData.forEach((product) => {
    const { image, pname, price, qty, id } = product;

    let col = document.createElement("div");
    col.classList.add("col-md-8", "mb-4");

    col.innerHTML = `
      <div class="card product-cart h-100 bg-white p-4 shadow-sm">
        <div class="d-flex align-items-center justify-content-between gap-4 flex-wrap">
          <div class="d-flex align-items-center gap-4 flex-grow-1">
            <img src="${image}" class="rounded" height="100" width="100" alt="${pname}" />
            <div>
              <h5 class="mb-1">${pname}</h5>
              <span class="d-block mb-2 text-success fw-semibold">₹${price}</span>
              <div class="d-flex align-items-center gap-2">
                <label class="fw-semibold">Qty:</label>
                <input 
                  type="number" 
                  id="qty-${id}" 
                  min="1" 
                  value="${qty}" 
                  class="form-control w-25" 
                  onchange="updateQty(${id})"
                />
              </div>
            </div>
          </div>
          <div class="text-end">
            <h6 class="fw-semibold text-secondary mb-2">Subtotal: ₹${price * qty}</h6>
            <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${id})">
              <i class="bi bi-trash"></i> Remove
            </button>
          </div>
        </div>
      </div>
    `;

    productCart.appendChild(col);
  });

  updateCartTotal();
};

const updateQty = (id) => {
  let newQty = parseInt(document.querySelector(`#qty-${id}`).value);
  if (newQty < 1) newQty = 1;

  let product = cartData.find((item) => item.id === id);
  if (product) {
    product.qty = newQty;
    localStorage.setItem("cartData", JSON.stringify(cartData));
    displayProduct();
  }
};
window.updateQty = updateQty;

window.removeFromCart = (id) => {
  cartData = cartData.filter((item) => item.id !== id);
  localStorage.setItem("cartData", JSON.stringify(cartData));
  displayProduct();
  updateCartCount();
};

const updateCartTotal = () => {
  let total = 0;
  cartData.forEach((item) => {
    total += item.price * item.qty;
  });

  let totalContainer = document.querySelector(".cart-total");

  if (cartData.length === 0) {
    if (totalContainer) totalContainer.remove();
    return;
  }

  if (!totalContainer) {
    totalContainer = document.createElement("div");
    totalContainer.classList.add("cart-total", "col-md-8", "mt-4");
    productCart.appendChild(totalContainer);
  }

  totalContainer.innerHTML = `
    <div class="card p-4 bg-light shadow-sm">
      <h4 class="fw-semibold text-end">Total Amount: ₹${total}</h4>
      <div class="text-end mt-3">
        <button class="btn btn-danger">Proceed to Checkout</button>
      </div>
    </div>
  `;
};

const updateCartCount = () => {
  let badge = document.querySelector(".badge.bg-danger");
  if (badge) badge.textContent = cartData.length;
};

displayProduct();
updateCartCount();