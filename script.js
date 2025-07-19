const URL = "https://openlibrary.org/search.json";
const imgURL = "https://covers.openlibrary.org/b/id/";
const imageDOM = document.querySelector("#image");
const main = document.querySelector(".main-section");

const que = "Harry Potter";

const newQue = que.toLowerCase().replaceAll(" ", "+");

async function getData() {
  const respose = await fetch(`${URL}?q=${newQue}`);
  const data = await respose.json();

  const books = data.docs;

  console.log(data.docs[0].title);
  console.log(data.docs[0].author_name);
  console.log(data.docs[0].first_publish_year);
  console.log(data.docs[0].edition_count);
  console.log(data.docs[0].cover_i);
  const imgQue = data.docs[0].cover_i;

  books.map((book) => getImage(book));
}

function getImage(element) {
  console.log(typeof element);
  const bookContainer = document.createElement("div");
  const titleBook = document.createElement("p");
  const authorBook = document.createElement("p");
  const publishBook = document.createElement("p");
  const image = document.createElement("img");
  bookContainer.classList.add("book-container");

  titleBook.textContent = `Title: ${element.title}`;
  authorBook.textContent = `Author: ${element.author_name}`;
  publishBook.textContent = `Publish: ${element.first_publish_year}`;
  image.src = `${imgURL}${element.cover_i}-S.jpg`;
  image.style.width = "75px";
  image.style.height = "100px";

  main.appendChild(bookContainer);
  bookContainer.appendChild(image);
  bookContainer.appendChild(titleBook);
  titleBook.appendChild(authorBook);
  titleBook.appendChild(publishBook);
}

getData();
