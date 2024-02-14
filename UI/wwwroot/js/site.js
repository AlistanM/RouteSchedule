// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

window.onload = function () {
    initEvent()
}
function initEvent() {
    cars = document.getElementById("cars")
    drivers = document.getElementById("drivers")
    crews = document.getElementById("crews")
    cars.onclick = openCars
    drivers.onclick = openDrivers
    crews.onclick = openCrews
    tableName = ""

    popup = document.getElementById("popup")
    close = document.getElementById("close")
    change = document.getElementById("change")
    close.addEventListener('click', function (event) {

        closePopup(popup)
    })

    change.addEventListener('click', function (event) {

        saveChanges()
    })
}


function openPopup(popup, id, controllerName) {
    div = document.getElementById("popup-info")
    buttons = document.getElementById("buttons")
    url = `${apiUrl}/${controllerName}/Get?id=${id}`
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            obj = JSON.parse(this.responseText)
            table = createPopup(obj)

            div.insertBefore(table, buttons)
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", apiUrl)
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    xmlhttp.send();


    popup.classList.add("show")
}

function deleteObj(id, controllerName) {
    url = `${apiUrl}/${controllerName}/Delete?id=${id}`
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (controllerName == "Cars")
                openCars()
            if (controllerName == "Drivers")
                openDrivers()
            if (controllerName == "Crews")
                openCrews()
        }
    }
    xmlhttp.open("GET", url, true);

    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", apiUrl)
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    xmlhttp.send();

}

function closePopup(popup) {
    table = document.getElementById("objInfo")
    table.parentNode.removeChild(table)
    popup.classList.remove("show")
}

function openCars() {
    div = document.getElementById("info")
    div.innerHTML = ""
    tableName = "Cars"
    url = `${apiUrl}/Cars/GetAll`
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cars = JSON.parse(this.responseText)
            if (cars.length != 0)
            {
                table = createTable(cars, tableName)
                div.appendChild(table)
            }
            else {
                h = document.createElement("h1")
                h.innerHTML = "Нет информации о машинах"
                div.appendChild(h)

                btn = document.createElement("button")
                btn.setAttribute("name", tableName)
                btn.innerText = "Добавить"
                btn.addEventListener('click', function (event) {
                    addElement(this.name)
                })
                div.appendChild(btn)
            }
        }
    }
    xmlhttp.open("GET", url, true);
    
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", apiUrl)
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    xmlhttp.send();
}

function addElement(name) {
    url = `${apiUrl}/${name}/Create`
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (name == "Cars")
                openCars()
            if (name == "Drivers")
                openDrivers()
            if (name == "Crews")
                openCrews()
        }
    }
    xmlhttp.open("GET", url, true);

    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", apiUrl)
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    xmlhttp.send();
}

function openDrivers() {
    div = document.getElementById("info")
    div.innerHTML = ""
    tableName = "Drivers"
    url = `${apiUrl}/Drivers/GetAll`
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            drivers = JSON.parse(this.responseText)

            table = createTable(drivers, tableName)
            div.appendChild(table)
        }
    }
    xmlhttp.open("GET", url, true);

    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", apiUrl)
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    xmlhttp.send();
}

function openCrews() {

}

function createTable(obj, name) {

    table = document.createElement("table");
    tr = document.createElement("tr");
    table.appendChild(tr)
    let keys = Object.keys(obj[0]);

    for (i = 0; i < keys.length; i++)
    {
        td = document.createElement("td")
        td.innerHTML = `<h1>${keys[i]}</h1>`;
        tr.appendChild(td)
    }


    for (i = 0; i < obj.length; i++)
    {
        tr = document.createElement("tr");
        table.appendChild(tr)
        for (j = 0; j < keys.length; j++) {
            td = document.createElement("td");
            td.innerHTML = `<h2>${obj[i][keys[j]]}</h2?`;
            tr.appendChild(td)
        }

        td = document.createElement("td");
        td.innerHTML = `<button name="${name}" id="${obj[i]["id"]}" class="open popup-button">Изменить</button>`
        btn = td.querySelector('button')
        btn.addEventListener('click', function (event) {
            openPopup(popup, this.id, this.name)
        })
        tr.appendChild(td)

        td = document.createElement("td");
        td.innerHTML = `<button name="${name}" id="${obj[i]["id"]}" class="delete popup-button">Удалить</button>`
        btn = td.querySelector('button')
        btn.addEventListener('click', function (event) {
            deleteObj(this.id, this.name)
        })
        tr.appendChild(td)
    }

    return table;
}

function createPopup(obj) {
    table = document.createElement("table");
    table.setAttribute('id', 'objInfo');
    console.log(table.id);
    tr = document.createElement("tr");
    table.appendChild(tr)
    let keys = Object.keys(obj);

    for (i = 0; i < keys.length; i++) {
        td = document.createElement("td")
        td.innerHTML = `<h1>${keys[i]}</h1>`;
        tr.appendChild(td)
    }


        tr = document.createElement("tr");
        table.appendChild(tr)
        for (j = 0; j < keys.length; j++) {
            td = document.createElement("td");
            td.innerHTML = `<h2>${obj[keys[j]]}</h2?`;
            tr.appendChild(td)
        }

    tr = createFields(obj);
    table.appendChild(tr);

    return table;
}

