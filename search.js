<<<<<<< HEAD
// OMDB API configuration
export const OMDB = {
    async search(query) {
        const apiKey = '9b3d4ace'; // Zëvendëso me çelësin e saktë
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Gabim gjatë lidhjes me API:", error);
            return { Response: "False", Error: "Nuk mund të lidhet me API." };
        }
    }
};

// Elementët HTML
=======
>>>>>>> 05ac61d6d8f850fce647c8a9c5252f201fccf757
const search_box = document.getElementById("search_box");
const search_icon = document.querySelector(".search_button");
const results_div = document.getElementById("results");

<<<<<<< HEAD
// Event listener për shtypjen e "Enter" në kutinë e kërkimit
search_box.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        e.preventDefault();
        search(search_box.value);
    }
});

// Event listener për klikimin mbi ikonën e kërkimit
search_icon.addEventListener("click", function (e) {
    e.preventDefault();
    search(search_box.value);
=======
// Event listener for "Enter" key press
search_box.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {  // checks whether the pressed key is "Enter"
        e.preventDefault();  // prevent form submission (if inside a form)
        search(search_box);
    }
});

// Event listener for click on the search icon
search_icon.addEventListener("click", function(e) {
    e.preventDefault();  // Prevent default link behavior
    search(search_box);
>>>>>>> 05ac61d6d8f850fce647c8a9c5252f201fccf757
});

// Funksioni që menaxhon kërkimin
async function search(searchTerm) {
    results_div.innerHTML = ""; // Pastron rezultatet ekzistuese
    if (searchTerm.trim() === "") {
        results_div.innerHTML = "<p>Ju lutem shkruani titullin e një filmi.</p>";
        return;
    }

    results_div.innerHTML = "<p>Duke kërkuar...</p>";
    const response = await OMDB.search(searchTerm);

    if (response.Response === "False") {
        results_div.innerHTML = `<p>${response.Error}</p>`;
    } else {
        displayResults(response.Search);
    }
}

// Funksioni për të shfaqur rezultatet e kërkimit
function displayResults(movies) {
    if (!movies || movies.length === 0) {
        results_div.innerHTML = "<p>Nuk ka asnjë film të gjetur.</p>";
        return;
    }

    const movieList = movies.map(movie => `
        <div class="movie">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100"}" alt="${movie.Title}">
            <div>
                <h3>${movie.Title} (${movie.Year})</h3>
            </div>
        </div>
    `).join("");

    results_div.innerHTML = movieList;
}


<<<<<<< HEAD
    // Call the OMDB search function
    /* UNCOMMENT TO START SEARCHING
    OMDB.search(searchTerm).then((data) => {
        if (data && data.Search) {
            console.log("Search results:", data.Search);
            // You can update the UI to display the search results here
        } else {
            console.error("No results found.");
        }
    });
    */

=======
    const term = searchTerm.value.trim();

    if (!term) {
        alert("Please enter a search term.");
        return;
    }

    // Redirect to the results page with the search term as a query parameter
    window.location.href = `pages/result/result.html?query=${encodeURIComponent(term)}`;
}
>>>>>>> 05ac61d6d8f850fce647c8a9c5252f201fccf757
