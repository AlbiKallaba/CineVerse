// Constants
const OMDB_API_KEY = '9b3d4ace';
const OMDB_API_URL = "http://www.omdbapi.com/";

/**
 * Builds query parameters for the OMDb API.
 * @param {Object} params - An object of key-value pairs representing OMDb parameters.
 * @returns {string} - A query string with the API key and other parameters.
 */
function buildQuery(params) {
    const query = new URLSearchParams({ apikey: OMDB_API_KEY, r: "json", ...params });
    return query.toString();
}

/**
 * Generic function to fetch data from the OMDb API.
 * @param {Object} params - The query parameters for the OMDb API.
 * @returns {Promise<Object>} - The response data or an empty object on failure.
 */
function fetchFromOmdb(params) {
    const url = `${OMDB_API_URL}?${buildQuery(params)}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.Response === "False") {
                console.error("OMDb API error:", data.Error);
                return {};
            }
            return data;
        })
        .catch((error) => {
            console.error("Error fetching data from OMDb API:", error);
            return {};
        });
}

/**
 * OMDb API wrapper functions for predefined use cases.
 */
export const OMDB = {
    // Fetch a movie by its IMDb ID
    getById: function(id) {
        return fetchFromOmdb({ i: id });
    },

    // Fetch a movie by its title
    getByTitle: function(title, options) {
        options = options || {};
        return fetchFromOmdb({ t: title, ...options });
    },

    search: async function(searchTerm, options) {
        options = options || {};
        try {
            // Perform the initial search
            const searchResults = await fetchFromOmdb({ s: searchTerm, ...options });

            // Check if there are results
            if (!searchResults.Search) {
                console.error("OMDb search returned no results.");
                return [];
            }

            // Fetch detailed information for each search result
            const detailedResults = await Promise.all(
                searchResults.Search.map((item) => this.getByTitle(item.Title))
            );

            return detailedResults.filter((result) => Object.keys(result).length > 0);
        } catch (error) {
            console.error("Error performing OMDb search with detailed fetch:", error);
            return [];
        }
    },
    // Predefined helper: Get top movies (example search query)
    getTopMovies: function(options) {
        options = options || {};
        return this.search("top", { type: "movie", ...options });
    },

    // Predefined helper: Get the best movies of 2024
    getBestOf2024: function(options) {
        options = options || {};
        return this.search("", { type: "movie", y: 2024, ...options });
    },

    // Predefined helper: Most reviewed/popular (example query)
    getMostReviewed: function(options) {
        options = options || {};
        return this.search("popular", { type: "movie", ...options });
    },

    // Predefined helper: Hot movies (example query)
    getHotMovies: function(options) {
        options = options || {};
        return this.search("hot", { type: "movie", ...options });
    }
};

// Export OMDB for usage
if (typeof module !== "undefined" && module.exports) {
    module.exports = OMDB;
}
