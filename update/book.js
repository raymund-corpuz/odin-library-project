const API = "https://openlibrary.org/search.json";

const params = new URLSearchParams(window.location.search);
const bookTitle = params.get("title");

console.log("book Title :", bookTitle);
