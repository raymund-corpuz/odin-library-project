const URL = "https://openlibrary.org/search.json";
const imgURL = "https://covers.openlibrary.org/b/id/";
const storyURL = "https://openlibrary.org";
const imageDOM = document.querySelector("#image");
const main = document.querySelector(".main-section");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

let booksArray = [];

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

  // books.map((book) => {
  //   booksArray.push(book);
  //   getImage(book);
  // });

  books
    .filter((book) => book.title && book.author_name !== "undefined")
    .map((book) => {
      getImage(book);
    });

  // booksArray.forEach((book) => {
  //   // getImage(book);

  //   if (
  //     book.title === "undefined" ||
  //     book.author_name === "undefined" ||
  //     book.publishBook === "undefined"
  //   ) {
  //     console.log(book.title);
  //   } else {
  //     getImage(book);
  //   }
  // });
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

  bookContainer.addEventListener("click", () => openBook(element.key));

  // bookContainer.forEach((book) => {
  //   book.addEventListener("click", openBook);
  // });

  // getStory(element.key);
}

getData();

async function getStory(showStory) {
  const response = await fetch(`${storyURL}${showStory}.json`);
  const data = await response.json();
  const result = data.description.value || "No Description";
  console.log(result);
}

function openBook(key) {
  console.log("open book");
  getStory(key);
}
