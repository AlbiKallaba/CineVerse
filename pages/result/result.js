import { OMDB } from '../../api.js';
import { setImageTo820 } from '../../utils.js';
import { Modal } from '../../modal.js';

const modal = new Modal();

// Helper to get query parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(params.entries());
}

// Get the search term from the query string
const params = getQueryParams();
const searchTerm = params.query;

async function fetchAndRenderResults() {
    const resultsDiv = document.getElementById('dynamic-content');

    if (!searchTerm) {
        resultsDiv.innerHTML = '<p>No search term provided.</p>';
        return;
    }

    try {
        // Fetch search results
        const data = await OMDB.search(searchTerm);

        if (data && data.length > 0) {
            let resultHTML = '';
            let index = 0;

            // Generate HTML for results using a while loop
            while (index < data.length) {
                const movie = data[index];
                resultHTML += `
                <div id="modal-toggle-${index}" class="card my-3 shadow-sm">
                  <div class="card-body d-flex align-items-start">
                    <img src="${movie.Poster}" class="rounded me-3" alt="${movie.Title} Poster" style="width: 100px; height: auto;" />
                    <div class="d-flex flex-column w-100">
                      <h5 class="card-title mb-2">${movie.Title}</h5>
                      <p class="card-text">${movie.Plot}</p>
                    </div>
                  </div>
                </div>
              `;
                index++;
            }

            resultsDiv.innerHTML = resultHTML;

            // Add event listeners to the generated elements
            attachEventListeners(data);

            // Example switch usage for illustration
            switch (data.Response) {
                case "True":
                    console.log("Search was successful!");
                    break;
                case "False":
                    console.warn("Search failed with message:", data.Error);
                    break;
                default:
                    console.log("Unexpected response from OMDb API.");
            }
        } else {
            resultsDiv.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
        }
    } catch (error) {
        console.error("Error fetching results:", error);

        // Example switch usage for handling errors
        switch (error.name) {
            case "TypeError":
                resultsDiv.innerHTML = '<p>There was a network error. Please try again later.</p>';
                break;
            default:
                resultsDiv.innerHTML = '<p>Failed to load results due to an unexpected error.</p>';
        }
    }
}

/**
 * Attaches click event listeners to dynamically generated cards.
 * @param {Array} jsonData - The array of movie objects.
 */
function attachEventListeners(jsonData) {
    for (let index = 0; index < jsonData.length; index++) {
        const item = jsonData[index];
        const PosterUrl = setImageTo820(item.Poster);

        document.getElementById(`modal-toggle-${index}`).addEventListener("click", () => {
            const ratingValue = item.Ratings && item.Ratings[0] ? item.Ratings[0].Value : "N/A"; // Safely handle missing ratings

            modal.create({
                poster: PosterUrl,
                title: item.Title,
                content: item.Plot || "No plot available.", // Handle missing plot
                trailer: item.Trailer || "", // Handle missing trailer URL
                actors: item.Actors || "Actors information not available.", // Handle missing actors
                date: item.Released || "Release date not available.", // Handle missing release date
                rating: ratingValue, // Use the safe value
                onClose: () => {
                    console.log(`Modal for "${item.Title}" closed.`);
                },
            });
        });
    }
}

// Call the function to fetch and render results
fetchAndRenderResults();
