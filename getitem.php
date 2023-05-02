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
    $user = $_SESSION['username'];
    $userto = $_POST['userto'];

    $sql = "SELECT `name`, `status`, `user`, `createDate`, `id`, `userto`, `itemid` FROM `items` WHERE `user` = '$user' AND `userto` = '$userto' OR `user`='$userto' AND `userto` = '$userto' ORDER BY `id` ASC;";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // Az eredményt tömbbe mentjük
        $items = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $items[] = $row;
        }
    } else {
        $items = array();
    }

    echo json_encode($items);

    mysqli_close($conn);
}



