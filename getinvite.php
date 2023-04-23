<?php

session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

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

    $sql = "SELECT * FROM `invitations` WHERE `invitedUser` = '$user'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        // Az eredményt tömbbe mentjük
        $invite = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $invite[] = $row;
        }
    } else {
        $invite = array();
    }

    echo json_encode($invite);

    mysqli_close($conn);
}