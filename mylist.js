const toast = document.querySelector('#alertToast')
var alertToast = bootstrap.Toast.getOrCreateInstance(toast)
var toastText = document.querySelector(".toast-body")

$(document).ready(function () {
    // AJAX hívás küldése a szervernek
    $.ajax({
        type: "GET",
        url: "mylist.php",
        success: function (data) {
            // Sikeres válasz esetén kezeljük a visszatérő adatot
            if (data == "failed") {
                // A felhasználó nincs bejelentkezve, megjelenítjük az üzenetet
                console.log("A felhasználó nincs bejelentkezve!")
                window.location.replace("login.html");

            } else {
                // A felhasználó be van jelentkezve, megjelenítjük a tartalmat
                console.log("A felhasználó be van jelentkezve!")
                loadItem()
                $("#displayTitle").text(data)
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }
    });
});

//logout
$(document).ready(function () {
    $("#logoutBtn").click(function () {
        // AJAX hívás küldése a szervernek
        $.ajax({
            type: "POST",
            url: "logout.php",
            success: function (data) {
                // Sikeres válasz esetén átirányítjuk a felhasználót a bejelentkezési oldalra
                window.location.href = "login.html";
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        });
    })
});

//addItem
$(document).ready(function () {
    $("#addItemBtn").click(function () {

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;


        var name = $("#enterItemName")
        var status = $("#enterItemStatus")
        var createDate = formattedDate

        $.ajax({
            type: "POST",
            url: "additem.php",
            data: { name: name.val(), status: status.val(), createDate: createDate, },
            success: function (response) {
                console.log(response);
                if (response == "success") {
                    // sikeres bejelentkezés, átirányítás a welcome.html oldalra
                    console.log("sikeres hozzáadás")
                } else {
                    // hibaüzenet megjelenítése
                    toastText.innerHTML = response;
                    alertToast.show()
                }
            },
            error: function () {
                // Hibás AJAX hívás esetén kezeljük a hibát
                $("#message").html("Hiba történt az AJAX hívás során.");
            }
        })

    })
})

function loadItem() {
    $.ajax({
        url: "getitem.php",
        type: "POST",
        dataType: "json",
        success: function (data) {
            // Az adatok feldolgozása
            for (var i = 0; i < data.length; i++) {
                var name = data[i].name;
                var status = data[i].status;
                var user = data[i].user;
                var createDate = data[i].createDate;
                console.log(name+", "+status+", "+user+", "+createDate+", ");
            }
            console.log(name)
        },
        error: function (response) {
            console.log(response);
        }
        
    });
}





