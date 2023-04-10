function register() {
    $(document).ready(function () {
        $.ajax({
            url: 'auth.php', // A PHP fájl URL-je
            type: 'POST', // A kérés típusa (GET vagy POST)
            success: function (response) { // Sikeres kérés esetén
                $('#response').html(response); // A szerver által visszaküldött adatok megjelenítése a "response" div-ben
            },
            error: function (xhr, status, error) { // Hiba esetén
                alert('Hiba történt: ' + error); // Hibaüzenet megjelenítése
            }
        });
    });
}

register()


