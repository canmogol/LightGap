window.onload = function () {
    var backButton = document.getElementById("backButton");
    backButton.onclick = function () {
        mainController.goBack();
    };
    var ipAddressSpan = document.getElementById("userInformation");
    ipAddressSpan.innerHTML = getStorage("loginResponseMessage") + " " +  getStorage("userInformation");
    var listContainer = document.getElementById("listContainer");
    listContainer.addEventListener('touchstart', function (event) {
    });

    var items = JSON.parse(getStorage("items"));
    for (var i = 0; i < items.length; i++) {
        var button = document.createElement('button');
        button.className = "listItem";
        var item = items[i];
        //console.log(item);
        button.id = "id" + item.id;
        button.item = item;
        button.addEventListener('click', function () {
            alert("name: " + this.item.name + " id: " + this.item.id);
        }, false);
        var linkText = document.createTextNode(item.name);
        button.appendChild(linkText);
        listContainer.appendChild(button);
    }
};

function ListController() {
}
