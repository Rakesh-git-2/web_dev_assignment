/*
 * Shopping Cart Requirements:
 * - Before you start, please run `npm run start:api` to start mock API server
 * - data for mock APIs come from ./db/db.json
 * - There are 2 APIs you need to call:
 *     - http://localhost:4002/cart : this will provide a list of product-ids for current shopping cart
 *     - http://localhost:4002/products : this will provide a list of products with full details
 *
 * We want to display detail of items in shopping carts. i.e: user has added product 1001 and 1004 to the cart.
 * product 1001 is TV and product 1002 is iPad. Thus, we would like to display them in tabular format
 * inside table#shopping-cart-tbl as below:
 * ID     Item
 * 1001   TV
 * 1002   iPad
 *
 * */
const View = {
  apiUrl: "http://localhost:4002",

  // Fetch product IDs from the cart
  fetchCart: async function () {
    const response = await fetch(`${this.apiUrl}/cart`);
    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }
    const cartData = await response.json();
    return cartData.map((item) => item.id);
  },

  // Fetch product details
  fetchProducts: async function () {
    const response = await fetch(`${this.apiUrl}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    return response.json();
  },

  // Display products in the cart
  displayCartItems: function (cartIds, products) {
    const tbodyElem = document
      .getElementById("shopping-cart-tbl")
      .querySelector("tbody");
    tbodyElem.innerHTML = ""; // Clear existing rows

    // Filter and display products that are in the cart
    const productsInCart = products.filter((product) =>
      cartIds.includes(product.id)
    );
    productsInCart.forEach((product) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${product.id}</td><td>${product.name}</td>`;
      tbodyElem.appendChild(tr);
    });
  },

  init: async function () {
    try {
      const cartIds = await this.fetchCart(); // Get cart product IDs
      const products = await this.fetchProducts(); // Get all products
      this.displayCartItems(cartIds, products); // Display the cart items
    } catch (error) {
      console.error("Error initializing shopping cart view:", error);
    }
  },
};

document.addEventListener("DOMContentLoaded", () => View.init());
