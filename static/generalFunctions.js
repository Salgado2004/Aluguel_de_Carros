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