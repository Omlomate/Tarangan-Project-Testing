 // Function to delete a cookie by name
 function deleteCookie(cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log(cookieName + ' cookie deleted.');
}

// Redirect to login page
function redirectToLogin() {
    window.location.href = '/login'; // Replace 'login.html' with your login page URL
}

// Set up a timer to show a confirmation dialog before deleting the cookie and redirecting to login page when the page becomes inactive
let inactivityTimer;
function handleInactive() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        // Show a confirmation dialog
        if (confirm('You will be logged out due to inactivity. Do you want to continue?')) {
            deleteCookie('jwt');
            console.log('Page inactive, example_cookie cookie deleted.');
            redirectToLogin();
        } else {
            // Reset the timer if the user selects "No"
            handleInactive();
        }
    }, 3000); // Set the inactive time threshold 5mins
}

// Reset the inactivity timer when mouse movement or clicks are detected
document.addEventListener('mousemove', handleInactive);
document.addEventListener('click', handleInactive);

// Start the initial timer
handleInactive();