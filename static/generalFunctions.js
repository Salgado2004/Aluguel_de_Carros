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
                        <button onclick='allowEdit(${element.getAttribute('aria-details')})'>
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
            let url = `http://127.0.0.1:5000/new-rent`;
            const data = {"idCarro": idCarro, "idUsuario": idUsuario, "local": localRent, "data": dataRent, "hora": horaRent, "finalizado": finalizado};
            fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            .then(response => response.json())
            .then(json =>{
                if (json.sucess){
                    alert(json.message);
                }
            })
            .catch(error => console.error(error))
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

function allowEdit(id){
    rent = document.querySelector(`#rent${String(id)}`);
    rent.style.display = "none";

    editables = document.querySelectorAll(`.editable${String(id)}`);
    editables.forEach(element => {
        element.style.display = "none";
    });
    placa = editables[0].innerText.split(": ");
    valor = editables[1].innerText.split("R$");
    statusCarro = editables[2].innerText;

    formEdit = document.querySelector(`#edit${String(id)}`);
    formEdit.innerHTML = `
        <form id="editing${String(id)}" action="/edit" method="post" onsubmit="edit(e)">
            <li>Placa: <input type="text" id="new-obs-${String(id)}" placeholder="Placa" value="${placa[1]}" required></li>
            <li>Diária: R$<input type="number" id="new-valor-${String(id)}" placeholder="Valor" step="10" value="${valor[1]}" required></li>
            <li>
                <select id="new-status-${String(id)}" required>
                    <option value="1">Disponível</option>
                    <option value="3">Em manutenção</option>
                </select>
            </li>
            <div>
                <button id="edit" type="submit">
                    <span class="material-symbols-outlined">done</span>
                </button>
                <button id="cancel">
                    <span class="material-symbols-outlined" onclick="cancelEdit(${id})">close</span>
                </button>
            </div>
        </form>
    `;    

    editing = document.querySelector(`#editing${String(id)}`);
    editing.onsubmit = function(e){
        e.preventDefault();
        newPlaca = document.querySelector(`#new-obs-${String(id)}`).value;
        newValor = document.querySelector(`#new-valor-${String(id)}`).value;
        newStatus = document.querySelector(`#new-status-${String(id)}`).value;

        let url = `http://127.0.0.1:5000/update/${id}`;
        const data = {'newObs': newPlaca, 'newValor': newValor, 'newStatus': newStatus};
        fetch(url,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json =>{
            if (json.sucess){
                alert(json.message);
            }
        })
        .catch(error => console.error(error))
    }
}

function cancelEdit(id){
    rent = document.querySelector(`#rent${String(id)}`);
    rent.style.display = "block";

    editables = document.querySelectorAll(`.editable${String(id)}`);
    editables.forEach(element => {
        element.style.display = "block";
    });
    formEdit = document.querySelector(`#edit${String(id)}`);
    formEdit.innerHTML = ``; 
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


