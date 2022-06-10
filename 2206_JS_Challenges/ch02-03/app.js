const h1 = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
    if(h1.className === "active") {
        h1.className = "";
    } else {
        h1.className = "active";
    }
}

// function handleMouseEnter() {
//     title.innerText = "mouse is here!";
// }

// function handleMouseLeave() {
//     title.innerText = "mouse is gone!";
// }

title.addEventListener("click", handleTitleClick);
// title.addEventListener("mouseenter", handleMouseEnter);
// title.addEventListener("mouseleace", handleMouseLeave);
