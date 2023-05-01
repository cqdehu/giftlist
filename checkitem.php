<?php
session_start();
$servername = 'localhost';
$dbusername = 'u142909563_admin';
$dbpassword = 'kcRN[bK7';
$dbname = 'u142909563_database';
$conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

// Ellenőrizzük, hogy sikerült-e kapcsolódni az adatbázishoz
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$username = $_SESSION['username'];
$selectedItem = $_POST['selectedItem'];

// Check if the item exists and find its owner
$checkQuery = "SELECT * FROM `items` WHERE `name` = '$selectedItem'";
$checkResult = mysqli_query($conn, $checkQuery);

if (mysqli_num_rows($checkResult) == 1) {
    $row = mysqli_fetch_assoc($checkResult);
    $itemUser = $row['user'];
    if ($itemUser == $username) {
        $deleteQuery = "DELETE FROM `items` WHERE `name` = '$selectedItem' AND `user` = '$username'";
        $deleteResult = mysqli_query($conn, $deleteQuery);
        if ($deleteResult) {
            echo "success";
        } else {
            echo "Nem sikerült törölni az elemet az adatbázisból!";
        }
    } else {
        // Find the user who added the item and delete it from their list
        $findUserQuery = "SELECT * FROM `users` WHERE `username` = '$itemUser'";
        $findUserResult = mysqli_query($conn, $findUserQuery);
        if (mysqli_num_rows($findUserResult) == 1) {
            $userRow = mysqli_fetch_assoc($findUserResult);
            $userId = $userRow['id'];
            $deleteQuery = "DELETE FROM `items` WHERE `name` = '$selectedItem' AND `user_id` = '$userId'";
            $deleteResult = mysqli_query($conn, $deleteQuery);
            if ($deleteResult) {
                echo "success";
            } else {
                echo "Nem sikerült törölni az elemet az adatbázisból!";
            }
        } else {
            echo "Nem található a felhasználó az adatbázisban!";
        }
    }
} else {
    echo "Az elem nem található az adatbázisban!";
}
