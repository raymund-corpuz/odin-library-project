const URL = "https://openlibrary.org/search.json";
const imgURL = "https://covers.openlibrary.org/b/id/";
const imageDOM = document.querySelector("#image");

const que = "Harry Potter";

const newQue = que.toLowerCase().replaceAll(" ", "+");

console.log(newQue);

console.log(URL);
async function getData() {
  const respose = await fetch(`${URL}?q=${newQue}`);
  const data = await respose.json();

  console.log(data);

  console.log(data.docs[0].title);
  console.log(data.docs[0].author_name);
  console.log(data.docs[0].first_publish_year);
  console.log(data.docs[0].edition_count);
  console.log(data.docs[0].cover_i);
  const imgQue = data.docs[0].cover_i;

  //   getImage(imgQue);
}

// async function getImage(imgQue) {
//   imageDOM.src = `${imgURL}${imgQue}-L.jpg`;
// }

getData();
