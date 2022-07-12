"use strict";

const logout = document.querySelector(".logout");
const token = window.localStorage.getItem("token");

const showing = document.querySelector(".results");
const result = document.querySelector(".result");
const searchInput = document.querySelector(".searchInput");
const bookmarks = document.querySelector(".bookmarksList");
const booksList = document.querySelector(".booksList");
const orderBtn = document.querySelector(".orderBtn");
const elForm = document.querySelector(".form");

let startIndex = 0;
let seacrh = 'Python';
let order = "relevance"

// token checking
if (!token) {
    window.location.replace("index.html")
}
logout.addEventListener("click", function (e) {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.location.replace("index.html");
})
// =========================
// !!!!!!!!!!!!!!!!!!!!!!!!!
let booksArray = [];
let bookmarksArray = [];

const renderBookmarks = function (arr, html) {
    arr.forEach(bookmark => {
        let bkmrk = document.createElement("li");
        let body = document.createElement("div");
        let btns = document.createElement("div");
        let readLink = document.createElement("a");
        let readBtn = document.createElement("img");
        let deleteBtn = document.createElement("img");
        let bkmrkTitle = document.createElement("h4");
        let bkmrkAuthor = document.createElement("p");

        // CLASSES
        bkmrk.setAttribute("class", "bookmark");
        bkmrkTitle.setAttribute("class", "bookmark__title");
        bkmrkAuthor.setAttribute("class", "bookmark__sub");
        deleteBtn.setAttribute("class", "bookmark__delete");
        readBtn.setAttribute("class", "bookmark__read");
        btns.setAttribute("class", "bookmark__images");
        readLink.setAttribute("class", "readLink");

        // DATASET 
        readLink.dataset.readId = bookmark?.id;
        deleteBtn.dataset.deleteId = bookmark?.id;

        // TextContent
        bkmrkTitle.textContent = bookmark?.volumeInfo?.title;
        bkmrkAuthor.textContent = bookmark?.volumeInfo?.authors[0];
        readBtn.src = "./img/book-open.png";
        deleteBtn.src = "./img/delete.png";
        readLink.href = bookmark?.volumeInfo?.previewLink;

        // APPEND
        bkmrk.appendChild(body);
        bkmrk.appendChild(btns);
        body.appendChild(bkmrkTitle);
        body.appendChild(bkmrkAuthor);
        readLink.appendChild(readBtn);
        btns.appendChild(readLink);
        btns.appendChild(deleteBtn);

        html.appendChild(bkmrk)
    })
}

const renderBooks = function (arr, html) {
    arr.forEach(book => {
        let bookCard = document.createElement("li");
        let card__body = document.createElement("div");
        let card__btns = document.createElement("div");
        let card__img = document.createElement("img");
        let card__title = document.createElement("h3");
        let card__sub = document.createElement("p");
        let card__year = document.createElement("span");
        let card__btn1 = document.createElement("a");
        let card__btn2 = document.createElement("a");
        let card__btn_big = document.createElement("a");

        // attribute
        bookCard.setAttribute("class", "book");
        card__body.setAttribute("class", "book__body");
        card__img.setAttribute("class", "book__img");
        card__title.setAttribute("class", "book__title");
        card__sub.setAttribute("class", "book__sub");
        card__year.setAttribute("class", "book__");
        card__btns.setAttribute("class", "book__btns");
        card__btn1.setAttribute("class", "btn1");
        card__btn2.setAttribute("class", "btn2");
        card__btn_big.setAttribute("class", "book__btn_big");

        // tetxtContent
        card__img.src = book.volumeInfo.imageLinks?.thumbnail;
        card__title.textContent = book?.volumeInfo?.title;
        card__sub.textContent = book?.volumeInfo?.authors[0];
        card__year.textContent = book?.volumeInfo?.publishedDate;
        card__btn1.textContent = "Bookmark";
        card__btn2.textContent = "More Info";
        card__btn_big.textContent = "Read";
        card__btn_big.href = book?.volumeInfo?.previewLink;
        card__btn_big.target = "_blank";


        // DATASET
        card__btn1.dataset.bookmarkId = book.id;

        // append
        bookCard.appendChild(card__img);
        bookCard.appendChild(card__body);
        bookCard.appendChild(card__btns);
        card__body.appendChild(card__title);
        card__body.appendChild(card__sub);
        card__body.appendChild(card__year);
        card__btns.appendChild(card__btn1);
        card__btns.appendChild(card__btn2);
        bookCard.appendChild(card__btn_big);

        html.appendChild(bookCard);
    })
}



booksList.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.matches(".btn1")) {
        let bookmarkId = e.target.dataset.bookmarkId;
        let find = booksArray.find(book => book.id === bookmarkId);
        if (!bookmarksArray.includes(find)) {
            bookmarksArray.push(find);
        }
    } else if (e.target.matches(".book__btn_big")) {
        window.location.replace(e.target.href);
        console.log(e.target);
    }
    bookmarks.innerHTML = null;
    renderBookmarks(bookmarksArray, bookmarks)
})

bookmarks.addEventListener("click", function (evt) {
    evt.preventDefault();
    if (evt.target.matches(".bookmark__delete")) {
        let deleteId = evt.target.dataset.deleteId;
        let findIndex = booksArray.findIndex(bookmark => bookmark.id === deleteId);
        bookmarksArray.splice(findIndex, 1);
        bookmarks.innerHTML = null;
        renderBookmarks(bookmarksArray, bookmarks)
    }
})

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let value = searchInput.value;
    seacrh = value;
    booksList.innerHTML = null;
    extractData();
})

orderBtn.addEventListener("click", function () {
    order = "newest";
    booksList.innerHTML = null;
    extractData();
})


const extractData = async function () {
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${seacrh}&startIndex=0&maxResults=9&orderBy=${order}`);
    const response = await request.json();
    booksArray = response.items;
    result.textContent = response.totalItems;
    console.log(booksArray);
    renderBooks(booksArray, booksList);
}

extractData();