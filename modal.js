export class Modal {
    constructor() {
        this.modalElement = null;
    }

    create({ title = "Default Title", content = "Default Content", poster = "default.jpg", trailer = 'default_src', actors = 'John Doe , Jane Doe', date = 'new Date()', rating = 'null', onClose = null }) {
        // Remove any existing modal
        if (this.modalElement) {
            this.close();
        }

        const posterImage = new Image();
        posterImage.src = poster;

        // ratingImage[0] - certified fresh , ratingImage[1] - fresh , ratingImage[2] - rotten
        const ratingImageArr = ["https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Certified_Fresh_2018.svg/45px-Certified_Fresh_2018.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/45px-Rotten_Tomatoes.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rotten_Tomatoes_rotten.svg/45px-Rotten_Tomatoes_rotten.svg.png"
        ]
        const ratingImage = new Image();
        var temp1 = rating.replace("/10", ""); //1digit rating value 
        var temp2 = temp1.replace("%", ""); //2digit rating value
        var num; // declaring unrounded rating and other
        if (rating != temp1) {
            num = Number(temp1) / 10;
        } else {
            num = Number(temp2) / 100;
        }
        console.log(num);
        var i; // used in the src of the rotten tomatoes
        if (num <= 0.59) {
            ratingImage.src = ratingImageArr[2];
            i = 2;
        } else if (num > 0.59 && num < 0.75) {
            ratingImage.src = ratingImageArr[1];
            i = 1;
        } else {
            ratingImage.src = ratingImageArr[0];
            i = 0;
        }
        // removes the differences between the % and /10 ratings 
        var clean_rate = `${(num * 10).toPrecision(2)}/10`;
        // Formats them as /10 rating 
        // var clean_rate = `${(num*100).toPrecision(2)}%`; formated to %

        // Create modal elements
        // Added trailers width="854px" height="480px" preferred 
        // ratio 854/480
        this.modalElement = document.createElement("div");
        this.modalElement.className = "modal";
        this.modalElement.innerHTML = `
      <div class="modal-card my-3 shadow-sm p-5">
          <div class="card-body d-flex align-items-start">
            <img src="${poster}" class="rounded me-3" alt="${title} Poster" rel="preload"/>
            <div class="d-flex flex-column align-items-center w-70 z-3 py-50 left z-3">
              <h5 class="card-title mt-3 mb-3">${title}</h5>
              <div id="video-container"></div>
              <p class="card-text">${content} </br> <b>Actors: </b> ${actors} </br> <b>Date of release: </b> ${date}</p>
                <p class="card-text">
                    <img src="${ratingImageArr[i]}"  width="60px" height="60px" style='display:inline-block' class="rounded me-3" alt="${rating} Poster" rel="preload"/>
                    <b>Rotten Tomatoes: </b>  ${clean_rate}
                </p>   
              <span class="modal-close">Close &times;</span>
            </div>
          </div>
      </div>
    `;

        // Check if trailer is valid (not 'default_src' and a valid URL)
        if (trailer && trailer !== 'default_src') {
            this.validateTrailerUrl(trailer);
        }

        // Add close functionality
        this.modalElement.querySelector(".modal-close").addEventListener("click", () => {
            this.close();
            if (onClose) onClose();
        });

        // Add modal to document
        document.body.appendChild(this.modalElement);
        this.open();
    }

    async validateTrailerUrl(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });

            if (response.ok) {
                // Trailer URL is valid, show the iframe
                const iframe = document.createElement('iframe');
                iframe.className = 'modal-video mb-3';
                iframe.width = '800px';
                iframe.height = '450px';
                iframe.src = `${url}?autoplay=1&mute=1`;
                document.getElementById('video-container').appendChild(iframe);
            } else {
                // Trailer URL is invalid, do not display iframe
                console.error('Invalid trailer URL:', url);
            }
        } catch (error) {
            // Network or other errors
            console.error('Error checking trailer URL:', error);
        }
    }

    open() {
        // Add the 'show' class to trigger the modal's visibility and animation
        setTimeout(() => {
            this.modalElement.classList.add("show");
        }, 10); // Short delay to ensure the modal is rendered before animation starts
    }

    close() {
        if (this.modalElement) {
            // Remove the 'show' class to trigger the close transition
            this.modalElement.classList.remove("show");

            // Wait for the close transition to finish before removing the modal from the DOM
            setTimeout(() => {
                this.modalElement.remove();
                this.modalElement = null;
            }, 300); // Timeout matches the transition duration
        }
    }
}
