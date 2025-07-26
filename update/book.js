const API = "https://openlibrary.org/search.json?limit=10&q=";
const coverAPI = `https://covers.openlibrary.org/b/id/`;

const params = new URLSearchParams(window.location.search);
const getBookTitle = params.get("title");
const bookTitle = getBookTitle.toLocaleLowerCase().replace(/ /g, "+");
const container = document.querySelector(".container");

let bookCollection = [];

async function getBookFromURL(book) {
  console.log("fetching data for:", bookTitle);
  try {
    const response = await fetch(`${API}${bookTitle}`);
    const data = await response.json();
    bookCollection = data.docs;

    bookCollection.forEach((book) => {
      console.log(book);
      renderBookList(book);
    });
  } catch (error) {
    console.error(`Error occured :`, error);
  }
}

function renderBookList(book) {
  const div = document.createElement("div");
  const coverImage = book.cover_i
    ? `${coverAPI}${book.cover_i}`
    : "./assets/default-book.png";
  const image = document.createElement("img");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const yearPublish = document.createElement("p");

  if (!book.cover_i) {
    image.src = "./assets/default-book.png";
  } else {
    image.src = `${coverImage}-L.jpg`;
  }

  image.alt = `${book.title}`;
  image.style.width = "140px";
  image.style.height = "150px";
  title.textContent = `${book.title}`;
  author.textContent = `${book.author_name}`;
  yearPublish.textContent = `${book.first_publish_year}`;

  image.onerror = () => {
    image.src = "./assets/default-book.png";
  };

  div.appendChild(image);
  div.appendChild(title);
  div.appendChild(author);
  div.appendChild(yearPublish);
  container.appendChild(div);
}

document.addEventListener("DOMContentLoaded", () => {
  getBookFromURL(bookTitle);
});
