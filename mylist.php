<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo "failed";
} else {
  $_SESSION['username'] = $username;
  echo "success";
}
?>