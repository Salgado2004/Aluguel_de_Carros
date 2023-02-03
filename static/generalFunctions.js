document.body.onload = function(){
    url = "http://127.0.0.1:5000/islogged"
    fetch(url,{
        method:"GET"
    })
    .then(response => response.json())
    .then(json =>{
        perfil = document.querySelector("#perfil")
        if (json.login.logged == "True"){
            perfil.innerHTML = `
            <div>
                <p>${json.login.nome}</p>
                <a href="#" class="options">Meus empréstimos</a><br>
                <a href="#" class="options">Meu histórico</a><br>
                <button id="logout">Sair <span class="material-symbols-outlined">logout</span></button>
            </div>
            `;
        }
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