function createFields(obj) {
    let keys = Object.keys(obj);
    tr = document.createElement("tr")
    td = document.createElement("td");
    tr.appendChild(td)
    for (i = 1; i < keys.length; i++) {
        td = document.createElement("td");
        td.innerHTML = `<input type="text" id="${keys[i]}"></input>`
        tr.appendChild(td)
    }

    return tr;
}

var selectedid = null

//function delImage() {
//    filename = document.getElementById("name")
//    descript = document.getElementById("descript")
//    image = document.getElementById("Image")
//    filename.value = ""
//    descript.value = ""
//    image.src = ""
//    var xmlhttp = new XMLHttpRequest();
//    var url = `/api/image/delete?id=${selectedid}`;
//    xmlhttp.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            listInit()
//        }
//    }
//    xmlhttp.open("GET", url, true);
//    xmlhttp.send();
//}

//function saveImage() {
//    let xmlhttp = new XMLHttpRequest();
//    let xmlhttp2 = new XMLHttpRequest();
//    filename = document.getElementById("name")
//    descript = document.getElementById("descript")
//    input = document.getElementById("load")

//    if (input.value) {
//        var body = JSON.stringify({
//            name: filename.value,
//            description: descript.value
//        })

//        let url = `/api/image/save`
//        xmlhttp.onreadystatechange = function () {
//            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                console.log("File successfully uploaded!");
//            }
//        };
//        xmlhttp.open("POST", url, true);
//        xmlhttp.setRequestHeader("Content-Type", "application/json;");
//        xmlhttp.send(body);


//        let url2 = `/api/image/saveimage`
//        xmlhttp2.onreadystatechange = function () {
//            if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
//                // The file has been uploaded successfully
//                console.log("File successfully uploaded!");
//            }
//        };
//        var reader = new FileReader();
//        reader.readAsDataURL(input.files[0]);
//        reader.onload = function () {
//            var resultStr = reader.result;
//            xmlhttp2.open("POST", url2, true)
//            xmlhttp2.setRequestHeader("Content-Type", "application/json;");
//            xmlhttp2.send(resultStr);
//        };
//    }

//    else {
//        var body = JSON.stringify({
//            id: selectedid,
//            name: filename.value,
//            description: descript.value
//        })
//        var url = `/api/image/update`
//        xmlhttp.open("POST", url, true);
//        xmlhttp.setRequestHeader("Content-Type", "application/json;");
//        xmlhttp.send(body);
//    }

//    xmlhttp.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            listInit()
//        }
//    }

//    input.value = ""
//    filename.value = ""
//    descript.value = ""
//}


//function addElement(name, id) {
//    list = document.getElementById("ElementList");

//    li = document.createElement("li");
//    li.innerHTML = `<a href="#">${name}</a>`;
//    li.value = id;
//    list.appendChild(li);
//    li.onclick = function () {
//        filename = document.getElementById("name")
//        descript = document.getElementById("descript")
//        info = files.find(x => { return x.id == id })
//        filename.value = info.name
//        descript.value = info.descript
//        selectedid = id
//        var xmlhttp = new XMLHttpRequest();
//        var url = `/api/image/getimage?id=${selectedid}`;

//        xmlhttp.onreadystatechange = function () {
//            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                imageData = this.responseText
//                document.getElementById("Image").src = "data:image/png;base64," + imageData;
//            }
//        }

//        xmlhttp.open("GET", url, true);
//        xmlhttp.send();

//        this.getElementsByTagName("a").className = "active"
//    }
//}

//function updateList() {
//    list = document.getElementById("ElementList");
//    li = list.getElementsByTagName("li")
//    while (li.length > 0) {
//        li[0].remove()
//    }
//    for (i = 0; i < files.length; i++) {
//        addElement(files[i].name, files[i].id)
//    }
//}

//var files = []

//function listInit() {
//    files.length = 0
//    var xmlhttp = new XMLHttpRequest();
//    var url = `/api/image/files`;
//    xmlhttp.onreadystatechange = function () {
//        if (this.readyState == 4 && this.status == 200) {
//            var elemList = JSON.parse(this.responseText);
//            for (i = 0; i < elemList.length; i++) {
//                files.push({ id: elemList[i].id, name: elemList[i].name, descript: elemList[i].description })
//            }
//            updateList()
//        }
//    };
//    xmlhttp.open("GET", url, true);
//    xmlhttp.send();
//}

//function disableSelect() {
//    list = document.getElementById("ElementList")
//    li = list.getElementsByTagName("li")
//    for (i - 0; i < li.length; i++) {
//        li[i].getElementsByTagName("a")[0].className = ""
//    }
//}
