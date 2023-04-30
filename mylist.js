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
        lastClickedCard.removeClass("border border-2 border-end-0 last-clicked");
        lastClickedCard = null;
    }
}

function addCardBorder(card) {
    removeCardBorder();
    card.addClass("border border-2 border-end-0 last-clicked");
    lastClickedCard = card;
    console.log("Kiválasztott tétel: " + lastClickedCard.attr("id"));
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
    getInvite()
    
})


//////////////////////////////////////////////////////////////////////////////////

//auth
function auth() {
    $.ajax({
        type: "GET",
        url: "auth.php",
        dataType: "json",
        success: function (data) {
            // Sikeres válasz esetén kezeljük a visszatérő adatot
            if (data == "failed") {
                // A felhasználó nincs bejelentkezve, megjelenítjük az üzenetet
                console.log("A felhasználó nincs bejelentkezve!")
                $.removeCookie("selectedUser")
                window.location.replace("login.html");
                

            } else {
                // A felhasználó be van jelentkezve, megjelenítjük a tartalmat
                console.log("A felhasználó be van jelentkezve!")

                for (var i = 0; i < data.length; i++) {
                    var username = data[i].username;
                    var id = data[i].id;

                    document.title = username + " | " + "GIFTLIST"
                    $("#displayTitle").text(username + "'s list")
                    $("#username").text(username)
                    $("#id").text(id)

                    un = username
                    userto = username

                    console.log(un + "/////" + userto)

                    const mylist = document.querySelector('#mylist')

                    const myListCard = document.createElement('div')
                    myListCard.className = "row bg-light mx-3 mb-3 rounded-4 align-items-center invite-card "
                    myListCard.id = un

                    const myListCardCol1 = document.createElement('div')
                    myListCardCol1.className = "col p-0 "

                    const myListCardCol1P = document.createElement('p')
                    myListCardCol1P.className = "TiltWrap text-dark m-3 "
                    myListCardCol1P.innerHTML = un

                    const myListCardCol2 = document.createElement('div')
                    myListCardCol2.className = "col-2 text-end "

                    const myListCardCol2Div = document.createElement('div')
                    myListCardCol2Div.className = "me-2 "

                    mylist.insertAdjacentElement("afterend", myListCard)
                    myListCard.appendChild(myListCardCol1)
                    myListCard.appendChild(myListCardCol2)
                    myListCardCol1.appendChild(myListCardCol1P)
                    myListCardCol2.appendChild(myListCardCol2Div)


                }

                var selectedUser =  $.cookie('selectedUser')
                console.log(selectedUser)
                //loadItem(selectedUser)
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }
    });
}
// Cookie érték figyelése
//function watchCookie(cookieName, callback) {
//    var lastCookie = document.cookie;
//    setInterval(function () {
//        var cookieValue = document.cookie;
//        if (cookieValue !== lastCookie) {
//            lastCookie = cookieValue;
//            if (cookieValue.indexOf(cookieName) !== -1) {
//                callback();
//            }
//        }
//    }, 100);
//}

// Műveletek a cookie módosítása esetén
//function handleCookieChange() {
//    $.ajax({
//        type: "POST",
//        url: "logout.php",
//        success: function (data) {
//            // Sikeres válasz esetén átirányítjuk a felhasználót a bejelentkezési oldalra
//            window.location.href = "login.html";
//        },
//        error: function () {
//            // Hibás AJAX hívás esetén kezeljük a hibát
//            $("#message").html("Hiba történt az AJAX hívás során.");
//        }
//    });
//    // Itt lehet további műveleteket végezni a cookie módosítása esetén
//}
//
//// Watch the cookie named "myCookie" for changes
//watchCookie("PHPSESSID", handleCookieChange);

//////////////////////////////////////////////////////////////////////////////////


//loadItem
function loadItem(username) {
    var userlist = userto
    $.ajax({
        url: "getitem.php",
        data: {
            username: username,
            userto: userto,
        },
        type: "POST",
        dataType: "json",


        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var name = data[i].name;
                    var status = data[i].status;
                    var user = data[i].user;
                    var createDate = data[i].createDate;
                    var id = data[i].id;
                    var userto = data[i].userto;

                    //Kiírás
                    console.log(name + ", " + status + ", " + user + ", " + userto + ", " + createDate + ", " + id)

                    const newCardDiv = document.createElement("div")
                    newCardDiv.className = "row ms-4 mb-4 rounded-start-4 align-items-center item-card ";
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

                    if (user == userto){
                        newCardDiv.className += "bg-white"
                    } else {
                        newCardDiv.className += "other-card"
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
            } else {
                toastText.innerHTML = userlist + ' listája jelenleg üres.';
                alertToast.show()
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
$("#addItemIcon").click(function () {
    $("#addItemModal").modal('show')
})


//addItem
$(document).ready(function () {
    $("#addItemBtn").click(function () {
        $.ajax({
            type: "POST",
            url: "additem.php",
            data: { name: enterItemName.value, status: enterItemStatus.value, createDate: createDate, userto: userto },
            success: function (response) {
                if (response == "success") {
                    $("#listItems").empty();
                    loadItem(un)
                    toastText.innerHTML = enterItemName.value + " tétel hozzá lett adva a listához!";
                    alertToast.show()
                    enterItemName.value = ""
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

$("#updateItemIcon").click(function () {
    if (lastClickedCard != null) {
        $("#updateItemModal").modal('show')
        enterEditItemName.value = lastClickedCard.attr("id")
    } else {
        toastText.innerHTML = "Kérlek, válassz egy tételt a listából!";
        alertToast.show()
    }


})

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
                createDate: createDate,
                selectedItem: lastClickedCard.attr("id"),
                userto: userto,
            },
            success: function (result) {
                if (result === "success") {
                    // Sikeres esetben frissítjük az oldalt
                    $("#listItems").empty();
                    loadItem(userto)
                    toastText.innerHTML = lastClickedCard.attr("id") + " tétel módosítva lett.";
                    alertToast.show();
                    lastClickedCard = null
                    $("#updateItemModal").modal('hide')
                } else {
                    // Hiba esetén kiírjuk a hibaüzenetet
                    toastText.innerHTML = result;
                    alertToast.show();
                }
            }
        });
    });
});

//deleteItem
$('#removeItemYes').on('click', function () {
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
        },
        error: function (xhr, status, error) {
            console.error('Nem sikerült törölni az adatot az adatbázisból.', error);
        }
    });

    $('#removeItemModal').modal('hide')


});

$('#removeItemNo').on('click', function () {
    $('#removeItemModal').modal('hide')
})

//deleteItemModal

$('#deleteItemBtn').on('click', function () {
    if (lastClickedCard != null) {
        $('#selectedItem').text("Would you like to permanently remove the '" + lastClickedCard.attr('id') + "' item from your list?")
        $('#removeItemModal').modal('show')
    } else {
        toastText.innerHTML = "Kérlek, válassz egy tételt a listából!";
        alertToast.show()
    }
})

//invite

$('#inviteModalBtn').on('click', function () {
    $('#inviteModal').modal('show')
})

$('#inviteBtn').on('click', function () {

    const invitedUser = document.querySelector('#invitedUser')

    $.ajax({
        type: "POST",
        url: "invite.php",
        data: {
            invitedUser: invitedUser.value,
            createDate: createDate,
        },
        success: function (response) {
            if (response == "success") {
                toastText.innerHTML = response
                alertToast.show()
            } else {
                toastText.innerHTML = response
                alertToast.show()
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }
    })
})

//viewList

let lastClickedInviteCard = null;

function addCardBorderi(card) {
    if (lastClickedInviteCard) {
        lastClickedInviteCard.removeClass("border border-4 border-danger last-clickedi");
    }
    card.addClass("border border-4 border-danger last-clickedi");
    lastClickedInviteCard = card;
    console.log("Kiválasztott tétel: " + lastClickedInviteCard.attr("id"));
}


$(document).on('click', '.invite-card', function (event) {
    const card = $(event.target).closest('.invite-card');
    if (!card.length) {
        return;
    }


    addCardBorderi(card);
    $("#listItems").empty();
    userto = lastClickedInviteCard.attr("id")
    var selectedUser = $.cookie("selectedUser",userto)
    console.log(un + "//////" + userto)
    loadItem(selectedUser)
    document.title = lastClickedInviteCard.attr("id") + " | " + "GIFTLIST"
    $("#displayTitle").text(lastClickedInviteCard.attr("id") + "'s list")
    $('#offcanvasMenu').offcanvas('hide');

});



//getinvite

function getInvite() {
    $.ajax({
        url: "getinvite.php",
        type: "POST",
        dataType: "json",


        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var invitationUser = data[i].invitationUser;
                    var invitedUser = data[i].invitedUser
                    var createDate = data[i].createDate;

                    const inviteList = document.querySelector('#inviteList')

                    const inviteCard = document.createElement('div')
                    inviteCard.className = "row bg-light mx-3 mb-4 rounded-4 align-items-center invite-card ";
                    inviteCard.id = invitationUser

                    const inviteCardCol1 = document.createElement('div')
                    inviteCardCol1.className = "col p-0 "

                    const inviteCardCol1P = document.createElement('p')
                    inviteCardCol1P.className = "TiltWrap text-dark m-3 "
                    inviteCardCol1P.innerHTML = invitationUser

                    const inviteCardCol2 = document.createElement('div')
                    inviteCardCol2.className = "col-2 text-end "

                    const inviteCardCol2Div = document.createElement('div')
                    inviteCardCol2Div.className = "me-2 "


                    inviteList.appendChild(inviteCard)
                    inviteCard.appendChild(inviteCardCol1)
                    inviteCardCol1.appendChild(inviteCardCol1P)
                    inviteCard.appendChild(inviteCardCol2)
                    inviteCardCol2.appendChild(inviteCardCol2Div)

                }
            } else {
                //toastText.innerHTML = "Probléma van az invite-tal!!";
                //alertToast.show()
            }
        },
        error: function () {
            // Hibás AJAX hívás esetén kezeljük a hibát
            $("#message").html("Hiba történt az AJAX hívás során.");
        }

    });
}


$('#myList').on('click', function () {
    $("#listItems").empty();
    auth()
})


$('#logoBtn').on('click', function () {
    $('#offcanvasMenu').offcanvas('show');
});





