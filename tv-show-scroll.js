//====================== SLIDER INIT =========================

import { setImageToWindowSize, setImageTo820 } from './utils.js';
import { Modal } from './modal.js';
// Fetching slider data 
// Z-index:-1 me default

const modal = new Modal();

function renderContentFromTvSlider(jsonData) {
    const dynamicContent = jsonData.map((item, index) => `
    <div id="modal-toggle-tv_show-slider-${index}" class="col-lg-2 movie-card">
      <div class="card mx-1 my-2 shadow-sm">
        <div class=" card-body d-flex flex-nowrap align-items-center justify-content-center p-2">
          <img src="${item.image}" class="scroll-card-image rounded" alt="N/A" style="" draggable="false"/>
          <h5 class="card-title text-center rounded" style="position:absolute; z-index:-1">
            IMDB score:</br>
            ${item.rating}
          </h5>
        </div>
      </div>
    </div>
   `).join('');

    // Inject content into the slider element
    document.getElementById('dynamic-tv_show-slider-content').innerHTML = dynamicContent;

    jsonData.forEach((item, index) => {
        const PosterUrl = setImageTo820(item.image);

        // console.log('Binding event for item:', item); // Log the item to check if it's correctly passed
        // Use a closure to ensure 'item' is correctly captured
        document.getElementById(`modal-toggle-tv_show-slider-${index}`).addEventListener("click", () => {
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


// ===================== SLIDER LOGIC ==========================
// used same names for the tv shows 
// all variables have an underscore to avoid conflicts 
// sorry for the mixups in advance , im a retard 
const track_ = document.getElementById("dynamic-tv_show-slider-content");

const handleOnDown_ = a => track_.dataset.mouseDownAt = a.clientX;

const handleOnUp_ = () => {
    track_.dataset.mouseDownAt = "0";
    track_.dataset.prevPercentage = track_.dataset.percentage;
}

const handleOnMove_ = a => {
    if (track_.dataset.mouseDownAt === "0") return;

    const mouseDelta_ = parseFloat(track_.dataset.mouseDownAt) - a.clientX,
        maxDelta_ = window.innerWidth / 2;

    const percentage = (mouseDelta_ / maxDelta_) * -100,
        nextPercentageUnconstrained = parseFloat(track_.dataset.prevPercentage) + percentage;

    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    track_.dataset.percentage = nextPercentage;

    track_.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    // ================================
    // Adds parallax effect to images
    // Removed cause posters are not landscape
    // Maybe could be added ?
    // ================================
    // for (const image of track.getElementsById("scroll-img")) {
    //     image.animate({
    //         objectPosition: `${100 + nextPercentage}% center`
    //     }, { duration: 1200, fill: "forwards" });
    // }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = a => handleOnDown_(a);

window.ontouchstart = a => handleOnDown_(a.touches[0]);

window.onmouseup = a => handleOnUp_(a);

window.ontouchend = a => handleOnUp_(a.touches[0]);

window.onmousemove = a => handleOnMove_(a);

window.ontouchmove = a => handleOnMove_(a.touches[0]);

// -- INIT -- //
fetch('data/tv_slider.json')
    .then(response => response.json())
    .then(data => renderContentFromTvSlider(data))
    .catch(err => console.error("Error loading JSON:", err));
