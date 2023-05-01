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

    // Az elem nevének lekérdezése az adatbázisból
    $selectedItem = $_POST['selectedItem'];
    $userto = $_POST['userto'];
    $query = "SELECT name FROM items WHERE itemid = '$selectedItem' AND userto = '$userto'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        echo $row['name'];
    } else {
        echo "Nem sikerült lekérni az elem nevét!";
    }

    mysqli_close($conn);
}
?>
