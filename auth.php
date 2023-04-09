<?php
require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

// Kapcsolódás az adatbázishoz
$conn = mysqli_connect("localhost", "u142909563_admin", "kcRN[bK7", "u142909563_database");

// Ellenőrizzük a kapcsolatot
if (!$conn) {
    die("Kapcsolódási hiba: " . mysqli_connect_error());
}

// Ellenőrizzük, hogy a JWT érvényes és a felhasználó be van jelentkezve
if (isset($_COOKIE['jwt_token'])) {
    try {
        $decoded = JWT::decode($_COOKIE['jwt_token'], "kodolt_jelszo", array('HS256'));

        // Ellenőrizzük, hogy a felhasználónév létezik az adatbázisban
        $sql = "SELECT * FROM `users` WHERE username = '" . $decoded->sub . "'";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            // Ha a felhasználónév létezik, az alkalmazás folytatja a működését
            // ...
        } else {
            // Ha a felhasználónév nem létezik, akkor visszairányítjuk a felhasználót a bejelentkezési oldalra
            header("Location:/login.html");
            exit;
        }
    } catch (Exception $e) {
        // Ha a JWT érvénytelen, akkor visszairányítjuk a felhasználót a bejelentkezési oldalra
        header("Location:/login.html");
        exit;
    }
} else {
    // Ha a JWT hiányzik, akkor visszairányítjuk a felhasználót a bejelentkezési oldalra
    header("Location:/login.html");
    exit;
}

// Kapcsolat lezárása
mysqli_close($conn);
?>
