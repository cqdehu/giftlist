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

    $invitedUser = $_POST['invitedUser'];
    $invitationUser = $_SESSION['username'];
    $createDate = $_POST['createDate'];

    $query = "SELECT * FROM `invitations` WHERE `invitationUser` = '$invitationUser' AND `invitedUser` = '$invitedUser'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        echo "Ez a meghívás már létezik!";
    } else {
        $query = "INSERT INTO `invitations`(`invitationUser`,`invitedUser`,`createDate`) VALUES ('$invitationUser','$invitedUser','$createDate')";
        $result = mysqli_query($conn, $query);
        echo "OK";
    }
}

