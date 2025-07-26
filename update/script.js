const searchAPI = "https://openlibrary.org/search.json?q=";
const coverAPI = `https://covers.openlibrary.org/b/id/`;

const container = document.querySelector(".container");
const searchInput = document.querySelector(".searchInput");
const searchSubmit = document.querySelector(".searchSubmit");

let booksArray = [];

// searchBook ================================>
searchSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTitle = searchInput.value;
  const searchTitleKey = searchTitle.toLowerCase().replace(/ /g, "+");
  fetchData(searchTitleKey);
});

async function fetchData(searchInput) {
  console.log(searchInput);
  try {
    const response = await fetch(`${searchAPI}${searchInput}`);
    const data = await response.json();
    booksArray = data.docs;
    booksArray.forEach((element) => {
      if (element.cover_i) {
        displayCover(element.cover_i, element.title);
      }
    });
  } catch (error) {
    console.error(`Error fetching data: `, error);
  }
}

function displayCover(coverID, searchTitle) {
  const coverImageUI = document.createElement("img");

  coverImageUI.src = `${coverAPI}${coverID}-L.jpg`;
  coverImageUI.alt = `Cover image ${searchTitle}`;
  coverImageUI.style.width = "180px";
  coverImageUI.style.height = "200px";

  coverImageUI.onerror = () => {
    coverImageUI.src = "./assets/default-book.png";
  };

  container.appendChild(coverImageUI);

  coverImageUI.addEventListener("click", () => {
    window.location.href = "/update/book.html?=${searchTitle}";
  });
}

function displayCoverList(coverID) {
  console.log("cover click", coverID);
}

fetchData();
