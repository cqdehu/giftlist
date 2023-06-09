const toast = document.querySelector('#alertToast')
var alertToast = bootstrap.Toast.getOrCreateInstance(toast)
var toastText = document.querySelector(".toast-body")

$(document).ready(function () {
    $("#signupBtn").click(function () {

        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            type: "POST",
            url: "signup.php",
            data: { username: username, password: password },
            success: function (response) {
                console.log(response);
                if (response == "success") {
                    // sikeres bejelentkezés, átirányítás a welcome.html oldalra
                    window.location.replace("login.html");
                } else {
                    // hibaüzenet megjelenítése
                    toastText.innerHTML = response;
                    alertToast.show()
                }
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        });
    });
});