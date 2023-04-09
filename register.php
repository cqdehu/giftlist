<?php

require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

// Kapcsolódás az adatbázishoz
$conn = mysqli_connect("localhost", "u142909563_admin", "kcRN[bK7", "u142909563_database");

// Ellenőrizzük a kapcsolatot
if (!$conn) {
    die("Kapcsolódási hiba: " . mysqli_connect_error());
}

// Ellenőrizzük, hogy a felhasználónév még nem létezik-e
$sql = "SELECT * FROM `users` WHERE username = '" . $_POST['username'] . "'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    echo "Ez a felhasználónév már foglalt!";
} else {
    // Jelszó hash-elése
    $password_hash = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Új felhasználó hozzáadása az adatbázishoz
    $sql = "INSERT INTO `users` (username, password) VALUES ('" . $_POST['username'] . "', '" . $password_hash . "')";
    if (mysqli_query($conn, $sql)) {
        echo "Sikeres regisztráció!";

        // Adatok, amelyekből a JWT tokent generáljuk
        $payload = array(
            "sub" => $_POST['username'],
            "iat" => time(),
            "exp" => time() + (60 * 60)
        );

        // A JWT token titkosítása
        $jwt_secret = "kodolt_jelszo";

        // JWT token generálása
        $jwt = JWT::encode($payload, $jwt_secret, "HS256");

        // A generált JWT token megjelenítése
        echo $jwt;

        setcookie('jwt_token', $jwt, time() + (60 * 60), '/', '', true, true);

        header("Location: /login.html");
        exit(); // fontos, hogy kilépjünk a programból az átirányítás után
    } else {
        echo "Hiba történt a regisztráció során!";
    }
}

// Kapcsolat lezárása
mysqli_close($conn);
