"use strict";

const logout = document.querySelector(".logout");
const token = window.localStorage.getItem("token");

if (!token) {
    window.location.replace("index.html")
}

logout.addEventListener("click", function (e) {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.location.replace("index.html");
})