const toast = document.querySelector('#alertToast')
var alertToast = bootstrap.Toast.getOrCreateInstance(toast)
var toastText = document.querySelector(".toast-body")

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
if (month < 10) {
  month = "0" + month;
}
var day = today.getDate();
if (day < 10) {
  day = "0" + day;
}
var createDate = year + "-" + month + "-" + day;

//selectedItem
let lastClickedCard = null;

function removeCardBorder() {
    if (lastClickedCard) {
        lastClickedCard.removeClass("border border-end-0 border-4 border-danger last-clicked");
        lastClickedCard = null;
    }
}

function addCardBorder(card) {
    removeCardBorder();
    card.addClass("border border-end-0 border-4 border-danger last-clicked");
    lastClickedCard = card;
    console.log(lastClickedCard.attr("id"));
}

function handleCardClick(event) {
    const card = $(event.target).closest('.item-card');
    if (!card.length) {
        return;
    }

    addCardBorder(card);
}

if (lastClickedCard) {
    lastClickedCard.on('click', function () {
        removeCardBorder();
    });
}

$(document).on('dblclick', '.item-card', function (event) {
    const card = $(event.target).closest('.item-card');
    if (!card.length) {
        return;
    }

    if (card.is(lastClickedCard)) {
        removeCardBorder();
    } else {
        addCardBorder(card);
    }
});

//////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    auth()
    loadItem()
})


//////////////////////////////////////////////////////////////////////////////////

//auth
function auth() {
    $.ajax({
        type: "GET",
        url: "auth.php",
        success: function (data) {
            // Sikeres válasz esetén kezeljük a visszatérő adatot
            if (data == "failed") {
                // A felhasználó nincs bejelentkezve, megjelenítjük az üzenetet
                console.log("A felhasználó nincs bejelentkezve!")
                window.location.replace("login.html");

            } else {
                // A felhasználó be van jelentkezve, megjelenítjük a tartalmat
                console.log("A felhasználó be van jelentkezve!")
                let adatok = data.split(";")
                let username = adatok[0]
                let id = adatok[1]
                document.title = username + " | " + "GIFTLIST"
                $("#displayTitle").text(username + " list's")
                $("#username").text(username)
                $("#id").text(id)
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }
    });
}

//////////////////////////////////////////////////////////////////////////////////

//loadItem
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
                var id = data[i].id;

                //Kiírás
                console.log(name + ", " + status + ", " + user + ", " + createDate + ", " + id)

                const newCardDiv = document.createElement("div")
                newCardDiv.className = "row bg-white ms-4 mb-4 rounded-start-4 align-items-center item-card ";
                newCardDiv.id = name

                const newItemNameDiv = document.createElement("div")
                newItemNameDiv.className = "col p-3 "

                const newItemName = document.createElement("h5")
                newItemName.className = "TiltWrap m-0 user-select-none "
                newItemName.innerHTML = name

                const newItemStatusDiv = document.createElement("div")
                newItemStatusDiv.className = "col-2 text-end me-4"


                const newItemStatus = document.createElement("img")
                newItemStatus.className = "icon_status"

                if (status == 3) {
                    newItemStatus.src = "surce/3.svg"
                }
                if (status == 2) {
                    newItemStatus.src = "surce/2.svg"
                }
                if (status == 1) {
                    newItemStatus.src = "surce/1.svg"
                }
                if (status == 0) {
                    newItemStatus.src = ""
                }

                //OldItem
                //var today = new Date();
                //if (today.getFullYear() - createDate.getFullYear() >= 3){
                //    console.log("Régi elem szerepel a listán.")
                //}


                listItems.appendChild(newCardDiv)
                newCardDiv.appendChild(newItemNameDiv)
                newItemNameDiv.appendChild(newItemName)
                newCardDiv.appendChild(newItemStatusDiv)
                newItemStatusDiv.appendChild(newItemStatus)



            }
            if (!data.length) {
                console.log("A lista nem tartalmaz elemeket!")
                console.log(data.length)

            } else {
                console.log("A lista elemei sikeresen betöltődtek!")
                console.log(data.length)
            }

        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }

    });
}

//////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////
$("#addItemIcon").click(function(){
    console.log("dawdawdaw")
    $("#addItemModal").show()
})


//addItem
$(document).ready(function () {
    $("#addItemBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "additem.php",
            data: { name: enterItemName.value, status: enterItemStatus.value, createDate: createDate, },
            success: function (response) {
                console.log(response);
                if (response == "success") {
                    // sikeres bejelentkezés, átirányítás a welcome.html oldalra
                    console.log("sikeres hozzáadás")
                    $("#listItems").empty();
                    loadItem()
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


//////////////////////////////////////////////////////////////////////////////////

//deleteItem
$('#deleteItemBtn').on('click', function () {

    if (!auth()) {
        return
    }

    if (!lastClickedCard) {
        return;
    }

    const itemId = lastClickedCard.attr('id');
    const username = '<?php echo $_SESSION["username"]; ?>';

    $.ajax({
        type: "POST",
        url: "deleteitem.php",
        data: { itemId: itemId, username: username },
        success: function (response) {
            console.log('Sikeresen törölted az adatot az adatbázisból.');
            lastClickedCard.remove();
            lastClickedCard = null;
            loadItem()
        },
        error: function (xhr, status, error) {
            console.error('Nem sikerült törölni az adatot az adatbázisból.', error);
        }
    });


});

// updateItem
$(document).ready(function () {
    $("#updateItemBtn").click(function () {


        // Elküldjük az adatokat a PHP szkriptnek Jquery Ajax segítségével
        $.ajax({
            type: "POST",
            url: "updateitem.php",
            data: {
                name: enterEditItemName.value,
                status: enterNewItemStatus.value,
                user: "<?php echo $_SESSION['username']; ?>",
                createDate: createDate,
                id: "<?php echo $lastClickedCard.id; ?>"
            },
            success: function (result) {
                if (result === "success") {
                    // Sikeres esetben frissítjük az oldalt
                    $("#listItems").empty();
                    loadItem()
                    toastText.innerHTML = lastClickedCard.id;
                    alertToast.show();
                } else {
                    // Hiba esetén kiírjuk a hibaüzenetet
                    toastText.innerHTML = result;
                    alertToast.show();
                }
            }
        });
    });
});


