<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Ellenőrizzük, hogy a felhasználónév és a jelszó mezők nem üresek
  if (!empty($_POST['username']) && !empty($_POST['password'])) {
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

    // Ellenőrizzük, hogy a felhasználónév és a jelszó egyezik-e
    $username = $_POST['username'];
    $password = $_POST['password'];
    $query = "SELECT * FROM users WHERE username='$username'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
      if (password_verify($password, $row['password'])) {
        // Sikeres bejelentkezés, átirányítjuk a felhasználót az üdvözlőoldalra
        $_SESSION['username'] = $username;
        echo "success";
        echo $username;
      } else {
        echo "Helytelen jelszó.";
      }
    } else {
      echo "Nincs ilyen felhasználónév.";
    }

    mysqli_close($conn);
  } else {
    echo "Kérjük, töltse ki mindkét mezőt.";
  }
}
?>
