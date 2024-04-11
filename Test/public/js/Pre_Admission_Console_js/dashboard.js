// document.addEventListener('DOMContentLoaded', function() {
//     const myLottie = document.getElementById('myLottie');
//     const loader = document.getElementById('loader');

//     // Show the loader while waiting for the animation to load
//     loader.style.display = 'block';

//     // Wait for the Lottie animation to be loaded
//     myLottie.addEventListener('load', function() {
//         // Hide the loader when the animation has finished loading
//         loader.style.display = 'none';
//     });
// });



// Functions to navigate from Dashboard to different activities/pages
function navigate_to_age_calculator() {
    document.getElementById("age_calculator").addEventListener("click", function() {
    var response = prompt("Please enter your name:");
    if (response !== null) {
        alert("Hello, " + response + "!"); // Display the entered name in an alert
    }
});
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


