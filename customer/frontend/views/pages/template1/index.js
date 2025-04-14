// This script connects the QuickServe order page to the payment page

// Function to handle order placement
function handlePlaceOrder() {
    // Get the current cart total
    const orderTotalElement = document.getElementById('orderTotal');
    if (!orderTotalElement) return;
    
    // Extract the total amount (remove $ and convert to number)
    const totalAmount = orderTotalElement.textContent.replace('$', '');
    
    // Store the order total in localStorage so the payment page can access it
    localStorage.setItem('quickServeOrderTotal', totalAmount);
    
    // Navigate to the payment page
    window.location.href = 'paymentpage.html';
}

// Function to initialize the payment page
function initializePaymentPage() {
    // Check if we're on the payment page
    const orderTotalDisplay = document.getElementById('orderTotalDisplay');
    if (!orderTotalDisplay) return;
    
    // Get the order total from localStorage
    const totalAmount = localStorage.getItem('quickServeOrderTotal');
    
    // If we have a total amount, update the display
    if (totalAmount) {
        orderTotalDisplay.innerText = `Total: $${totalAmount}`;
    } else {
        // If no total found, show default message
        orderTotalDisplay.innerText = "Total: $0.00";
    }
    
    // Initialize with UPI option selected
    if (typeof selectPaymentMethod === 'function') {
        selectPaymentMethod('upi');
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on and set up the appropriate functionality
    
    // If we're on the QuickServe order page, set up the place order button
    const placeOrderButton = document.querySelector('button[onclick="placeOrder()"]');
    if (placeOrderButton) {
        // Replace the original onclick handler
        placeOrderButton.removeAttribute('onclick');
        placeOrderButton.addEventListener('click', function() {
            const itemCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

            if (itemCount === 0) {
                alert('Please add items to your cart before placing an order.');
                return;
            }
            
            // Handle the order placement
            handlePlaceOrder();
        });
    }
    
    // If we're on the payment page, initialize it
    initializePaymentPage();
});

// For the "Back to Menu" link on the payment page
function handleBackToMenu() {
    // Clear the order total when going back to the menu
    localStorage.removeItem('quickServeOrderTotal');
}

// Set up the back button on the payment page if it exists
const backButton = document.querySelector('.back-button');
if (backButton) {
    backButton.addEventListener('click', handleBackToMenu);
}