"use strict";

const logout = document.querySelector(".logout");
const token = window.localStorage.getItem("token");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const elPags = document.querySelector(".pagination");
const elModalTab = document.querySelector(".modals");
const showing = document.querySelector(".showing");
const result = document.querySelector(".result");
const searchInput = document.querySelector(".searchInput");
const bookmarks = document.querySelector(".bookmarksList");
const booksList = document.querySelector(".booksList");
const orderBtn = document.querySelector(".orderBtn");
const elForm = document.querySelector(".form");
const pageBtn = document.querySelector(".btn-pages");

let page = 0;
let seacrh = 'Python';
let order = "relevance";

// token checking
if (!token) {
    window.location.replace("index.html")
}
logout.addEventListener("click", function (e) {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.location.replace("index.html");
})
let localStorage = JSON.parse(window.localStorage.getItem("bookmarks"));
let booksArray = [];
let bookmarksArray = localStorage ?? [];
// function openModal() {
//     elModal.classList.remove("hide");
//     elOverlay.classList.remove("hide");
// }
// function closeModal() {
//     elModal.classList.add("hide");
//     elOverlay.classList.add("hide");
// }

// booksList.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     if (evt.target.matches(".btn2")) {
//         elModalTab.classList.remove("hide");
//     }
// })


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
renderBookmarks(bookmarksArray, bookmarks);

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
        card__sub.textContent = book.volumeInfo.authors || "No Info About Author";
        card__year.textContent = book?.volumeInfo?.publishedDate;
        card__btn1.textContent = "Bookmark";
        card__btn2.textContent = "More Info";
        card__btn_big.textContent = "Read";
        card__btn_big.href = book?.volumeInfo?.previewLink;
        card__btn_big.target = "_blank";


        // DATASET
        card__btn_big.dataset.infoButtonId = book.id;
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


let pages = 0;
const renderButtons = function (numbers, html) {
    if (Number(numbers) % 9 === 0) {
        pages = Math.floor(numbers / 10)
    } else {
        pages = Math.floor(numbers / 10) + 1
    }

    for (let num = 1; num <= pages; num++) {
        let num_btn = document.createElement('a');
        num_btn.setAttribute('class', 'btn-pages');
        num_btn.dataset.numID = num;
        num_btn.href = '#'
        num_btn.textContent = num;
        html.appendChild(num_btn)
    }
}

elPags.addEventListener('click', function (e) {
    if (e.target.matches('.btn-pages')) {
        page = e.target.dataset.numID * 10;
    }
    extractData();
    booksList.innerHTML = null;
    elPags.innerHTML = null;
}
)

prevBtn.addEventListener("click", function () {
    if (page > 1) {
        page = page - 9;
        extractData();
        booksList.innerHTML = null;
    }
})

nextBtn.addEventListener("click", function () {
    if (page < pages) {
        page = page - 9;
        extractData();
        booksList.innerHTML = null;
    }
})



// function renderModal(item, html) {
//     let overlay = document.createElement("div");
//     let modal = document.createElement("div");
//     let modalHeader = document.createElement("div");
//     let modalBody = document.createElement("div");
//     let modalFooter = document.createElement("div");
//     let modalTitle = document.createElement("h5");
//     let close = document.createElement("i");
//     let modalDesc = document.createElement("p");
//     let modalImg = document.createElement("img");
//     let modalAuthors = document.createElement("div");
//     let modalAuthorstitle = document.createElement("p");
//     let modalAuthor = document.createElement("p");
//     let modalAuthor2 = document.createElement("p");
//     let modalPublished = document.createElement("div");
//     let modalPublishedTitle = document.createElement("p");
//     let modalDate = document.createElement("p");
//     let modalCategories = document.createElement("div");
//     let modalCategorieTitle = document.createElement("p");
//     let modalCategorie = document.createElement("p");
//     let modalPublishers = document.createElement("div");
//     let modalPublishersTitle = document.createElement("p");
//     let modalPublisher = document.createElement("p");
//     let modalPages = document.createElement("div");
//     let modalPagesTitle = document.createElement("p");
//     let modalPagesCount = document.createElement("p");

