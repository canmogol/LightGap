window.onload = function () {
    var backButton = document.getElementById("backButton");
    backButton.onclick = function () {
        mainController.goBack();
    };
    var ipAddressSpan = document.getElementById("userInformation");
    ipAddressSpan.innerHTML = "welcome " + getStorage("userInformation");
    var listContainer = document.getElementById("listContainer");
    listContainer.addEventListener('touchstart', function(event){});

    var adliyeler = JSON.parse(getStorage("adliyeler"));
    for (var i = 0; i < adliyeler.length; i++) {
        var button = document.createElement('button');
        button.className = "listItem";
        var adliye = adliyeler[i];
        button.id = "id" + adliye.id;
        button.adliye = adliye;
        button.addEventListener('click', function () {
            alert("AdliyeAdi: " + this.adliye.AdliyeAdi);
        }, false);
        var linkText = document.createTextNode(adliye.AdliyeAdi);
        button.appendChild(linkText);
        listContainer.appendChild(button);
    }
};

function ListController() {
}
