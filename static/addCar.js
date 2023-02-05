valor = document.querySelector("#valor");

valor.oninput = function(){
    label = document.querySelector("#labelValor");
    label.innerText = `Valor da diária: R$${valor.value},00`;
}


form = document.querySelector("#new-car-form");

form.onsubmit = function(e){
    e.preventDefault();
    model = document.querySelector("#modelo").value;
    marca = document.querySelector("#marca").value;
    obs = document.querySelector("#obs").value;
    ano = document.querySelector("#year").value;
    valor = document.querySelector("#valor").value;
    statusCarro = 1;
    dono = window.sessionStorage.getItem("idUsuario");
    img = document.querySelector("input[type='radio']:checked").value;

    let url = `http://127.0.0.1:5000/new-car`;
    const data = {"model": model, "marca": marca, "obs": obs, "ano": ano, "valor": valor, "status": statusCarro, "dono": dono, "img": `carro${img}.png`};
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
            window.location.replace("http://127.0.0.1:5000");
        }
    })
    .catch(error => console.error(error))

}