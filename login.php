<?php
// Adatbázis kapcsolat beállítása
$db_hostname = 'localhost';
$db_username = 'u142909563_admin';
$db_password = 'kcRN[bK7';
$db_database = 'u142909563_database';

$db_server = mysqli_connect($db_hostname, $db_username, $db_password, $db_database);
if (!$db_server) die("Nem sikerült kapcsolódni az adatbázishoz!");

// Felhasználói azonosítás ellenőrzése
$username = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM users WHERE username='$username' AND password=SHA1('$password')";
$result = mysqli_query($db_server, $query);

if (!$result) {
    die("Hiba az adatbázisban. Próbálkozzon később!");
}

$rows = mysqli_num_rows($result);
if ($rows == 1) {
    // Sikeres bejelentkezés: munkamenet létrehozása
    session_start();
    $_SESSION['username'] = $username;
    header("Location: welcome.php");
} else {
    // Sikertelen bejelentkezés: visszatérés a bejelentkezési oldalra
    header("Location: login.html?error=1");
}

mysqli_close($db_server);
?>
