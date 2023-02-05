document.body.onload = function(){
    idUsuario = window.sessionStorage.getItem("idUsuario");

    url = `http://127.0.0.1:5000/load-historico/${idUsuario}`;
    fetch(url,{
        method:"GET"
    })
    .then(response => response.json())
    .then(json =>{
        rentCount = document.querySelector("#rentCount");
        lista = document.querySelector("#alugueis");

        if (json.rentCount == 1){
            rentCount.innerText = `${json.rentCount} aluguel realizado`;
        } else{
            rentCount.innerText = `${json.rentCount} alugueis realizados`;
        }
        json.alugueis.forEach(element => {
            lista.innerHTML += `
            <tr>
                <td>${element.marca} ${element.modelo}</td>
                <td>${element.data}</td>
                <td>${element.hora}</td>
                <td>${element.finalizado}</td>
            </tr>
            `;
        });
    })
    .catch(error => console.error(error))
}