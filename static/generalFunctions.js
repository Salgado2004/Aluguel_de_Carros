document.body.onload = function(){
    url = "http://127.0.0.1:5000/islogged"
    fetch(url,{
        method:"GET"
    })
    .then(response => response.json())
    .then(json =>{
        alert(`Login: ${json.login.logged}`);
    })
    .catch(error => console.error(error))
}


local = document.querySelector("#local");
data = document.querySelector("#data");
hora = document.querySelector("#hora");

local.oninput = function(){
    data.disabled = false;
    data.title = "";
}

data.oninput = function(){
    hora.disabled = false;
    hora.title = "";
}

