// Add click event for "Accept" buttons
document.querySelectorAll(".accept-btn").forEach(button => {
    button.addEventListener("click", () => {
        button.textContent = "Accepted";
        button.style.background = "gray";
    });
});

// Add click event for "Processed" buttons
document.querySelectorAll(".process-btn").forEach(button => {
    button.addEventListener("click", () => {
        button.textContent = "Processing";
        button.style.background = "gray";
    });
});

// Add click event for "Handover" buttons
document.querySelectorAll(".handover-btn").forEach(button => {
    button.addEventListener("click", () => {
        button.textContent = "Handed Over";
        button.style.background = "gray";
    });
});
