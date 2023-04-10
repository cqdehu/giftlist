function preloader() {
  var loader = document.querySelector('#preloader')
  loader.style.opacity = "0"
  setTimeout(delete_preloader, 551)
  function delete_preloader() {
    loader.style.display = "none"
    console.log("deleted")
  }
}

setTimeout(preloader, 600)

const toast = document.querySelector('#alertToast')
var alertToast = bootstrap.Toast.getOrCreateInstance(toast)
var toastText = document.querySelector(".toast-body")




//login
$(document).ready(function () {
    $("#loginBtn").click(function (e) {
        e.preventDefault(); // megakadályozza az alapértelmezett űrlap beküldését

        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            type: "POST",
            url: "login.php",
            data: { username: username, password: password },
            success: function (response) {
                console.log(response);
                if (response == "success") {
                    // sikeres bejelentkezés, átirányítás a welcome.html oldalra
                    window.location.replace("home.html");
                } else {
                    // hibaüzenet megjelenítése
                    toastText.innerHTML = $("#error-message").text(response);
                    alertToast.show()
                }
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        });
    });
});