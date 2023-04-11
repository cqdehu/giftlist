<?php

session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Ellenőrizzük, hogy a felhasználónév és a jelszó mezők nem üresek
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

    // Ellenőrizzük, hogy a felhasználónév még nem foglalt-e
    $currentuser = $_SESSION['username'];

    $sql = "SELECT `name`, `status`, `user`, `createDate` FROM `items` WHERE `user` = $currentuser";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // Az eredményt tömbbe mentjük
        $items = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $items[] = $row;
        }
    } else {
        echo "Nincs eredmény";
    }

    echo json_encode($items);

    mysqli_close($conn);
}