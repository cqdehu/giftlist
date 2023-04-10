<?php
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: login.html");
  exit();
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Üdvözöljük!</title>
</head>
<body>
  <?php
  // Munkamenetből kinyerjük a felhasználónevet
  $username = $_SESSION['username'];
  ?>
  <h1>Üdvözöljük, <?php echo $username; ?>!</h1>
  <p>Az oldal tartalma itt jön...</p>
  <form method="post" action="logout.php">
    <input type="submit" value="Kijelentkezés">
  </form>
</body>
</html>
