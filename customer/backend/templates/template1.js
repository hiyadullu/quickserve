function getTemplate1() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"="width=device-width, initial-scale=1.0">
    <title><%= restaurant.name %></title>
    <style>
        /* Define color palette */
        :root {
            --peach: #EDAFB8; /* Updated to peach */
            --light-peach: #F7E1D7;
            --beige: #DEDBD2;
            --sage: #B0C4B1;
            --charcoal: #4A5759;
        }

        body {
            background-color: var(--light-peach);
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
            box-sizing: border-box;
        }

        .container {
            width: 90%;
            max-width: 900px;
            display: flex;
            background-color: var(--beige);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
            position: relative;
            flex-direction: column;
            padding: 20px;
            margin: 20px 0;
        }

        .left-section {
            background-color: var(--peach);
            width: 200px; /* Adjust width as needed */
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            clip-path: circle(60% at left center); /* Ensures a perfect half-circle */
        }

        .right-section {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
        }

        h1 {
            font-size: 32px;
            color: var(--charcoal);
            margin: 0;
        }

        p {
            font-size: 16px;
            color: var(--sage);
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 5px;
        }

        .icon {
            width: 60px;
            height: 60px;
            background-color: var(--peach);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            font-size: 24px;
            color: var(--light-peach);
        }

        /* Decorative stars */
        .decor {
            position: absolute;
            top: 50px;
            left: 80%;
            color: var(--charcoal);
            font-size: 20px;
            transform: rotate(45deg);
        }

        .bottom-decor {
            margin-top: 20px;
            font-size: 20px;
            color: var(--peach);
        }

        /* Additional styling to match your reference */
        .pattern-bg {
            background-image: url('https://www.transparenttextures.com/patterns/asfalt-light.png'); /* Adding a subtle pattern */
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.2;
            z-index: -1;
        }

        /* Order method styles */
        .order-method {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .order-method:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        }

        .order-method h2 {
            margin-bottom: 30px;
            color: var(--charcoal);
            font-size: 1.8rem;
        }

        .table-input {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            max-width: 300px;
            margin: 0 auto;
        }

        .table-input input {
            width: 100%;
            padding: 15px;
            border: 2px solid var(--light-peach);
            border-radius: 8px;
            font-size: 16px;
            color: var(--charcoal);
            background-color: white;
            transition: all 0.3s ease;
            text-align: center;
        }

        .table-input input:focus {
            outline: none;
            border-color: var(--peach);
            box-shadow: 0 0 0 3px rgba(237, 175, 184, 0.2);
        }

        .table-input input::placeholder {
            color: var(--sage);
            opacity: 0.7;
        }

        .table-input button {
            width: 100%;
            padding: 12px 28px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            font-weight: 500;
            letter-spacing: 1px;
            background-color: var(--peach);
            color: white;
        }

        .table-input button:hover {
            background-color: #d69a8a;
            transform: translateY(-2px);
        }

        .table-input button:active {
            transform: translateY(0);
        }

        /* Menu styles */
        .menu {
            display: none;
            margin-top: 40px;
            animation: fadeIn 0.5s ease-out;
        }

        .menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(124,156,48,0.2);
        }

        .menu-header h2 {
            color: #000000;
            font-size: 2rem;
            font-weight: 700;
        }

        .veg-toggle {
            display: flex;
            align-items: center;
            gap: 15px;
            color: #000000;
            font-weight: 500;
        }

        /* Toggle Switch */
        .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 34px;
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background-color: #7c9c30;
        }

        input:focus + .slider {
            box-shadow: 0 0 1px #7c9c30;
        }

        input:checked + .slider:before {
            transform: translateX(26px);
        }

        .section-title {
            color: #7c9c30;
            margin: 40px 0 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #7c9c30;
            font-size: 1.5rem;
            letter-spacing: 1px;
        }

        .menu-items {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
        }

        .menu-item {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            border: 1px solid rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
        }

        .menu-item-image-container {
            width: 100%;
            height: 200px;
            background-color: var(--light-peach);
            border-radius: 8px;
            margin-bottom: 15px;
            overflow: hidden;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .menu-item-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .menu-item-image-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--light-peach);
            color: var(--peach);
            font-size: 24px;
        }

        .menu-item-image-placeholder::before {
            content: "🍽️";
            font-size: 48px;
        }

        .menu-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .menu-item h3 {
            margin-bottom: 12px;
            color: #000000;
            font-size: 1.3rem;
        }

        .menu-item p {
            color: #333;
            margin-bottom: 15px;
            font-size: 14px;
            line-height: 1.6;
        }

        .menu-item .price {
            font-weight: bold;
            color: #7c9c30;
            font-size: 1.1rem;
        }

        .menu-item .item-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }

        .veg-icon {
            width: 20px;
            height: 20px;
            border: 1px solid #7c9c30;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .veg-icon::before {
            content: "•";
            color: #7c9c30;
            font-size: 16px;
        }

        .non-veg-icon {
            width: 20px;
            height: 20px;
            border: 1px solid #000000;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .non-veg-icon::before {
            content: "•";
            color: #000000;
            font-size: 16px;
        }

        .quantity-control {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .quantity-btn {
            background-color: #000000;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .quantity-btn:hover {
            background-color: #40a5b5;
            transform: scale(1.05);
        }

        .quantity {
            font-weight: bold;
            min-width: 30px;
            text-align: center;
        }

        .order-summary {
            display: none;
            background-color: white;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            margin-top: 40px;
            transition: all 0.5s ease;
            opacity: 0;
            transform: translateY(20px);
            width: 80%; /* Make the cart smaller */
        }

        .order-summary:hover {
            opacity: 1;
        }

        .order-summary h3 {
            color: #7c9c30;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
            font-size: 1.5rem;
        }

        .order-detail {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 15px;
        }

        .cart-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px dashed #eee;
        }

        .cart-item-name {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .cart-item-quantity {
            background-color: #7c9c30;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
        }

        .order-total {
            font-weight: bold;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid #eee;
            font-size: 1.1rem;
        }

        /* Animation keyframes */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes popover {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        @keyframes bounce {
            0% { transform: translateY(0); }
            40% { transform: translateY(-15px); }
            60% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
        }

        /* Item added animation */
        .item-added {
            animation: popover 0.4s ease-in-out;
        }

        /* Delivery button animation */
        .delivery-animation {
            animation: bounce 0.6s ease-in-out;
        }

        /* Cart notification bubble */
        .cart-notification {
            position: fixed;
            top: 30px;
            right: 30px;
            background-color: #7c9c30;
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .cart-notification.show {
            opacity: 1;
            transform: translateY(0);
        }

        .inactive-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(255, 0, 0, 0.1);
            color: #d32f2f;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ffcdd2;
            z-index: 1000;
        }

        .inactive-footer p {
            margin: 0;
            font-size: 14px;
        }

        .menu-item.disabled {
            opacity: 1; /* Changed from 0.7 to 1 to make menu items fully visible */
        }

        .quantity-btn.disabled {
            background-color: #ccc;
            cursor: not-allowed;
            opacity: 0.5;
        }

        .primary-button {
            background-color: var(--peach);
            color: white;
            padding: 12px 28px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            font-weight: 500;
            letter-spacing: 1px;
            width: 100%;
            margin-top: 20px;
        }

        .primary-button:hover {
            background-color: #d69a8a;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .primary-button:active {
            transform: translateY(0);
        }

        .primary-button.disabled {
            background-color: #ccc;
            cursor: not-allowed;
            opacity: 0.5;
        }

        /* Cart Modal Styles */
        .cart-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .cart-modal.show {
            display: flex;
        }

        .cart-content {
            background-color: white;
            border-radius: 12px;
            padding: 30px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }

        .cart-header h2 {
            color: var(--charcoal);
            margin: 0;
        }

        .close-cart {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--charcoal);
            padding: 5px;
        }

        .cart-items {
            margin-bottom: 20px;
        }

        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }

        .cart-item-info {
            flex: 1;
        }

        .cart-item-name {
            font-weight: 500;
            margin-bottom: 5px;
        }

        .cart-item-price {
            color: var(--charcoal);
            font-size: 0.9em;
        }

        .cart-item-controls {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .cart-quantity-btn {
            background-color: var(--peach);
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
        }

        .cart-quantity {
            min-width: 30px;
            text-align: center;
        }

        .cart-total {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid var(--peach);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .cart-total-label {
            font-size: 1.2em;
            font-weight: 500;
        }

        .cart-total-amount {
            font-size: 1.4em;
            font-weight: 600;
            color: var(--charcoal);
        }

        .cart-actions {
            display: flex;
            gap: 15px;
            margin-top: 25px;
        }

        .cart-actions button {
            flex: 1;
            padding: 12px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .continue-shopping {
            background-color: var(--light-peach);
            color: var(--charcoal);
        }

        .proceed-payment {
            background-color: var(--peach);
            color: white;
        }

        .cart-actions button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="left-section">
            <div class="decor">✦✦✦✦</div>
        </div>
        <div class="right-section">
            <div class="icon">⛩</div>
            <h1><%= restaurant.name %></h1>
            <p>Eat, Feast, Repeat</p>
            <div class="bottom-decor">✦✦✦✦</div>
        </div>
    </div>
    <div class="pattern-bg"></div>

    <div class="order-method" id="orderMethod">
        <h2>Please enter your table number</h2>
        <div class="table-input">
            <input type="number" id="tableNumber" placeholder="Enter table number" min="1" required>
            <button class="primary-button" onclick="submitTableNumber()">Continue</button>
        </div>
    </div>

    <div class="menu" id="menuSection" style="display: none;">
        <div class="menu-header">
            <h2>Our Menu</h2>
        </div>
        
        <% if (menuItems && menuItems.length > 0) { %>
            <% const bestSellers = menuItems.filter(item => item.categrory === 'best_seller'); %>
            <% if (bestSellers.length > 0) { %>
                <h3 class="section-title">Best Sellers</h3>
                <div class="menu-items" id="bestSellers">
                    <% bestSellers.forEach(item => { %>
                        <% if (item.available) { %>
                            <div class="menu-item">
                                <div class="menu-item-image-container">
                                    <% if (item.image_url) { %>
                                        <img src="<%= item.image_url %>" alt="<%= item.name %>" class="menu-item-image">
                                    <% } else { %>
                                        <div class="menu-item-image-placeholder"></div>
                                    <% } %>
                                </div>
                                <h3><%= item.name %></h3>
                                <p><%= item.description %></p>
                                <div class="item-footer">
                                    <span class="price">$<%= parseFloat(item.price).toFixed(2) %></span>
                                    <div class="quantity-control">
                                        <div class="quantity-btn" onclick="decrementItem('<%- item.name %>', <%- item.price %>)">-</div>
                                        <div class="quantity" id="qty-<%- item.name.replace(/\s+/g, '-') %>">0</div>
                                        <div class="quantity-btn" onclick="incrementItem('<%- item.name %>', <%- item.price %>)">+</div>
                                    </div>
                                </div>
                            </div>
                        <% } %>
                    <% }); %>
                </div>
            <% } %>

            <% const foodItems = menuItems.filter(item => item.categrory === 'food' && item.available); %>
            <% if (foodItems.length > 0) { %>
                <h3 class="section-title">Food</h3>
                <div class="menu-items" id="food">
                    <% foodItems.forEach(item => { %>
                        <div class="menu-item">
                            <div class="menu-item-image-container">
                                <% if (item.image_url) { %>
                                    <img src="<%= item.image_url %>" alt="<%= item.name %>" class="menu-item-image">
                                <% } else { %>
                                    <div class="menu-item-image-placeholder"></div>
                                <% } %>
                            </div>
                            <h3><%= item.name %></h3>
                            <p><%= item.description %></p>
                            <div class="item-footer">
                                <span class="price">$<%= parseFloat(item.price).toFixed(2) %></span>
                                <div class="quantity-control">
                                    <div class="quantity-btn" onclick="decrementItem('<%- item.name %>', <%- item.price %>)">-</div>
                                    <div class="quantity" id="qty-<%- item.name.replace(/\s+/g, '-') %>">0</div>
                                    <div class="quantity-btn" onclick="incrementItem('<%- item.name %>', <%- item.price %>)">+</div>
                                </div>
                            </div>
                        </div>
                    <% }); %>
                </div>
            <% } %>

            <% const dessertItems = menuItems.filter(item => item.categrory === 'dessert' && item.available); %>
            <% if (dessertItems.length > 0) { %>
                <h3 class="section-title">Desserts</h3>
                <div class="menu-items" id="desserts">
                    <% dessertItems.forEach(item => { %>
                        <div class="menu-item">
                            <div class="menu-item-image-container">
                                <% if (item.image_url) { %>
                                    <img src="<%= item.image_url %>" alt="<%= item.name %>" class="menu-item-image">
                                <% } else { %>
                                    <div class="menu-item-image-placeholder"></div>
                                <% } %>
                            </div>
                            <h3><%= item.name %></h3>
                            <p><%= item.description %></p>
                            <div class="item-footer">
                                <span class="price">$<%= parseFloat(item.price).toFixed(2) %></span>
                                <div class="quantity-control">
                                    <div class="quantity-btn" onclick="decrementItem('<%- item.name %>', <%- item.price %>)">-</div>
                                    <div class="quantity" id="qty-<%- item.name.replace(/\s+/g, '-') %>">0</div>
                                    <div class="quantity-btn" onclick="incrementItem('<%- item.name %>', <%- item.price %>)">+</div>
                                </div>
                            </div>
                        </div>
                    <% }); %>
                </div>
            <% } %>
        <% } else { %>
            <div class="no-items-message">
                <p>No menu items available at this time.</p>
            </div>
        <% } %>
    </div>

    <div class="order-summary" id="orderSummary">
        <h3>Your Order</h3>
        <div id="orderItems"></div>
        <div class="order-detail order-total">
            <span>Total:</span>
            <span id="orderTotal">$0.00</span>
        </div>
        <button class="primary-button" style="margin-top: 20px; width: 100%;" onclick="showCartPage()">View Cart & Place Order</button>
    </div>

    <div class="cart-notification" id="cartNotification">Item added to cart!</div>

    <% if (restaurant.status === 'inactive') { %>
        <div class="inactive-footer">
            <p>This restaurant is currently not accepting orders. You can still browse the menu.</p>
        </div>
    <% } %>

    <!-- Add Cart Modal -->
    <div class="cart-modal" id="cartModal">
        <div class="cart-content">
            <div class="cart-header">
                <h2>Your Cart</h2>
                <button class="close-cart" onclick="closeCart()">&times;</button>
            </div>
            <div class="cart-items" id="cartItemsList">
                <!-- Cart items will be populated here -->
            </div>
            <div class="cart-total">
                <span class="cart-total-label">Total:</span>
                <span class="cart-total-amount" id="cartTotalAmount">$0.00</span>
            </div>
            <div class="cart-actions">
                <button class="continue-shopping" onclick="closeCart()">Continue Shopping</button>
                <button class="proceed-payment" onclick="proceedToPayment()">Proceed to Payment</button>
            </div>
        </div>
    </div>

    <script>
        // Store cart items and table number
        let cart = {};
        let tableNumber = "";
        const restaurantStatus = '<%= restaurant.status %>';
        const restaurantId = '<%= restaurant.id %>';

        // Initialize the page with restaurant status
        document.addEventListener('DOMContentLoaded', function() {
            // Load cart from localStorage if it exists
            const savedCart = localStorage.getItem(\`cart-\${restaurantId}\`);
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateOrderSummary();
                updateQuantityDisplays();
            }

            if (restaurantStatus === 'inactive') {
                // Disable all quantity buttons
                const quantityButtons = document.querySelectorAll('.quantity-btn');
                quantityButtons.forEach(button => {
                    button.classList.add('disabled');
                });

                // Disable place order button
                const placeOrderButton = document.querySelector('.primary-button[onclick="showCartPage()"]');
                if (placeOrderButton) {
                    placeOrderButton.classList.add('disabled');
                }
            }
        });

        function updateQuantityDisplays() {
            for (const itemName in cart) {
                const itemId = itemName.replace(/\s+/g, '-');
                const qtyElement = document.getElementById(\`qty-\${itemId}\`);
                if (qtyElement) {
                    qtyElement.textContent = cart[itemName].quantity;
                }
            }
        }

        function submitTableNumber() {
            const input = document.getElementById('tableNumber');
            const number = parseInt(input.value);
            
            if (!number || number < 1) {
                alert('Please enter a valid table number');
                return;
            }

            tableNumber = number;

            // Hide table input section with fade out
            const orderMethodSection = document.getElementById('orderMethod');
            orderMethodSection.style.opacity = '0';
            orderMethodSection.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                orderMethodSection.style.display = 'none';

                // Show menu and order summary with animations
                const menuSection = document.getElementById('menuSection');
                const orderSummary = document.getElementById('orderSummary');

                menuSection.style.display = 'block';
                orderSummary.style.display = 'block';

                // Trigger animations
                setTimeout(() => {
                    orderSummary.style.opacity = '0.95';
                    orderSummary.style.transform = 'translateY(0)';
                }, 100);
            }, 300);

            // Set table number in summary
            updateOrderSummary();
        }

        function saveCartToLocalStorage() {
            localStorage.setItem(\`cart-\${restaurantId}\`, JSON.stringify(cart));
        }

        function incrementItem(itemName, price) {
            if (restaurantStatus === 'inactive') return;
            
            const itemId = itemName.replace(/\s+/g, '-');
            const qtyElement = document.getElementById(\`qty-\${itemId}\`);

            // Initialize the item in the cart if it doesn't exist
            if (!cart[itemName]) {
                cart[itemName] = {
                    name: itemName,
                    price: price,
                    quantity: 0
                };
            }

            // Increment the quantity
            cart[itemName].quantity += 1;
            qtyElement.textContent = cart[itemName].quantity;

            // Save to localStorage
            saveCartToLocalStorage();

            showCartNotification(itemName);
            updateOrderSummary();
            flashCartEffect();
        }

        function decrementItem(itemName, price) {
            if (restaurantStatus === 'inactive') return;
            
            if (!cart[itemName] || cart[itemName].quantity <= 0) return;

            const itemId = itemName.replace(/\s+/g, '-');
            const qtyElement = document.getElementById(\`qty-\${itemId}\`);

            // Decrement the quantity
            cart[itemName].quantity -= 1;
            qtyElement.textContent = cart[itemName].quantity;

            // Remove the item from the cart if the quantity is 0
            if (cart[itemName].quantity === 0) {
                delete cart[itemName];
            }

            // Save to localStorage
            saveCartToLocalStorage();

            updateOrderSummary();
            flashCartEffect();
        }

        function showCartPage() {
            if (restaurantStatus === 'inactive') {
                alert('This restaurant is currently not accepting orders.');
                return;
            }

            if (!tableNumber) {
                alert('Please enter your table number first.');
                return;
            }

            const itemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
            if (itemCount === 0) {
                alert('Please add items to your cart before placing an order.');
                return;
            }

            // Show the cart modal
            const cartModal = document.getElementById('cartModal');
            cartModal.classList.add('show');
            
            // Update cart display
            updateCartDisplay();
        }

        function closeCart() {
            const cartModal = document.getElementById('cartModal');
            cartModal.classList.remove('show');
        }

        function updateCartDisplay() {
            const cartItemsList = document.getElementById('cartItemsList');
            const cartTotalAmount = document.getElementById('cartTotalAmount');
            
            let html = '';
            let total = 0;

            for (const itemName in cart) {
                const item = cart[itemName];
                if (item.quantity > 0) {
                    total += item.price * item.quantity;
                    html += \`
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <div class="cart-item-name">\${item.name}</div>
                                <div class="cart-item-price">\$\${item.price.toFixed(2)} each</div>
                            </div>
                            <div class="cart-item-controls">
                                <button class="cart-quantity-btn" onclick="decrementCartItem('\${itemName}')">-</button>
                                <span class="cart-quantity">\${item.quantity}</span>
                                <button class="cart-quantity-btn" onclick="incrementCartItem('\${itemName}')">+</button>
                            </div>
                        </div>
                    \`;
                }
            }

            cartItemsList.innerHTML = html;
            cartTotalAmount.textContent = \`\$\${total.toFixed(2)}\`;
        }

        function incrementCartItem(itemName) {
            if (restaurantStatus === 'inactive') return;
            
            if (!cart[itemName]) {
                cart[itemName] = {
                    name: itemName,
                    price: cart[itemName].price,
                    quantity: 0
                };
            }

            cart[itemName].quantity += 1;
            saveCartToLocalStorage();
            updateCartDisplay();
            updateOrderSummary();
            updateQuantityDisplays();
        }

        function decrementCartItem(itemName) {
            if (restaurantStatus === 'inactive') return;
            
            if (!cart[itemName] || cart[itemName].quantity <= 0) return;

            cart[itemName].quantity -= 1;
            if (cart[itemName].quantity === 0) {
                delete cart[itemName];
            }

            saveCartToLocalStorage();
            updateCartDisplay();
            updateOrderSummary();
            updateQuantityDisplays();
        }

        function proceedToPayment() {
            if (restaurantStatus === 'inactive') {
                alert('This restaurant is currently not accepting orders.');
                return;
            }

            if (!tableNumber) {
                alert('Please enter your table number first.');
                return;
            }

            const itemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
            if (itemCount === 0) {
                alert('Please add items to your cart before placing an order.');
                return;
            }

            // Prepare the order data
            const orderData = {
                restaurantId: restaurantId,
                restaurantName: '<%= restaurant.name %>',
                tableNumber: tableNumber,
                items: cart,
                total: Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };

            // Create a form to submit the data
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = \`/customer/\${restaurantId}/payment\`;

            // Add order data as hidden fields
            Object.entries(orderData).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = typeof value === 'object' ? JSON.stringify(value) : value;
                form.appendChild(input);
            });

            // Add the form to the document and submit it
            document.body.appendChild(form);
            form.submit();
        }

        function updateOrderSummary() {
            const orderItemsDiv = document.getElementById('orderItems');
            const orderTotalSpan = document.getElementById('orderTotal');

            // Start with table number
            let html = \`<div class="order-detail">
                <span>Table Number:</span>
                <span>\${tableNumber}</span>
            </div>\`;

            // Add items to summary
            let total = 0;

            for (const itemName in cart) {
                const item = cart[itemName];
                if (item.quantity > 0) {
                    html += \`<div class="cart-item">
                        <div class="cart-item-name">
                            <div class="cart-item-quantity">\${item.quantity}</div>
                            <span>\${item.name}</span>
                        </div>
                        <span>\$\${(item.price * item.quantity).toFixed(2)}</span>
                    </div>\`;
                    total += item.price * item.quantity;
                }
            }

            orderItemsDiv.innerHTML = html;
            orderTotalSpan.textContent = \`\$\${total.toFixed(2)}\`;
        }

        function showCartNotification(itemName) {
            const notification = document.getElementById('cartNotification');
            notification.textContent = \`\${itemName} added to cart!\`;
            notification.classList.add('show');

            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }

        function flashCartEffect() {
            const orderSummary = document.getElementById('orderSummary');
            orderSummary.style.boxShadow = '0 4px 25px rgba(124,156,48,0.4)';
            setTimeout(() => {
                orderSummary.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            }, 300);
        }
    </script>
</body>
</html>`;
}

export { getTemplate1 };