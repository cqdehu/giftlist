$(document).ready(function () {
    $("#login-form").submit(function (e) {
        e.preventDefault(); // megakadályozza az alapértelmezett űrlap beküldését

        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            type: "POST",
            url: "login.php",
            data: { username: username, password: password },
            success: function (response) {
                console.log(response);
                if (response == "success") {
                    // sikeres bejelentkezés, átirányítás a welcome.html oldalra
                    window.location.replace("home.html");
                } else {
                    // hibaüzenet megjelenítése
                    $("#error-message").text(response);
                }
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        });
    });
});

////

$(document).ready(function () {
    $("#registration-form").submit(function (e) {
        e.preventDefault(); // megakadályozza az alapértelmezett űrlap beküldését

        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            type: "POST",
            url: "register.php",
            data: { username: username, password: password },
            success: function (response) {
                console.log(response);
                if (response == "success") {
                    // sikeres bejelentkezés, átirányítás a welcome.html oldalra
                    window.location.replace("home.html");
                } else {
                    // hibaüzenet megjelenítése
                    $("#error-message").text(response);
                }
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        });
    });
});

////



