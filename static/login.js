formLogin = document.querySelector("#formLogin");

formLogin.onsubmit = function(e){
    e.preventDefault();
    email = document.querySelector("#email").value;
    senha = document.querySelector("#senha").value;
    if (email != "" && senha != ""){
        url = "http://127.0.0.1:5000/login";
        data = {"email": email, "senha": senha};
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
                window.location.replace("http://127.0.0.1:5000/");
            } else{
                error = document.querySelector("#error");
                error.style.visibility = "visible";
                error.innerText = json.message;
            }
        })
        .catch(error => console.error(error))
    } else{
        error = document.querySelector("#error");
        error.style.visibility = "visible";
        error.innerText = "Dados não informados";
    }
}