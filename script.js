function auth() {
    // Check if JWT token exists in cookies
    const jwtToken = getCookie('jwt_token');

    // If token does not exist, redirect to login page
    if (!jwtToken) {
        console.log(":C " + jwtToken)
        return;
    }

    // Send AJAX request to server to verify JWT token
    $.ajax({
        type: "POST",
        url: "verify_token.php",
        data: { token: jwtToken },
        success: function (response) {
            // If token is valid, proceed to the authenticated page
            if (response === "valid") {
                window.location.href = "/home.html";
            }
            // If token is invalid, redirect to login page
            else {
                window.location.href = "/login.html";
            }
        },
        error: function () {
            // If an error occurs, redirect to login page
            window.location.href = "/login.html";
        }
    });
}

// Helper function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    console.log(document.cookie)
}




auth()