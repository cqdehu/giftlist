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

    // Ellenőrizzük, hogy a meghívó és a meghívott nem ugyanaz a személy
    if (!$invitedUser || !$invitationUser || !$createDate) {
        echo "Kérjük, töltse ki az összes mezőt!";
    } else {
        if ($invitationUser == $invitedUser) {
            echo "A meghívó és a meghívott nem lehet ugyanaz!";
        } else {
            // Lekérdezzük a meghívó felhasználónevet az adatbázisból
            $query = "SELECT username FROM `users` WHERE `username` = '$invitationUser'";
            $result = mysqli_query($conn, $query);
            $row = mysqli_fetch_assoc($result);
            $invitationUserName = $row['username'];

            // Lekérdezzük a meghívott felhasználónevet az adatbázisból
            $query = "SELECT username FROM `users` WHERE `username` = '$invitedUser'";
            $result = mysqli_query($conn, $query);

            // Ellenőrizzük, hogy a meghívott felhasználónév létezik-e
            if (mysqli_num_rows($result) == 0) {
                echo "A meghívott felhasználónév nem létezik!";
            } else {
                $row = mysqli_fetch_assoc($result);
                $invitedUserName = $row['username'];

                // Ellenőrizzük, hogy a meghívó és a meghívott nem ugyanaz a személy
                if ($invitationUserName == $invitedUserName) {
                    echo "A meghívó és a meghívott nem lehet ugyanaz!";
                } else {
                    $query = "SELECT * FROM `invitations` WHERE `invitationUser` = '$invitationUserName' AND `invitedUser` = '$invitedUserName'";
                    $result = mysqli_query($conn, $query);

                    if (mysqli_num_rows($result) > 0) {
                        echo "You already shared your list with $invitedUserName";
                    } else {
                        $query = "INSERT INTO `invitations`(`invitationUser`,`invitedUser`,`createDate`) VALUES ('$invitationUserName','$invitedUserName','$createDate')";
                        $result = mysqli_query($conn, $query);
                        echo "Sikeresen megosztottad $invitedUserName-el a listádat!";
                    }
                }
            }
        }
    }



    mysqli_close($conn);
}
