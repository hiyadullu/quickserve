document.addEventListener("DOMContentLoaded", function () {
    let sidebar = document.getElementById("sidebar");
    let mainContent = document.getElementById("mainContent");
    let toggleBtn = document.getElementById("toggleBtn");
    let statusDropdowns = document.querySelectorAll(".status-dropdown");
    let totalQueries = document.getElementById("totalQueries");
    let activeDeals = document.getElementById("activeDeals");
    let resolvedQueries = document.getElementById("resolvedQueries");
    
    function updateCounts() {
        let total = statusDropdowns.length;
        let resolved = 0;
        let pending = 0;

        statusDropdowns.forEach((dropdown) => {
            if (dropdown.value === "Resolved") {
                resolved++;
            } else {
                pending++;
            }
        });

        totalQueries.textContent = total;
        resolvedQueries.textContent = resolved;
        activeDeals.textContent = pending;
    }

    // Update counts on page load
    updateCounts();

    // Event listener for dropdown change
    statusDropdowns.forEach((dropdown) => {
        dropdown.addEventListener("change", function () {
            updateCounts();
        });
    });
    statusDropdowns.forEach((dropdown) => {
        dropdown.addEventListener("change", function () {
            let selectedValue = this.value;
            
            // Apply colors dynamically
            if (selectedValue === "Pending") {
                this.style.backgroundColor = "#ffc107";
                this.style.color = "black";
            } else if (selectedValue === "Resolved") {
                this.style.backgroundColor = "#28a745";
                this.style.color = "white";
            }
        });
    });  
    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("hidden");
        mainContent.classList.toggle("shifted");

        if (sidebar.classList.contains("hidden")) {
            toggleBtn.classList.add("toggle-btn-floating");
            toggleBtn.style.left = "15px";  // Moves the button outside
        } else {
            toggleBtn.classList.remove("toggle-btn-floating");
            toggleBtn.style.left = "auto";  // Resets button inside sidebar
        }
    });
});
