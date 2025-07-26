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
        displayCover(element.cover_i, element.title);
      }
    });
  } catch (error) {
    // show when there is an error
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

  coverImageUI.addEventListener("click", () => {
    window.location.href = `./book.html?title=${encodeURIComponent(
      searchTitle
    )}`;
  });

  container.appendChild(coverImageUI);
}

function displayCoverList(coverID) {
  console.log("cover click", coverID);
}

fetchData();
