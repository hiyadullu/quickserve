document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    

    try {
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        } else {
            document.getElementById("error-message").innerText = data.message;
        }
    } catch (error) {
        console.error("Login error:", error);
    }
});
// admin_dashboard.js - Add this file to your frontend/views/pages directory

// document.addEventListener('DOMContentLoaded', function() {
//     // Convert static status cells to dropdown selects
//     convertStatusesToDropdowns();
    
//     // Calculate and update dashboard metrics
//     updateDashboardMetrics();
//   });
  
//   function convertStatusesToDropdowns() {
//     // Get all status cells in the table
//     const statusCells = document.querySelectorAll('table tr td:nth-child(5)');
    
//     statusCells.forEach(cell => {
//       const currentStatus = cell.textContent.trim();
      
//       // Create dropdown element
//       const dropdown = document.createElement('select');
//       dropdown.className = 'status-dropdown';
      
//       // Add options
//       const statuses = ['Completed', 'Pending', 'Cancelled'];
//       statuses.forEach(status => {
//         const option = document.createElement('option');
//         option.value = status.toLowerCase();
//         option.textContent = status;
//         option.selected = status === currentStatus;
//         dropdown.appendChild(option);
//       });
      
//       // Add event listener for status change
//       dropdown.addEventListener('change', function() {
//         // Update the visual status
//         updateStatusStyle(this);
        
//         // Update metrics when status changes
//         updateDashboardMetrics();
        
//         // Here you would also make an API call to update the database
//         const orderId = this.closest('tr').querySelector('td:first-child').textContent;
//         updateOrderStatus(orderId, this.value);
//       });
      
//       // Replace text with dropdown
//       cell.textContent = '';
//       cell.appendChild(dropdown);
      
//       // Set initial styling
//       updateStatusStyle(dropdown);
//     });
//   }
  
//   function updateStatusStyle(dropdown) {
//     // Remove existing classes
//     dropdown.classList.remove('status-completed', 'status-pending', 'status-cancelled');
    
//     // Add class based on selected status
//     dropdown.classList.add(`status-${dropdown.value.toLowerCase()}`);
//   }
  
//   function updateDashboardMetrics() {
//     // Count orders by status
//     const statuses = document.querySelectorAll('.status-dropdown');
//     let pendingCount = 0;
//     let completedCount = 0;
//     let totalRevenue = 0;
    
//     statuses.forEach(dropdown => {
//       const status = dropdown.value;
//       const row = dropdown.closest('tr');
//       const amountText = row.querySelector('td:last-child').textContent;
//       const amount = parseFloat(amountText.replace('$', ''));
      
//       if (status === 'pending') {
//         pendingCount++;
//       } else if (status === 'completed') {
//         completedCount++;
//         totalRevenue += amount;
//       }
//     });
    
//     // Update dashboard metrics
//     document.querySelector('.card:nth-child(1) .card-value').textContent = pendingCount;
//     document.querySelector('.card:nth-child(2) .card-value').textContent = `$${totalRevenue.toFixed(2)}`;
//   }
  
//   function updateOrderStatus(orderId, newStatus) {
//     // Make API call to update the status in the database
//     fetch('/api/orders/update-status', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         orderId: orderId,
//         status: newStatus
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Status updated successfully:', data);
//     })
//     .catch(error => {
//       console.error('Error updating status:', error);
//     });
//   }