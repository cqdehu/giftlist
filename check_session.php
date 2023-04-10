<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo "failed";
} else {
  echo "success";
}
?>