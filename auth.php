<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo "failed";
} else {

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
    $id = $_SESSION['id'];

    $sql = "SELECT `username`, `id` FROM `users` WHERE `username` = '$user' AND `id`='$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // Az eredményt tömbbe mentjük
        $userdata = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $userdata[] = $row;
        }
    } else {
        echo "failed";
    }

    echo json_encode($userdata);

    mysqli_close($conn);
}

