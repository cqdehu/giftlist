<?php

session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Kapcsolódás az adatbázishoz
    $servername = 'localhost';
    $dbusername = 'u142909563_admin';
    $dbpassword = 'kcRN[bK7';
    $dbname = 'u142909563_database';

    $conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

    // Ellenőrizzük, hogy sikerült-e kapcsolódni az adatbázishoz
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
    if (!isset($_SESSION['username'])) {
        die("A művelet végrehajtásához be kell jelentkezned.");
    }

    // Ellenőrizzük, hogy a POST kérésben meg van-e adva a törlendő elem azonosítója
    if (!isset($_POST['itemId'])) {
        die("Nincs megadva az elem azonosítója.");
    }

    // Ellenőrizzük, hogy a felhasználóhoz tartozik-e az adott elem
    $itemId = $_POST['itemId'];
    $user = $_SESSION['username'];
    $sql = "SELECT * FROM `items` WHERE `name` = '$itemId' AND `user` = '$user'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 0) {
        die("A törlendő elem nem található, vagy nem tartozik hozzád.");
    }

    // Töröljük az elemet az adatbázisból
    $sql = "DELETE FROM `items` WHERE `name` = '$itemId' AND `user` = '$user'";
    if (!mysqli_query($conn, $sql)) {
        die("Nem sikerült törölni az elemet az adatbázisból.");
    }

    // Sikeres törlés esetén visszatérünk a főoldalra
}
