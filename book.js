const storyURL = "https://openlibrary.org";

async function getStory(showStory) {
  console.log(showStory.title);
  console.log(showStory.author_name);
  console.log(showStory.edition_count);
  console.log(showStory.first_publish_year);
  console.log(showStory.first_publish_year - 2025);
  console.log(showStory.key);

  const response = await fetch(`${storyURL}${showStory.key}.json`);
  const data = await response.json();
  const result = data.description.value || "No Description";
  console.log(result);
}
