let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addToCart(name, price) {

    const existingProduct = cart.find(function(product) {
        return product.name === name;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();
}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(name) {

    const product = cart.find(function(product) {
        return product.name === name;
    });

    if (product) {

        product.quantity++;

    }

    updateCart();
}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(name) {

    const product = cart.find(function(product) {
        return product.name === name;
    });

    if (product) {

        product.quantity--;

        if (product.quantity <= 0) {

            removeFromCart(name);

            return;
        }
    }

    updateCart();
}


// ========================================
// REMOVE PRODUCT
// ========================================

function removeFromCart(name) {

    cart = cart.filter(function(product) {
        return product.name !== name;
    });

    updateCart();
}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    // Cart elements
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    // Checkout elements
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");


    // ========================================
    // CART PAGE
    // ========================================

    if (cartItems) {

        cartItems.innerHTML = "";

        let total = 0;


        if (cart.length === 0) {

            cartItems.innerHTML =
                "<p>Your cart is empty.</p>";

        }


        cart.forEach(function(product) {

            const itemTotal =
                product.price * product.quantity;

            total += itemTotal;


            const item =
                document.createElement("div");

            item.className = "cart-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <p>
                        Rs. ${product.price} × ${product.quantity}
                    </p>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity('${product.name}')">
                        −
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity('${product.name}')">
                        +
                    </button>


                    <button
                        onclick="removeFromCart('${product.name}')">
                        Remove
                    </button>

                </div>


                <strong>
                    Rs. ${itemTotal}
                </strong>

            `;


            cartItems.appendChild(item);

        });


        cartTotal.textContent = total;

    }


    // ========================================
    // CART COUNT
    // ========================================

    if (cartCount) {

        let totalQuantity = 0;


        cart.forEach(function(product) {

            totalQuantity += product.quantity;

        });


        cartCount.textContent = totalQuantity;

    }


    // ========================================
    // CHECKOUT PAGE
    // ========================================

    if (checkoutItems && checkoutTotal) {

        checkoutItems.innerHTML = "";

        let checkoutTotalAmount = 0;


        if (cart.length === 0) {

            checkoutItems.innerHTML =
                "<p>Your cart is empty.</p>";

        }


        cart.forEach(function(product) {

            const itemTotal =
                product.price * product.quantity;


            const checkoutItem =
                document.createElement("div");

            checkoutItem.className =
                "checkout-item";


            checkoutItem.innerHTML = `

                <span>
                    ${product.name} × ${product.quantity}
                </span>


                <strong>
                    Rs. ${itemTotal}
                </strong>

            `;


            checkoutItems.appendChild(checkoutItem);

            checkoutTotalAmount += itemTotal;

        });


        checkoutTotal.textContent =
            checkoutTotalAmount;

    }


    // ========================================
    // SAVE CART TO LOCAL STORAGE
    // ========================================

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ========================================
// CHECKOUT FORM
// ========================================

const checkoutForm =
    document.getElementById("checkout-form");


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Check cart

            if (cart.length === 0) {

                alert(
                    "Your cart is empty. Please add a product first."
                );

                return;

            }


            // Customer details

            const name =
                document.getElementById(
                    "customer-name"
                ).value;

            const phone =
                document.getElementById(
                    "customer-phone"
                ).value;

            const address =
                document.getElementById(
                    "customer-address"
                ).value;

            const payment =
                document.getElementById(
                    "payment-method"
                ).value;


            // Calculate total

            let orderTotal = 0;


            cart.forEach(function(product) {

                orderTotal +=
                    product.price *
                    product.quantity;

            });


            // Order confirmation

            alert(

                "Order Placed Successfully!\n\n" +

                "Customer: " +
                name +
                "\n" +

                "Phone: " +
                phone +
                "\n" +

                "Address: " +
                address +
                "\n" +

                "Payment: " +
                payment +
                "\n" +

                "Total: Rs. " +
                orderTotal

            );


            // Clear cart

            cart = [];


            // Update page

            updateCart();


            // Clear form

            checkoutForm.reset();

        }
    );

}


// ========================================
// LOAD CART WHEN PAGE OPENS
// ========================================

updateCart();