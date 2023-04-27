<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
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

    // Ellenőrizzük, hogy az item neve a felhasználóhoz tartozik-e
    $user = $_SESSION['username'];
    $userto = $_POST['userto'];
    $selectedItem = $_POST['selectedItem'];
    $query = "SELECT * FROM `items` WHERE `name` = '$selectedItem' AND `user` = '$user' AND `userto` = '$userto'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 1) {
      // Az itemet töröljük a felhasználói adatbázisból
      $query = "DELETE FROM `items` WHERE `user` = '$user' AND `userto` = '$userto' AND `name` = '$selectedItem'";
      $result = mysqli_query($conn, $query);

      if ($result) {
        echo "success";
      } else {
        echo "Hiba történt a tétel törlése során.";
      }
    } else {
      echo "Csak saját elemek törölhetőek.";
    }

    mysqli_close($conn);
  } else {
    echo "Kérjük, válassza ki az Item mezőből a törölni kívánt elemet.";
  }
}
?>
