const carousel = document.querySelector('.carouselOfImage');
const dot = document.querySelectorAll('.dot');
const imageLink = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5fc9e7a7f342b6a6.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/bd4cf86703c6399a.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5a2311ff9e965a96.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/2a531c5058aa50b3.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ae9a1349fe262071.png?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d05c680ac784bef4.png?q=20"
]
function createCarousel(address) {

    const carouselItem = document.createElement('div');
    carouselItem.setAttribute('class', 'carouselItem');

    const carouselImage = document.createElement('img');
    carouselImage.setAttribute('src', address);
    carouselImage.setAttribute('alt', 'carousel Image');

    carouselItem.appendChild(carouselImage);
    carousel.appendChild(carouselItem);
}

let currentIndex = 0;
let previousDot = dot[0];


function nextSlide() {
    currentIndex = (currentIndex + 1) % imageLink.length;
    carousel.innerHTML = "";
    createCarousel(imageLink[currentIndex]);
    previousDot.style.backgroundColor = 'grey';
    dot[currentIndex].style.backgroundColor = '#012a4a';
    previousDot = dot[currentIndex];
}

function previousSlide() {
    currentIndex = (currentIndex - 1 + imageLink.length) % imageLink.length;
    carousel.innerHTML = "";
    createCarousel(imageLink[currentIndex]);
    previousDot.style.backgroundColor = 'grey';
    dot[currentIndex].style.backgroundColor = '#012a4a';
    previousDot = dot[currentIndex];
}

createCarousel(imageLink[currentIndex]);
previousDot.style.backgroundColor = '#012a4a'
setInterval(nextSlide, 4000);
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', previousSlide);