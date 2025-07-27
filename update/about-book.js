const API = "https://openlibrary.org/search.json?limit=15&q=";
const coverAPI = `https://covers.openlibrary.org/b/id/`;
const storyURL = "https://openlibrary.org";

const params = new URLSearchParams(window.location.search);
const getBookTitle = params.get("key");
const bookTitle = getBookTitle.toLowerCase().replace(/ /g, "+");

document.addEventListener("DOMContentLoaded", () => {
  const backToBook = document.querySelector(".backToBook");
  backToBook.href = `./book.html?key=${encodeURIComponent(bookTitle)}`;

  fetchData();
});

async function fetchData(book) {
  try {
    const response = await fetch(`${API}${bookTitle}`);
    const data = await response.json();
    const books = data.docs;
    const [book] = books;

    if (book.cover_i) {
      displayCover(book.cover_i, book);
    }
  } catch (error) {
    console.error(`Error Occured :`, error);
  }
}

async function displayCover(cover, book) {
  let result;
  let category = [];

  try {
    const response = await fetch(`${storyURL}${book.key}.json`);
    const data = await response.json();
    console.log(data);
    result = data.description.value;
    category = data.subjects;
  } catch (error) {
    console.error(`Error Occured :`, error);
  }
  const container = document.querySelector(".container");
  const bookContainer = document.createElement("div");
  const info = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const yearPublish = document.createElement("p");
  const description = document.createElement("p");
  const genre = document.createElement("p");

  image.src = `${coverAPI}${cover}-L.jpg`;
  image.style.width = "250px";
  image.style.height = "300px";
  bookContainer.classList.add("book-container");
  info.classList.add("info");
  title.classList.add("title");
  author.classList.add("author");
  yearPublish.classList.add("yearPublish");
  description.classList.add("description");

  title.textContent = book.title;
  author.textContent = book.author_name;
  yearPublish.textContent = book.first_publish_year;
  description.textContent = result;

  bookContainer.appendChild(image);
  info.appendChild(title);
  info.appendChild(author);
  info.appendChild(yearPublish);
  info.appendChild(description);
  bookContainer.appendChild(info);
  container.appendChild(bookContainer);
}
