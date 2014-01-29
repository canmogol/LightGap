function ListController() {

    this.init = function(){
        mainController.loadPage("listPage");

        var backButton = document.getElementById("backButtonList");
        backButton.onclick = function () {
            mainController.goBack();
        };
        var ipAddressSpan = document.getElementById("userInformation");
        ipAddressSpan.innerHTML = getStorage("loginResponseMessage") + " " +  getStorage("userInformation");
        var listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        var items = JSON.parse(getStorage("items"));
        for (var i = 0; i < items.length; i++) {
            var button = document.createElement('button');
            button.className = "listItem";
            var item = items[i];
            //console.log(item);
            button.id = "id" + item.id;
            button.item = item;
            button.addEventListener('click', function () {
                alert(this.item.id + ", " + this.item.name);
            }, false);
            var linkText = document.createTextNode(item.name);
            button.appendChild(linkText);
            listContainer.appendChild(button);
        }
    };

}
