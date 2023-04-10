$(document).ready(function () {
    // AJAX hívás küldése a szervernek
    $.ajax({
        type: "GET",
        url: "check_session.php",
        success: function (data) {
            // Sikeres válasz esetén kezeljük a visszatérő adatot
            if (data == "success") {
                // A felhasználó be van jelentkezve, megjelenítjük a tartalmat
                console.log("A felhasználó be van jelentkezve!")
            } else {
                // A felhasználó nincs bejelentkezve, megjelenítjük az üzenetet
                console.log("A felhasználó nincs bejelentkezve!")
                window.location.replace("login.html");
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }
    });
});  