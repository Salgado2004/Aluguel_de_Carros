valor = document.querySelector("#valor");

valor.oninput = function(){
    label = document.querySelector("#labelValor");
    label.innerText = `Valor da diária: R$${valor.value},00`;
}