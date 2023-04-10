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
                    window.location.replace("welcome.html");
                } else {
                    // hibaüzenet megjelenítése
                    $("#error-message").text(response);
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#registration-form").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();

        // AJAX hívás küldése a szervernek
        $.ajax({
            type: "POST",
            url: "register.php",
            data: {
                username: username,
                password: password
            },
            success: function (data) {
                // Sikeres válasz esetén kezeljük a visszatérő adatot
                if (data == "success") {
                    // Sikeres regisztráció, átirányítjuk a felhasználót az üdvözlőoldalra
                    window.location.href = "welcome.php";
                } else {
                    // Hibás regisztráció, megjelenítjük az üzenetet
                    $("#message").html(data);
                }
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        });
    });
});


