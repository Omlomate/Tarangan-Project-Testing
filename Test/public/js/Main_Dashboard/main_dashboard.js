// function loadContent(url) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             document.getElementById("mainContent").innerHTML = this.responseText;
//         }
//     };
//     xhttp.open("GET", url, true);
//     xhttp.send();
// }

// Function to handle logout
function logout() {
    // Make an AJAX request to logout route
    fetch('/logout', {
        method: 'GET',
        credentials: 'same-origin' // Send cookies with the request
    })
    .then(response => {
        if (response.ok) {
            // Clear session or token used for authentication on the server side
            // Redirect to homepage or login page
            window.location.href = '/';
        } else {
            console.error('Logout failed');
        }
    })
    .catch(error => console.error('Error during logout:', error));
}

// Event listener for popstate event
window.addEventListener('popstate', function (event) {
    const currentState = history.state;
    if (currentState && currentState.loggedOut) {
        // If the user is logged out, prevent navigating back
        history.forward();
        history.back();
    } else {
        // If the user is logged in, prompt for logout confirmation
        const confirmation = confirm(`Are you sure you want to logout ?`);
        if (confirmation) {
            logout();
            // Replace the current history state with a logged-out state
            history.replaceState({ loggedOut: true }, null, window.location.href);
        } else {
            // Restore the previous history state to prevent navigating back
            history.pushState({ loggedOut: false }, null, window.location.href);
        }
    }
});

// Push a new state to the history when the page is loaded
window.history.pushState({ loggedOut: false }, null, window.location.href);
