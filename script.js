const URL = "https://openlibrary.org/search.json";
const imgURL = "https://covers.openlibrary.org/b/id/";
const imageDOM = document.querySelector("#image");
const main = document.querySelector(".main-section");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchBook = search.value;
  const newQue = searchBook.toLowerCase().replaceAll(" ", "+");
  console.log(newQue);
  getData(newQue);
  main.innerHTML = "";
  search.value = "";
});

async function getData(newQue) {
  const respose = await fetch(`${URL}?q=${newQue}`);
  const data = await respose.json();
  const books = data.docs;

  books.map((book) => getImage(book));
}

function getImage(element) {
  const bookContainer = document.createElement("div");
  const titleBook = document.createElement("h3");
  const authorBook = document.createElement("p");
  const publishBook = document.createElement("p");
  const image = document.createElement("img");
  bookContainer.classList.add("book-container");
  titleBook.classList.add("title");

  titleBook.textContent = `Title: ${element.title}`;
  authorBook.textContent = `Author: ${element.author_name}`;
  publishBook.textContent = `Publish: ${element.first_publish_year}`;
  image.src = `${imgURL}${element.cover_i}-S.jpg`;
  image.style.width = "100px";
  image.style.height = "120px";

  main.appendChild(bookContainer);
  bookContainer.appendChild(image);
  bookContainer.appendChild(titleBook);
  titleBook.appendChild(authorBook);
  titleBook.appendChild(publishBook);
}

getData();
