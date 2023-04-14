<?php

session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (!empty($_POST['invitedUser'])) {

    } else {
        echo "Kérjük, töltse ki mindkét mezőt.";
    }

    

    
}