<?php

require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

// Kapcsolódás az adatbázishoz
$conn = mysqli_connect("localhost", "u142909563_admin", "kcRN[bK7", "u142909563_database");

// Ellenőrizzük a kapcsolatot
if (!$conn) {
    die("Kapcsolódási hiba: " . mysqli_connect_error());
}

if(isset($_POST['submit'])){
    if($_POST['username'] == ""){
        $_SESSION['MASSAGE'] = "Name and password required!";
    }
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
        
        //JWT???

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

?>
