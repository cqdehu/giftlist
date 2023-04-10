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
                user = data
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

$(document).ready(function () {
    $("#addItemBtn").click(function () {

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;


        var name = $("#enterItemName")
        var status = $("#enterItemStatus").text()
        var user = user
        var createDate = formattedDate

            $.ajax({
                type: "POST",
                url: "additem.php",
                data: { name: name, status: status, user: user, createDate: createDate, },
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
