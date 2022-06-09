const title = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
    title.getElementsByClassName.color = "blue";
}

function handleMouseEnter() {
    title.innerText = "mouse is here!";
}

function handleMouseLeave() {
    title.innerText = "mouse is gone!";
}

title.addEventListener("click", handleTitleClick);
title.addEventListener("mouseenter", handleMouseEnter);
title.addEventListener("mouseleace", handleMouseLeave);
