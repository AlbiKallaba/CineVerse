import { Modal } from './modal.js';
import { setImageToWindowSize, setImageTo820 } from './utils.js';

// Ensure modal is initialized
const modal = new Modal();

// Function to generate HTML from JSON
function renderContentFromJSON(jsonData) {
  const dynamicContent = jsonData.map((item, index) => `
    <div id="modal-tv_show-toggle-${index}" class="card my-3 shadow-sm">
      <div class="card-body d-flex align-items-start">
        <img src="${item.image}" class="rounded me-3" alt="${item.title} Poster" style="width: 100px; height: auto;" />
        <div class="d-flex flex-column w-100">
          <h5 class="card-title mb-2">${item.title}</h5>
          <p class="card-text">${item.description}</p>
        </div>
      </div>
    </div>
  `).join('');

  // Inject content into the div
  document.getElementById('dynamic-tv_show-content').innerHTML = dynamicContent;

  // Attach click event listeners to each card
  jsonData.forEach((item, index) => {
    const PosterUrl = setImageTo820(item.image);
    // console.log(PosterUrl);
    
    document.getElementById(`modal-tv_show-toggle-${index}`).addEventListener("click", () => {
      modal.create({
        poster: PosterUrl,
        title: item.title,
        content: item.description,
        trailer: item.trailer,
        actors: item.actors,
        date: item.releaseDate,
        rating:item.rating,
        onClose: () => {
          console.log(`Modal for "${item.title}" closed.`);
        },
      });
    });
  });
}
// Fetch local JSON file and render
fetch('data/tv_shows.json')
  .then(response => response.json())
  .then(data => renderContentFromJSON(data))
  .catch(err => console.error("Error loading JSON:", err));