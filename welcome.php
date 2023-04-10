

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Üdvözöljük!</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
  <script src="script.js"></script>
</body>
</html>

<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo ":C";
    header("Location: login.html");
    exit();
}
?>
