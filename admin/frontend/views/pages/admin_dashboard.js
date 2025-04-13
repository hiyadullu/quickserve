// Animation for stats counting
document.addEventListener('DOMContentLoaded', function() {
    // Simple animation for the dashboard entrance
    const mainContent = document.querySelector('.main-content');
    mainContent.style.opacity = '0';
    setTimeout(() => {
        mainContent.style.opacity = '1';
    }, 100);

    // Track total orders and revenue
    let totalOrders = 1234;
    let totalRevenue = 12345;
    let pendingOrdersCount = 0;
    let completedOrdersCount = 0;
    let cancelledOrdersCount = 0;

    // Initial count of each status type
    document.querySelectorAll('.status-dropdown').forEach(dropdown => {
        if (dropdown.value === 'pending') pendingOrdersCount++;
        if (dropdown.value === 'completed') completedOrdersCount++;
        if (dropdown.value === 'cancelled') cancelledOrdersCount++;
    });

    // Format numbers with commas and currency symbols
    const formatNumber = (number, isCurrency = false) => {
        if (isCurrency) {
            return '$' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    };

    // Update displayed metrics
    const updateDisplayedMetrics = () => {
        document.querySelector('.stat-card:nth-child(1) .animate-value').textContent = formatNumber(totalOrders);
        document.querySelector('.stat-card:nth-child(2) .animate-value').textContent = formatNumber(totalRevenue, true);
    };

    // Animate the stat values counting up
    const animateValue = (element, start, end, duration, isCurrency = false) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let value = progress * (end - start) + start;
            
            // Format with commas for thousands
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(value) + '%';
            } else if (isCurrency) {
                element.textContent = formatNumber(value, true);
            } else {
                element.textContent = formatNumber(Math.floor(value));
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Get all elements with animate-value class
    const animateElements = document.querySelectorAll('.animate-value');
    
    // Animate each element
    animateElements.forEach(element => {
        const text = element.textContent;
        let value;
        let isCurrency = false;
        
        // Parse the value based on content
        if (text.includes('$')) {
            value = parseFloat(text.replace(/[$,]/g, ''));
            element.textContent = '$0';
            isCurrency = true;
        } else if (text.includes('%')) {
            value = parseInt(text.replace('%', ''));
            element.textContent = '0%';
        } else {
            value = parseInt(text.replace(/,/g, ''));
            element.textContent = '0';
        }
        
        // Start the animation after a small delay
        setTimeout(() => {
            animateValue(element, 0, value, 1500, isCurrency);
        }, 300);
    });

    // Handle status dropdown changes
    const statusDropdowns = document.querySelectorAll('.status-dropdown');
    statusDropdowns.forEach(dropdown => {
        // Store original status
        dropdown.setAttribute('data-original-status', dropdown.value);
        
        dropdown.addEventListener('change', function() {
            const prevStatus = this.getAttribute('data-original-status');
            const currentStatus = this.value;
            const row = this.closest('tr');
            const orderAmount = parseFloat(row.querySelector('td:nth-last-child(1)').textContent.replace(/[$,]/g, ''));
            
            // Update status classes for styling
            this.classList.remove('completed', 'pending', 'cancelled', 'in-progress');
            this.classList.add(currentStatus);
            
            // Only process changes for the order table (not query table)
            if (row.querySelector('td:first-child').textContent.startsWith('#') && !row.querySelector('td:first-child').textContent.startsWith('#Q')) {
                // Update counters based on status change
                if (prevStatus === 'pending') {
                    pendingOrdersCount--;
                } else if (prevStatus === 'completed') {
                    completedOrdersCount--;
                    totalRevenue -= orderAmount;
                } else if (prevStatus === 'cancelled') {
                    cancelledOrdersCount--;
                }
                
                // Add to new status counter
                if (currentStatus === 'pending') {
                    pendingOrdersCount++;
                } else if (currentStatus === 'completed') {
                    completedOrdersCount++;
                    totalRevenue += orderAmount;
                } else if (currentStatus === 'cancelled') {
                    cancelledOrdersCount++;
                }
                
                // Update total orders (pending orders count towards total)
                totalOrders = pendingOrdersCount + completedOrdersCount;
                
                // Animate the changes
                const orderElement = document.querySelector('.stat-card:nth-child(1) .animate-value');
                const revenueElement = document.querySelector('.stat-card:nth-child(2) .animate-value');
                
                const currentDisplayedOrders = parseInt(orderElement.textContent.replace(/,/g, ''));
                const currentDisplayedRevenue = parseFloat(revenueElement.textContent.replace(/[$,]/g, ''));
                
                animateValue(orderElement, currentDisplayedOrders, totalOrders, 500);
                animateValue(revenueElement, currentDisplayedRevenue, totalRevenue, 500, true);
                
                // Store the new status as original for next change
                this.setAttribute('data-original-status', currentStatus);
                
                console.log(`Status changed from ${prevStatus} to ${currentStatus}`);
                console.log(`Total Orders: ${totalOrders}, Total Revenue: $${totalRevenue.toFixed(2)}`);
            }
        });
    });

    // For demonstration purposes - view buttons show details
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.querySelector('td:first-child').textContent;
            const customer = row.querySelector('td:nth-child(2)').textContent;
            const date = row.querySelector('td:nth-child(3)').textContent;
            const status = row.querySelector('select').value;
            const total = row.querySelector('td:nth-last-child(1)').textContent;
            
            alert(`Details for ${id}:\nCustomer: ${customer}\nDate: ${date}\nStatus: ${status}\nTotal: ${total}`);
 
        });   
    });

    // Add QR code section
    const qrSection = document.createElement('div');
    qrSection.innerHTML = `
        <h3>Customer QR Code</h3>
        <img id="qr-image" alt="QR Code" />
        <p id="qr-link"></p>
    `;
    document.body.appendChild(qrSection);

    // Fetch and display the QR code for the vendor
    const vendorId = "cafe123"; // Replace with the actual vendor ID
    fetch(`http://localhost:3000/api/generate-qr/${vendorId}`)
        .then(res => res.json())
        .then(data => {
            // Set the QR code image source and link
            document.getElementById('qr-image').src = data.qr;
            document.getElementById('qr-link').textContent = data.url;
        })
        .catch(err => {
            console.error("Error fetching QR code:", err);
        });
});
