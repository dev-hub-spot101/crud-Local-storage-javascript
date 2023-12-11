
function validationForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;

    if (!name) {
        alert("Name is required!");
        return false;
    }
    if (!email) {
        alert("Email is required!");
        return false;
    }
    if (!age) {
        alert("Age is required!");
        return false;
    }
    if (!address) {
        alert("Address is required!");
        return false;
    }
    return true;
}

function showData() {
    var userList;
    if (localStorage.getItem('userList') == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem('userList'));
    }

    var html = "";

    userList.forEach((element, index) => {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += `<td> 
        <button class="btn btn-danger" onclick="deleteData(${index})">
            Delete
        </button>
        <button class="btn btn-warning m-2" onclick="updateData(${index})">
            Edit
        </button>
        
        </td>`;
        html += "</tr>";

    });

    document.querySelector("#crudtable tbody").innerHTML = html;
}

document.onload = showData();

function AddData() {
    if (validationForm() == true) {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var userList;
        if (localStorage.getItem('userList') == null) {
            userList = [];
        } else {
            userList = JSON.parse(localStorage.getItem('userList'));
        }

        userList.push({
            name: name,
            email: email,
            age: age,
            address: address,
        });

        localStorage.setItem('userList', JSON.stringify(userList))
        showData();

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
    }

}

function deleteData(index) {
    var userList;
    if (localStorage.getItem('userList') == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem('userList'));
    }
    userList.splice(index, 1);

    localStorage.setItem('userList', JSON.stringify(userList))
    showData();

}

function updateData(index) {
    document.getElementById("submit").style.display = 'none';
    document.getElementById("update").style.display = 'block';

    var userList;
    if (localStorage.getItem('userList') == null) {
        userList = [];
    } else {
        userList = JSON.parse(localStorage.getItem('userList'));
    }

    document.getElementById("name").value = userList[index].name;
    document.getElementById("email").value = userList[index].email;
    document.getElementById("age").value = userList[index].age;
    document.getElementById("address").value = userList[index].address;


    document.querySelector("#update").onclick = function () {
        userList[index].name = document.getElementById("name").value;
        userList[index].email = document.getElementById("email").value;
        userList[index].age = document.getElementById("age").value;
        userList[index].address = document.getElementById("address").value;

        localStorage.setItem('userList', JSON.stringify(userList))
        showData();

        document.getElementById("submit").style.display = 'block';
        document.getElementById("update").style.display = 'none';
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
    }
}