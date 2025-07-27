const API = "https://openlibrary.org/search.json?limit=15&q=";
const coverAPI = `https://covers.openlibrary.org/b/id/`;
const storyURL = "https://openlibrary.org";

const params = new URLSearchParams(window.location.search);
const getBookTitle = params.get("title");
const bookTitle = getBookTitle.toLowerCase().replace(/ /g, "+");

document.addEventListener("DOMContentLoaded", () => {
  const backToBook = document.querySelector(".backToBook");
  backToBook.href = `./book.html?title=${encodeURIComponent(bookTitle)}`;

  fetchData();
});

async function fetchData(book) {
  try {
    const response = await fetch(`${API}${bookTitle}`);
    const data = await response.json();
    const books = data.docs;
    const [book] = books;

    // books.forEach((book) => {
    //   if (book.cover_i) {
    //     displayCover(book.cover_i, book);
    //   }
    // });

    if (book.cover_i) {
      displayCover(book.cover_i, book);
    }
  } catch (error) {
    console.error(`Error Occured :`, error);
  }
}

async function displayCover(cover, book) {
  try {
    const response = await fetch(`${storyURL}${book.key}.json`);
    const data = await response.json();

    console.log(data.description.value);
  } catch (error) {
    console.error(`Error Occured :`, error);
  }
  const container = document.querySelector(".container");
  const image = document.createElement("img");

  image.src = `${coverAPI}${cover}-L.jpg`;
  image.style.width = "200px";
  image.style.height = "250px";

  container.appendChild(image);
}
