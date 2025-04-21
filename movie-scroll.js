//====================== SLIDER INIT =========================

import { setImageTo820 } from './utils.js';
import { Modal } from './modal.js';
// Fetching slider data 
// Z-index:-1 me default

const modal = new Modal();

function renderContentFromSlider(jsonData) {
    const dynamicContent = jsonData.map((item, index) => `
    <div id="modal-toggle-slider-${index}" class="col-lg-2 movie-card">
      <div class="card mx-1 my-2 shadow-sm">
        <div class=" card-body d-flex flex-nowrap align-items-center justify-content-center p-2">
          <img src="${item.Poster}" class="scroll-card-image rounded" alt="N/A" style="" draggable="false"/>
          <h5 class="card-title text-center rounded" style="position:absolute; z-index:-1">
            IMDB score:</br>
            ${item.imdbRating}
          </h5>
        </div>
      </div>
    </div>
   `).join('');

    // Inject content into the slider element
    document.getElementById('dynamic-slider-content').innerHTML = dynamicContent;

    jsonData.forEach((item, index) => {
        const PosterUrl = setImageTo820(item.Poster);

        // console.log('Binding event for item:', item); // Log the item to check if it's correctly passed
        // Use a closure to ensure 'item' is correctly captured
        document.getElementById(`modal-toggle-slider-${index}`).addEventListener("click", () => {
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


// ===================== SLIDER LOGIC ==========================

const track1 = document.getElementById("dynamic-slider-content");
const track2 = document.getElementById("dynamic-tv_show-content");

function handleTrack(track) {
    let mouseDownAt = 0;
    let prevPercentage = 0;

    const handleOnDown = (e) => {
        mouseDownAt = e.clientX || e.touches[0].clientX; // Support both mouse and touch
    };

    const handleOnUp = () => {
        mouseDownAt = 0;
        track.dataset.prevPercentage = track.dataset.percentage;
    };

    const handleOnMove = (e) => {
        if (mouseDownAt === 0) return;

        const currentX = e.clientX || e.touches[0].clientX;
        const mouseDelta = mouseDownAt - currentX;
        const maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentageUnconstrained = parseFloat(prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        track.dataset.percentage = nextPercentage;

        track.animate(
            { transform: `translate(${nextPercentage}%, -50%)` },
            { duration: 1200, fill: "forwards" }
        );
    };

    // Add event listeners specific to the track
    track.addEventListener("mousedown", handleOnDown);
    track.addEventListener("touchstart", handleOnDown);
    track.addEventListener("mouseup", handleOnUp);
    track.addEventListener("touchend", handleOnUp);
    track.addEventListener("mousemove", handleOnMove);
    track.addEventListener("touchmove", handleOnMove);
}

// Initialize both tracks
handleTrack(track1);
handleTrack(track2);

// Fetch and render slider content
fetch("data/slider.json")
    .then((response) => response.json())
    .then((data) => renderContentFromSlider(data))
    .catch((err) => console.error("Error loading JSON:", err));
