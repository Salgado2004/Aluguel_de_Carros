document.body.onload = function(){
    url = "http://127.0.0.1:5000/islogged";
    fetch(url,{
        method:"GET"
    })
    .then(response => response.json())
    .then(json =>{
        perfil = document.querySelector("#perfil")
        if (json.login.logged == "True"){
            window.sessionStorage.setItem("login", "true");
            var nome = json.login.nome;
            window.sessionStorage.setItem("idUsuario", json.login.id);
            perfil.innerHTML = `
            <div>
                <p>${nome}</p>
                <a href="/meu-historico" class="options">Meu histórico</a><br>
                <button id="logout" onclick="logout()">Sair <span class="material-symbols-outlined">logout</span></button>
            </div>
            `;

            forDono = document.querySelectorAll(".slide__content");
            forDono.forEach(element => {
                idUser = `${window.sessionStorage.getItem("idUsuario")}`;
                if (element.ariaLabel == idUser){
                    divUD = element.children[0];
                    divUD.innerHTML = `
                        <button onclick='editar(${element.getAttribute('aria-details')})'>
                        <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button onclick='deletar(${element.getAttribute('aria-details')})'>
                        <span class="material-symbols-outlined">delete</span>
                        </button>
                    `;
                }
            });
        } else{
            window.sessionStorage.setItem("login", "false");
        }
    })
    .catch(error => console.error(error))
}

filtros = document.querySelectorAll(".order");

filtros.forEach(button => {
    button.onclick = function(){
        window.location.replace(`http://127.0.0.1:5000?sort=${button.name}`);
    }
}); 




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

rentings = document.querySelectorAll(".rent")

rentings.forEach(element => {
    element.onclick = function(){
        if (hora.value == ""){
            alert("Informe todos os dados do aluguel");
        } else if (window.sessionStorage.getItem("login") == "true"){
            horaRent = hora.value;
            dataRent = data.value;
            localRent = local.value;
            idCarro = parseInt(element.name);
            idUsuario = window.sessionStorage.getItem("idUsuario");
            finalizado = "Não";
            alert(`Usuario ${idUsuario} alugou o carro ${idCarro}`);
        } else{
            alert("É necessário estar logado para alugar um veículo");
        }
    }
});

function addCar(){
    if (window.sessionStorage.getItem("login") == "true"){
        window.location.replace("/add-car");
    } else{
        alert("É necessário estar logado para acessar essa função");
    }
}


function deletar(id){
    url = `http://127.0.0.1:5000/delete/${id}`;
    fetch(url,{
        method:"DELETE"
    })
    .then(response => response.json())
    .then(json =>{
        alert(json.message);
    })
    .catch(error => console.error(error))
}

function editar(id){
    alert("ok, editar é mais dboa");
}

function logout(){
    url = "http://127.0.0.1:5000/logout";
    fetch(url,{
        method:"GET"
    })
    .then(response => response.json())
    .then(json =>{
        console.log(json.message);
        if (json.sucess){
            window.sessionStorage.setItem("login", "false")
            window.sessionStorage.setItem("idUsuario", "");
            window.location.reload();
        }
    })
    .catch(error => console.error(error))
}


