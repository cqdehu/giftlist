<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ellenőrizzük, hogy az item neve mező nem üres
    if (!empty($_POST['name'])) {
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

        // Ellenőrizzük, hogy a felhasználó jogosult-e a módosításra
        $user = $_SESSION['username'];
        $userto = $_POST['userto'];
        $selectedItem = $_POST['selectedItem'];
        $name = mysqli_real_escape_string($conn, $_POST['name']);
        $status = mysqli_real_escape_string($conn, $_POST['status']);
        $link = $_POST['link'];

        $query = "SELECT * FROM `items` WHERE `itemid` = '$selectedItem' AND `user` = '$user' AND `userto` = '$userto'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) != 1) {
            echo "Only your elements can be modified!";
        } else {
            $query = "UPDATE `items` SET `name` = '$name', `status` = '$status', `link` = '$link' WHERE `itemid` = '$selectedItem'";
            if (mysqli_query($conn, $query)) {
                // Sikeres módosítás esetén visszaküldjük az új nevet a JavaScriptnek
                echo $name;
            } else {
                echo "An error has been made in the modification.";
            }
        }

        mysqli_close($conn);
    } else {
        echo "The element name cannot be empty!";
    }
}
?>