import { Modal } from './modal.js';
import { User } from './pages/create_account/User.js';
import { setImageToWindowSize, setImageTo820 } from './utils.js';

// Ensure modal is initialized
const modal = new Modal();


// Navbar/Footer inclusion
$(document).ready(function() {
    $("#navbar-placeholder").load("/navbar.html");
    $("#footer-placeholder").load("/footer.html");
});

// Function to generate HTML from JSON
function renderContentFromJSON(jsonData) {
    const dynamicContent = jsonData.map((item, index) => `
    <div id="modal-toggle-${index}" class="card my-3 shadow-sm">
      <div class="card-body d-flex align-items-start">
        <img src="${item.Poster}" class="rounded me-3" alt="${item.Title} Poster" style="width: 100px; height: auto;" />
        <div class="d-flex flex-column w-100">
          <h5 class="card-title mb-2">${item.Title}</h5>
          <p class="card-text">${item.Plot}</p>
        </div>
      </div>
    </div>
  `).join('');

    // Inject content into the div
    document.getElementById('dynamic-content').innerHTML = dynamicContent;

    // Attach click event listeners to each card
    jsonData.forEach((item, index) => {
        const PosterUrl = setImageTo820(item.Poster);
        // console.log(PosterUrl);

        document.getElementById(`modal-toggle-${index}`).addEventListener("click", () => {
            modal.create({
                poster: PosterUrl,
                title: item.Title,
                content: item.Plot,
                trailer: item.Trailer,
                actors: item.Actors,
                date: item.Released,
                rating: item.Ratings[1].Value,
                onClose: () => {
                    console.log(`Modal for "${item.Title}" closed.`);
                },
            });
        });
    });
}

// Fetch local JSON file and render
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    fetch('/data/data.json')
        .then(response => response.json())
        .then(data => renderContentFromJSON(data))
        .catch(err => console.error("Error loading JSON:", err));
}
