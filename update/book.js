const API = "https://openlibrary.org/search.json?limit=15&q=";
const coverAPI = `https://covers.openlibrary.org/b/id/`;

const params = new URLSearchParams(window.location.search);
const getBookTitle = params.get("key");
const bookTitle = getBookTitle.toLocaleLowerCase().replace(/ /g, "+");
const container = document.querySelector(".container");

let bookCollection = [];

async function getBookFromURL(book) {
  console.log("fetching data for:", bookTitle);
  console.log(`${bookTitle}`);
  try {
    const response = await fetch(`${API}${bookTitle}`);
    const data = await response.json();
    bookCollection = data.docs;
    console.log(bookCollection.length);

    bookCollection.forEach((book) => {
      console.log(book);
      if (book.cover_i) {
        renderBookList(book.cover_i, book);
      }
    });
  } catch (error) {
    console.error(`Error occured :`, error);
  }
}

function renderBookList(cover, book) {
  const div = document.createElement("div");
  const info = document.createElement("div");
  const coverImage = cover
    ? `${coverAPI}${cover}`
    : "./assets/default-book.png";
  const image = document.createElement("img");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const yearPublish = document.createElement("p");

  if (!cover) {
    image.src = "./assets/default-book.png";
    image.style.width = "140px";
    image.style.height = "150px";
  } else {
    image.src = `${coverImage}-L.jpg`;
  }

  image.alt = `${book.title}`;
  image.style.width = "160px";
  image.style.height = "200px";
  title.textContent = `${book.title}`;
  author.textContent = `${book.author_name}`;
  yearPublish.textContent = `${book.first_publish_year}`;
  div.classList.add("book-container");
  title.classList.add("title");
  author.classList.add("author");
  yearPublish.classList.add("yearPublish");

  // image.onerror = () => {
  //   image.src = "./assets/default-book.png";
  // };

  div.appendChild(image);
  info.appendChild(title);
  info.appendChild(author);
  info.appendChild(yearPublish);
  div.appendChild(info);
  container.appendChild(div);

  div.addEventListener("click", () => {
    console.log("click");

    window.location.href = `./about-book.html?key=${encodeURIComponent(
      bookTitle
    )}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getBookFromURL(bookTitle);
});
