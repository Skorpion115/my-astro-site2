window.addEventListener("load", function(){ // Eigene Datei
    "use strict";
    const form = document.querySelector(".contact")
    form.addEventListener("submit", function (event){
        event.preventDefault()
        let fields = document.querySelectorAll("contact .form-control")
        let valid = true
        for (var i = 0; i < fields.length; i++) {
            fields[i].classList.remove("no error")
            if(fields[i].value === ""){
                fields[i].classList.add("has-error")
                fields[i].nextElementSibling.style.display = "block"
                valid = false
            }else{
                fields[i].classList.remove("has-error")
                fields[i].classList.add("no-error")
                fields[i].nextElementSibling.style.display = "none"
            }

        }
        if(valid){
            document.querySelector(".formfields").style.display = "none"
            document.querySelector("#alert").innerText = "Ihre Einreichung wird bearteitet, bitte warten..."
            grecaptcha.ready(function() {
                grecaptcha
                    .execute("6LfPipchAAAAAGXToP7FsDplr0Wyd-2RcyjdS96S", {
                    action: "contact"
                })
                .then(function(token){
                    let recaptchaResponse = document.getElementById("recaptchaResponse")
                    recaptchaResponse.value = token
                    fetch("/send.php", {
                        method: "POST",
                        body: new FormData(form),
                    })
                     .then((response) => response.text())
                     .then((response) => {
                        //console.log(response)
                        const responseText = JSON.parse(response)
                        if(responseText.error !== "") {
                            document.querySelector('#alert').innerText = responseText.error
                            document.querySelector('#alert').classList.add("error")
                            document.querySelector(".formfields").style.display = "block"
                            return
                        }
                        document.querySelector("#alert").innerText = responseText.success
                        document.querySelector("#alert").classList.add("success")
                        window.location.replace("/recaptchev3/thanks.html")
                    })
                })
            })
        }
    })
})