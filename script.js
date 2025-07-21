const URL = "https://openlibrary.org/search.json";
const imgURL = "https://covers.openlibrary.org/b/id/";
const storyURL = "https://openlibrary.org";
const imageDOM = document.querySelector("#image");
const main = document.querySelector(".main-section");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

let booksArray = [];
const isShow = false;

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
  booksArray = data.docs;

  booksArray
    .filter((book) => book.title !== "undefined")
    .map((book) => {
      getImage(book);
    });
}

function getImage(element) {
  const bookContainer = document.createElement("div");
  const titleBook = document.createElement("h3");
  const authorBook = document.createElement("p");
  const publishBook = document.createElement("p");
  const image = document.createElement("img");
  bookContainer.classList.add("book-container");
  titleBook.classList.add("title");

  titleBook.textContent = `Title: ${element.title} `;
  authorBook.textContent = `Author: ${element.author_name}`;
  publishBook.textContent = `Publish: ${element.first_publish_year}`;
  image.src = `${imgURL}${element.cover_i}-L.jpg`;

  image.style.width = "100px";
  image.style.height = "120px";

  main.appendChild(bookContainer);
  bookContainer.appendChild(image);
  bookContainer.appendChild(titleBook);
  titleBook.appendChild(authorBook);
  titleBook.appendChild(publishBook);

  bookContainer.addEventListener("click", () => openBook(element));
}

getData();

async function getStory(showStory) {
  const bookWrapper = document.querySelector(".book-main-container");

  bookWrapper.innerHTML = "";

  const response = await fetch(`${storyURL}${showStory.key}.json`);
  const data = await response.json();
  const result = data.description.value || "No Description";

  const image = document.createElement("img");
  const title = document.createElement("h1");
  const author = document.createElement("h3");
  const edition = document.createElement("h4");
  const publish = document.createElement("h4");
  const content = document.createElement("p");
  const back = document.createElement("span");

  back.textContent = "❌";
  image.src = `${imgURL}${showStory.cover_i}-L.jpg`;
  title.textContent = `${showStory.title}`;
  author.textContent = `${showStory.author_name}`;
  edition.textContent = `${showStory.edition_count}`;
  publish.textContent = `${showStory.first_publish_year}`;
  content.textContent = `${result}`;

  image.style.width = "200px";
  image.style.height = "300px";

  bookWrapper.appendChild(back);
  bookWrapper.appendChild(image);
  bookWrapper.appendChild(title);
  bookWrapper.appendChild(author);
  bookWrapper.appendChild(edition);
  bookWrapper.appendChild(publish);
  bookWrapper.appendChild(content);

  showHide(!isShow);

  back.addEventListener("click", backToMenu);
}

function openBook(key) {
  console.log("open book");
  getStory(key);
}

function backToMenu() {
  showHide(!showHide);
}

function showHide(show) {
  const book = show ? "show" : "hidden";
  const main = show ? "hidden" : "show";
  const mainSection = document.querySelector(".main-section");

  const bookWrapper = document.querySelector(".book-main-container");

  if (bookWrapper.className.includes("hidden")) {
    bookWrapper.classList.replace("hidden", book);
    mainSection.classList.replace("show", main);
  }

  if (bookWrapper.className.includes("show")) {
    bookWrapper.classList.replace("show", book);
    mainSection.classList.replace("hidden", main);
  }
}