//     // CLASSES
//     modalPagesTitle.setAttribute("class", "authors");
//     modalPublishersTitle.setAttribute("class", "authors");
//     modalPublishedTitle.setAttribute("class", "authors");
//     modalCategorieTitle.setAttribute("class", "authors");
//     modalAuthorstitle.setAttribute("class", "authors");
//     modalImg.setAttribute("class", "modal__img");
//     close.setAttribute("class", "fa-solid fa-xmark fa-2x");
//     overlay.setAttribute("class", "overlay hide");
//     modal.setAttribute("class", "modal hide");
//     modalHeader.setAttribute("class", "modal__header");
//     modalBody.setAttribute("class", "modal__body");
//     modalFooter.setAttribute("class", "modal__footer");
//     modalTitle.setAttribute("class", "modal__title");
//     modalDesc.setAttribute("class", "modal__desc");
//     modalAuthors.setAttribute("class", "modal__authors");
//     modalAuthor.setAttribute("class", "modal__author");
//     modalAuthor2.setAttribute("class", "modal__author2");
//     modalPublished.setAttribute("class", "modal__published");
//     modalDate.setAttribute("class", "modal__publishers");
//     modalCategories.setAttribute("class", "modal__categories");
//     modalCategorie.setAttribute("class", "modal__categorie");
//     modalPublishers.setAttribute("class", "modal__publishers");
//     modalPublisher.setAttribute("class", "modal__publisher");
//     modalPages.setAttribute("class", "modal__pages");
//     modalPagesCount.setAttribute("class", "modal__page");

//     // TETXCONTENT
//     modalImg.src = item.volumeInfo?.imageLinks?.thumbnail;
//     modalTitle.textContent = item?.volumeInfo?.title;
//     modalDesc.textContent = item?.volumeInfo?.description;
//     modalPagesTitle.textContent = "Page count:";
//     modalPublishersTitle.textContent = "Publishers:"
//     modalPublishedTitle.textContent = "Published:";
//     modalCategorieTitle.textContent = "Categories:";
//     modalAuthorstitle.textContent = "Authors:";
//     modalAuthor.textContent = item?.volumeInfo?.authors[0];
//     modalAuthor2.textContent = item?.volumeInfo?.authors[1];
//     modalDate.textContent = item?.volumeInfo?.publishedDate;
//     modalCategorie.textContent = item.volumeInfo?.categories;

//     // APPEND
//     modal.appendChild(modalHeader);
//     modal.appendChild(modalBody);
//     modal.appendChild(modalFooter);
//     modalHeader.appendChild(modalTitle);
//     modalHeader.appendChild(close);
//     modalBody.appendChild(modalImg);
//     modalBody.appendChild(modalDesc);
//     modalFooter.appendChild(modalAuthors);
//     modalFooter.appendChild(modalPublished);
//     modalFooter.appendChild(modalPublishers);
//     modalFooter.appendChild(modalCategories);
//     modalFooter.appendChild(modalPages)
//     modalPages.appendChild(modalPagesTitle);
//     modalPages.appendChild(modalPagesCount);
//     modalCategories.appendChild(modalCategorieTitle);
//     modalCategories.appendChild(modalCategorie);
//     modalPublished.appendChild(modalPublishedTitle);
//     modalPublished.appendChild(modalDate);
//     modalPublishers.appendChild(modalPublishersTitle);
//     modalPublishers.appendChild(modalPublisher);
//     modalAuthors.appendChild(modalAuthorstitle);
//     modalAuthors.appendChild(modalAuthor);
//     modalAuthors.appendChild(modalAuthor2);

//     html.appendChild(modal);
// }

// elModalTab.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     elModalTab.classList.add("hide");
// })



booksList.addEventListener("click", function (e) {
    if (e.target.matches(".btn1")) {
        let bookmarkId = e.target.dataset.bookmarkId;
        let find = booksArray.find(book => book.id === bookmarkId);
        if (!bookmarksArray.includes(find)) {
            bookmarksArray.push(find);
        }
        if (!localStorage.includes(find)) {
            bookmarksArray.push(find);
        }
        window.localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray))
    } else if (e.target.matches(".book__btn_big")) {
        window.location.replace(e.target.href);
    }
    bookmarks.innerHTML = null;
    renderBookmarks(bookmarksArray, bookmarks)
})

bookmarks.addEventListener("click", function (evt) {
    if (evt.target.matches(".bookmark__delete")) {
        let deleteId = evt.target.dataset.deleteId;
        let findIndex = bookmarksArray.findIndex(bookmark => bookmark.id === deleteId);
        bookmarksArray.splice(findIndex, 1);
        bookmarks.innerHTML = null;
        window.localStorage.setItem("bookmarks", JSON.stringify(bookmarksArray))
        renderBookmarks(bookmarksArray, bookmarks)
    }
})

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let value = searchInput.value;
    seacrh = value;
    booksList.innerHTML = null;
    elPags.innerHTML = null;
    extractData();
})

orderBtn.addEventListener("click", function () {
    order = "newest";
    booksList.innerHTML = null;
    extractData();
});



const extractData = async function () {
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${seacrh}&startIndex=${page}&maxResults=9&orderBy=${order}`);
    const response = await request.json();
    booksArray = response.items;
    result.textContent = response.totalItems;
    renderButtons(response.totalItems, elPags)
    renderBooks(booksArray, booksList);
}

extractData();