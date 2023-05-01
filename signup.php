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

    // Ellenőrizzük, hogy a felhasználónév még nem foglalt-e
    $username = $_POST['username'];
    $query = "SELECT * FROM users WHERE username='$username'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) == 0) {
      // Hasheljük a jelszót
      $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
      $id = uniqid();
      // Adjuk hozzá az új felhasználót az adatbázishoz
      $query = "INSERT INTO users (username, password, id) VALUES ('$username', '$password', '$id')";
      $result = mysqli_query($conn, $query);

      if ($result) {
        // Sikeres regisztráció, átirányítjuk a felhasználót az üdvözlőoldalra
        $_SESSION['username'] = $username;
        echo "success";
      } else {
        echo "An error occurred during registration.";
      }
    } else {
      echo "The username is already taken.";
    }

    mysqli_close($conn);
  } else {
    echo "Please fill in both fields.";
  }
}
?>
