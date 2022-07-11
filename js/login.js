"use strict";

const elForm = document.querySelector(".form");
const userName = document.querySelector(".userName");
const userPassword = document.querySelector(".userPassword");
const loginBtn = document.querySelector(".loginBtn");
const error = document.querySelector(".error");

elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let user = userName.value;
    let password = userPassword.value;

    fetch("https://reqres.in/api/login", {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(
            {
                email: user,
                password: password
            }
        )
    }).then(res => res.json()).then(data => {
        if (data.token) {
            window.localStorage.setItem("token", data.token);
            window.location.replace("home.html")
        } else {
            error.style.display = 'block';
            loginBtn.style.marginTop = '5px'
        }
    })
})