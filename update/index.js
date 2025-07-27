const searchAPI = "https://openlibrary.org/search.json?q=";
const coverAPI = `https://covers.openlibrary.org/b/id/`;

const searchInput = document.querySelector(".searchInput");
const searchSubmit = document.querySelector(".searchSubmit");
const container = document.querySelector(".container");

let booksArray = [];

// searchBook ================================>
searchSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTitle = searchInput.value;
  const searchTitleKey = searchTitle.toLowerCase().replace(/ /g, "+");
  container.innerHTML = ""; // clear the containerUI
  fetchData(searchTitleKey); // searching books
});

// fetching data from URL
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
    // show when there is an error
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
  container.appendChild(bookContainer);
}

function displayCoverList(coverID) {
  console.log("cover click", coverID);
}

fetchData();
