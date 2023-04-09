<?php

require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

// Kapcsolódás az adatbázishoz
$conn = mysqli_connect("localhost", "u142909563_admin", "kcRN[bK7", "u142909563_database");

// Ellenőrizzük a kapcsolatot
if (!$conn) {
    die("Kapcsolódási hiba: " . mysqli_connect_error());
}

// Ellenőrizzük, hogy a felhasználónév létezik-e
$sql = "SELECT * FROM `users` WHERE username = '" . $_POST['username'] . "'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // Ellenőrizzük a jelszót
    $user = mysqli_fetch_assoc($result);
    if (password_verify($_POST['password'], $user['password'])) {
        // Ha a jelszó helyes, akkor sikeres bejelentkezés
        echo "Sikeres bejelentkezés!";

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

        header("Location: /home.html");
        exit(); // fontos, hogy kilépjünk a programból az átirányítás után



    } else {
        echo "Hibás jelszó! ";
    }
} else {
    echo "A felhasználónév nem létezik!";
}

// Kapcsolat lezárása
mysqli_close($conn);
