// QuickServe Navigation Script
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Add event listeners to sidebar navigation items
    const sidebarItems = document.querySelectorAll('.sidebar li');
    
    sidebarItems.forEach(item => {
        // Set active class based on current page
        if ((currentPage === 'delivered.html' && item.textContent.trim() === 'Delivered') ||
            (currentPage === 'declined.ejs' && item.textContent.trim() === 'Declined') ||
            (currentPage === 'dashboard.ejs' && item.textContent.trim() === 'Overview') ||
            (currentPage === 'dashboard.ejs' && item.textContent.trim() === 'Overview')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
        
        // Add click event listeners
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            
            // Navigate based on menu item text
            if (text === 'Overview') {
                window.location.href = 'dashboard.ejs';
            } else if (text === 'Delivered') {
                window.location.href = 'delivered.html';
            } else if (text === 'Declined') {
                window.location.href = 'declined.html';
            } else if (text === 'Settings') {
                // Future implementation
                showToast('Settings page coming soon');
            }
        });
        
        // Add hover animations
        item.addEventListener('mouseover', function() {
            this.style.paddingLeft = '25px';
            this.style.backgroundColor = '#1B263B';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.paddingLeft = '20px';
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });
    
    // Helper function for toast notifications
    window.showToast = function(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    };
    
    // Add page transition animations
    document.body.classList.add('page-transition-in');
    setTimeout(() => {
        document.body.classList.remove('page-transition-in');
    }, 500);
    
    // Add event listeners for links to add exit animation
    document.addEventListener('click', function(e) {
        // Check if it's a navigation link
        if (e.target.tagName === 'A' || 
            (e.target.tagName === 'LI' && e.target.closest('.sidebar'))) {
            
            // Prevent default for links
            if (e.target.tagName === 'A') {
                e.preventDefault();
            }
            
            // Add exit animation
            document.body.classList.add('page-transition-out');
            
            // Get the href if it's a link, otherwise determine from sidebar item
            let navigateTo;
            if (e.target.tagName === 'A') {
                navigateTo = e.target.getAttribute('href');
            } else {
                const text = e.target.textContent.trim();
                if (text === 'Overview') navigateTo = 'dashboard.ejs';
                else if (text === 'Delivered') navigateTo = 'delivered.html';
                else if (text === 'Declined') navigateTo = 'declined.html';
                else return; // Don't navigate for other items
            }
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = navigateTo;
            }, 300);
        }
    });
    
    // Handle 404 errors by checking if required page elements exist
    function checkPageExists() {
        // If we're already on the error page, don't redirect
        if (currentPage === 'error404.html') return;
        
        // Check for common page elements that should exist on valid pages
        const hasMainContent = document.querySelector('.container') || 
                               document.querySelector('main') || 
                               document.querySelector('.content-section');
        
        // If essential elements are missing, redirect to 404 page
        if (!hasMainContent) {
            window.location.href = 'error404.html';
        }
    }
    
    // Run the page existence check after a short delay to ensure DOM is fully loaded
    setTimeout(checkPageExists, 100);
});

// Add a global error handler for navigation errors
window.addEventListener('error', function(e) {
    // If the error appears to be a resource loading error (like a missing page)
    if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
        // Only redirect if we're not already on the error page
        if (!window.location.href.includes('error404.html')) {
            window.location.href = 'error404.html';
        }
    }
}, true); // Use capture phase to catch the errors before they bubble up

// Handle 404 errors for fetch requests or AJAX calls
window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && (event.reason.status === 404 || event.reason.message.includes('404'))) {
        // Only redirect if we're not already on the error page
        if (!window.location.href.includes('error404.html')) {
            window.location.href = 'error404.html';
        }
    }
});