$(document).ready(function(){
    $("#login-form").submit(function(e){
      e.preventDefault(); // megakadályozza az alapértelmezett űrlap beküldését
  
      var username = $("#username").val();
      var password = $("#password").val();
  
      $.ajax({
        type: "POST",
        url: "login.php",
        data: {username: username, password: password},
        success: function(response){
          console.log(response);
          if (response == "success") {
            // sikeres bejelentkezés, átirányítás a welcome.html oldalra
            window.location.replace("welcome.html");
          } else {
            // hibaüzenet megjelenítése
            $("#error-message").text(response);
          }
        }
      });
    });
  });
  