// Functions to navigate from Dashboard to different activities/pages

function navigate_to_age_calculator() {
    window.location.href = "/main_dashboard/dashboard/age-calculator";
}

function navigateTo_register_student() {
    window.location.href = "/main_dashboard/dashboard/register-student";
}

function navigateTo_search_student() {
    window.location.href = "/main_dashboard/dashboard/search-student";
}

function navigateTo_register_teacher() {
    window.location.href = "/main_dashboard/dashboard/register-teacher";


}

function navigateTo_search_teacher() {
    window.location.href = "/main_dashboard/dashboard/search-teacher";
    // alert("Feature yet to be released!")

}

document.getElementById('logoutButton').addEventListener('click', function () {
    // Make an AJAX request to logout route
    const confirmation = confirm(`Are you sure you want to logout ?`);
    if (confirmation) {
        fetch('/logout', {
            method: 'GET',
            credentials: 'same-origin' // Send cookies with the request
        })
            .then(response => {
                if (response.ok) {
                    // Redirect to homepage or login page
                    window.location.href = '/';
                } else {
                    console.error('Logout failed');
                }
            })
            .catch(error => console.error('Error during logout:', error));
    };
})


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
    }, 30000); // Set the inactive time threshold 5mins
}

// Reset the inactivity timer when mouse movement or clicks are detected
document.addEventListener('mousemove', handleInactive);
document.addEventListener('click', handleInactive);

// Start the initial timer
handleInactive();