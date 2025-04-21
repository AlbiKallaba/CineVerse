// Draw the arrow on the canvas
const canvas = document.getElementById("arrowCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.beginPath();
ctx.moveTo(15, 5);
ctx.lineTo(25, 20);
ctx.lineTo(20, 20);
ctx.lineTo(15, 10);
ctx.lineTo(10, 20);
ctx.lineTo(5, 20);
ctx.closePath();
ctx.fill();

// Back to top functionality
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
