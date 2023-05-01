<?php
session_start();

if (isset($_POST['selectedItem']) && !empty($_POST['selectedItem'])) {
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

    // Ellenőrizzük, hogy az item neve még nem foglalt-e
    $user = $_SESSION['username'];
    $userto = $_POST['userto'];
    $selectedItem = $_POST['selectedItem'];

    // Ellenőrizzük, hogy a felhasználó jogosult-e a módosításra
    $query = "SELECT * FROM `items` WHERE `itemid` = '$selectedItem' AND `user` = '$user' AND `userto` = '$userto'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) != 1) {
        // Hiba esetén
        $error = "Csak a te elemeidet tudod módosítani!";
        echo json_encode(array("status" => "error", "message" => $error));
    } else {
        // Sikeres módosítás esetén
        echo json_encode(array("status" => "success"));
    }

    mysqli_close($conn);
} else {
    // Ha az item nevét nem adták meg
    $error = "Kérlek, válassz egy tételt a listából!";
    echo json_encode(array("status" => "error", "message" => $error));
}
?>
