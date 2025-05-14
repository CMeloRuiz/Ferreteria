const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.getElementById("cart-close");
const addCartButtons = document.querySelectorAll(".add-cart");
const cartContent = document.querySelector(".cart-content");
const buyNowButton = document.querySelector(".btn-buy");
let cartItemCount = 0;


function addToCart(productItem) {
    const productImgSrc = productItem.querySelector("img").src;
    const productTitle = productItem.querySelector("h3").textContent;
    const productPrice = productItem.querySelector("p").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item is already in the cart.");
            return;
        };
    };

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src=${productImgSrc} class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    // Remove element
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateCartCount(-1);
        updateTotalPrice();
    });

    // Add quantity
    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            };
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        };

        numberElement.textContent = quantity;
        updateTotalPrice();
    });

    updateCartCount(1);
    updateTotalPrice();
}


function updateTotalPrice() {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantiyElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("$", "");
        const quantity = quantiyElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `$${total}`;
}


function updateCartCount(change) {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    };
}


cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productItem = event.target.closest(".product-item")
        addToCart(productItem);
    });
});

buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    };

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);
    updateTotalPrice();
    alert("Thank you for your purchase!");
});

