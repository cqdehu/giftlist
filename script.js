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
    // Elkapjuk a regisztrációs űrlap küldési eseményét
    $('#registration-form').on('submit', function (e) {
        e.preventDefault(); // Megakadályozzuk az alapértelmezett űrlapküldési viselkedést

        // Lekérjük az űrlap adatait
        var formData = $(this).serialize();

        // Elküldjük az adatokat a szervernek Ajax kéréssel
        $.ajax({
            url: 'register.php',
            type: 'POST',
            data: formData,
            success: function (response) {
                // Megjelenítjük a szerver válaszát
                $('#response').html(response);
            }
        });
    });
});

