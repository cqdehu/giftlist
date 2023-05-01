<?php
session_start();

if (isset($_POST['selectedItem']) && !empty($_POST['selectedItem'])) {
    // Ellenőrizzük, hogy az item név mező nem üres
    if (!empty($_POST['selectedItem'])) {
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
            echo "Csak a te elemeidet tudod módosítani!";
        } else {
            echo "success";
        }

        mysqli_close($conn);
    } else {

        $selectedItem = $_POST['selectedItem'];

        echo "Kérlek, válassz egy tételt a listából! (c)"."//".$selectedItem;
    }
}
?>
