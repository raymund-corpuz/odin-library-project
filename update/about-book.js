const params = new URLSearchParams(window.location.search);
const getBookTitle = params.get("title");
const bookTitle = getBookTitle.toLowerCase().replace(/ /g, "+");

document.addEventListener("DOMContentLoaded", () => {
  const backToBook = document.querySelector(".backToBook");
  backToBook.href = `./book.html?title=${encodeURIComponent(bookTitle)}`;
});
