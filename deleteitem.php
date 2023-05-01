<?php

if ($item['user'] != $username) {
    echo "Csak a saját elemet tudod törölni!";
    exit;
}

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!empty($_POST['selectedItem'])) {
        $selectedItem = $_POST['selectedItem'];
        $username = $_SESSION['username'];

        $servername = 'localhost';
        $dbusername = 'u142909563_admin';
        $dbpassword = 'kcRN[bK7';
        $dbname = 'u142909563_database';

        $conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        $query = "SELECT * FROM `items` WHERE `user` = '$username' AND `name` = '$selectedItem'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $deleteQuery = "DELETE FROM `items` WHERE `user` = '$username' AND `name` = '$selectedItem'";
            $deleteResult = mysqli_query($conn, $deleteQuery);

            if ($deleteResult) {
                echo "success";
            } else {
                echo "Nem sikerült törölni az elemet az adatbázisból!";
            }
        } else {
            echo "Csak a saját elemet tudod törölni!";
        }

        mysqli_close($conn);
    } else {
        echo "Kérlek, válassz egy tételt a listából!";
    }
}


?>
