import { searchAPI, coverAPI } from "./api.js";

const searchInput = document.querySelector(".searchInput");
const searchSubmit = document.querySelector(".searchSubmit");
const container = document.querySelector(".container");

let booksArray = [];

// searchBook ================================>
searchSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTitle = searchInput.value;
  const searchTitleKey = searchTitle.toLowerCase().replace(/ /g, "+");
  container.innerHTML = "";
  fetchData(searchTitleKey);
});

async function fetchData(searchInput) {
  try {
    const response = await fetch(`${searchAPI}${searchInput}`);
    const data = await response.json();
    booksArray = data.docs;
    booksArray.forEach((element) => {
      if (element.cover_i) {
        displayCover(element.cover_i, element);
      }
    });
  } catch (error) {
    console.error(`Error fetching data: `, error);
  }
}

function displayCover(coverID, book) {
  console.log(book);
  const bookContainer = document.createElement("div");
  const coverImageUI = document.createElement("img");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const yearPublish = document.createElement("p");
  const bookMark = document.createElement("i");
  const bookMarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="book-mark" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>`;

  coverImageUI.src = `${coverAPI}${coverID}-L.jpg`;
  coverImageUI.alt = `Cover image ${book.title}`;
  coverImageUI.style.width = "160px";
  coverImageUI.style.height = "200px";
  title.textContent = book.title;
  author.textContent = book.author_name;
  yearPublish.textContent = book.first_publish_year;

  title.classList.add("title");
  author.classList.add("author");
  yearPublish.classList.add("publish");
  bookContainer.classList.add("book-container");

  coverImageUI.onerror = () => {
    coverImageUI.src = "./assets/default-book.png";
  };

  coverImageUI.addEventListener("click", () => {
    window.location.href = `./book.html?key=${encodeURIComponent(book.key)}`;
  });

  bookContainer.appendChild(coverImageUI);
  bookContainer.appendChild(title);
  bookContainer.appendChild(author);
  bookContainer.appendChild(yearPublish);
  bookMark.innerHTML = bookMarkIcon;
  bookContainer.appendChild(bookMark);
  container.appendChild(bookContainer);

  bookMark.addEventListener("click", () => {
    console.log("click");
  });
}

fetchData();
