document.body.onload = function(){
    url = "http://127.0.0.1:5000/islogged"
    fetch(url,{
        method:"GET"
    })
    .then(response => response.json())
    .then(json =>{
        perfil = document.querySelector("#perfil")
        if (json.login.logged == "True"){
            var nome = json.login.nome;
            window.sessionStorage.setItem("idUsuario", json.login.id);
            perfil.innerHTML = `
            <div>
                <p>${nome}</p>
                <a href="#" class="options">Meu histórico</a><br>
                <button id="logout">Sair <span class="material-symbols-outlined">logout</span></button>
            </div>
            `;
        } else{
            window.sessionStorage.setItem("login", false);
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
        } else if (window.sessionStorage.getItem("login")){
            alert("É necessário estar logado para alugar um veículo")
        } else{
            horaRent = hora.value;
            dataRent = data.value;
            localRent = local.value;
            idCarro = parseInt(element.name);
            idUsuario = window.sessionStorage.getItem("idUsuario");
            finalizado = "Não";
            alert(`Usuario ${idUsuario} alugou o carro ${idCarro}`);
        }
    }
});

