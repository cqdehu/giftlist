<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Ellenőrizzük, hogy a felhasználónév és a jelszó mezők nem üresek
  if (!empty($_POST['itemname'])) {
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

    // Ellenőrizzük, hogy a felhasználónév még nem foglalt-e
    $name = $_POST['itemname'];
    $user = $_SESSION['username'];
    $status = $_POST['status'];
    $createDate = $_POST['createDate'];

    $query = "SELECT * FROM `items` WHERE `name` = '$name' AND `user` = '$user' ";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0) {
      // Hasheljük a jelszót
      

      // Adjuk hozzá az új felhasználót az adatbázishoz
      $query = "INSERT INTO `items`(`name`, `status`, `user`, `createDate`) VALUES ('$name', '$status', '$user', '$createDate')";
      $result = mysqli_query($conn, $query);

      if ($result) {
        echo "success";
      } else {
        echo "Hiba történt a tétel hozzáadása során.";
      }
    } else {
      echo "Már egyszer szerepel a listán.";
    }

    mysqli_close($conn);
  } else {
    echo "Kérjük, töltse ki mindkét mezőt.";
  }
}
?>