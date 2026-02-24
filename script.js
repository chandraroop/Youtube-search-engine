const input = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

const API_KEY = "AIzaSyBTFdJx0s-cfrlPj8oZ_EI0qG-3H0UbUJY";

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const query = input.value.trim();
    if (!query) return;

input.addEventListener("input", () => {
  if (input.value.trim() === "") {
    resultsContainer.innerHTML = "";
  }
});

    resultsContainer.innerHTML = ""; // clear old results

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(query)}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      displayVideos(data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }
});

function displayVideos(videos) {
  videos.forEach(video => {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video-card");

    videoCard.innerHTML = `
      <img src="${video.snippet.thumbnails.medium.url}" />
      <h4>${video.snippet.title}</h4>
      <p>${video.snippet.description.slice(0, 80)}...</p>
      <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">Watch</a>
    `;

    resultsContainer.appendChild(videoCard);
  });
}