<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Ellenőrizzük, hogy a felhasználónév és a jelszó mezők nem üresek
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

    // Lekérdezzük az adatbázisból a felhasználónevet
    $id = $_SESSION['id'];
    $query = "SELECT `username` FROM `users` WHERE `id` = '$id'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    $user = $row['username'];

    // Az új tétel hozzáadása az adatbázishoz
    $name = $_POST['name'];
    $userto = $_POST['userto'];
    $status = $_POST['status'];
    $link = $_POST['link'];
    $createDate = $_POST['createDate'];
    $itemid = uniqid();
    $query = "SELECT * FROM `items` WHERE `name` = '$name' AND `user` = '$user' AND `userto` = '$userto'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0) {
      $query = "INSERT INTO `items`(`name`, `status`, `link`, `user`, `userto`, `createDate`, `id`, `itemid`) VALUES ('$name', '$status', '$link', '$user', '$userto', '$createDate', '$id', '$itemid')";

      $result = mysqli_query($conn, $query);
      if ($result) {
        echo "success";
      } else {
        echo "An error was made when adding the item.";
      }
    } else {
      echo "It is already on the list once.";
    }
    mysqli_close($conn);
  } else {
    echo "The element name cannot be empty!";
  }
}
