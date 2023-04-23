<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Ellenőrizzük, hogy az item név mező nem üres
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

    // Ellenőrizzük, hogy az item neve még nem foglalt-e
    $name = $_POST['name'];
    $user = $_SESSION['username'];
    $userto = $_POST['userto'];
    $status = $_POST['status'];
    $createDate = $_POST['createDate'];
    $id = $_SESSION['id'];
    $selectedItem = $_POST['selectedItem'];

    $query = "SELECT * FROM `items` WHERE `name` = '$name' AND `user` = '$user' AND `userto` = '$userto'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0) {
      // Az itemet a felhasználói adatbázisban frissítjük
      $query = "UPDATE `items` SET `name`='$name',`status`='$status',`createDate`='$createDate' WHERE `user` = '$user' AND `userto` = '$userto' AND `name` = '$selectedItem'";
      $result = mysqli_query($conn, $query);

      if ($result) {
        echo "success";
      } else {
        echo "Hiba történt a tétel módosítása során.";
      }
    } else {
      echo "Már egyszer szerepel a listán.";
    }

    mysqli_close($conn);
  } else {
    echo "Kérjük, töltse ki az Item mezőt.";
  }
}


?>
