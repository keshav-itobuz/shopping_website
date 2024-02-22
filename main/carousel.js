const carouselItems = document.querySelectorAll('.carouselItem');
const dot = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {

    carouselItems.forEach(item => {
        item.style.display = 'none';
    });
    dot.forEach(item => {
        item.style.backgroundColor = 'grey';
    });

    carouselItems[index].style.display = 'block';
    dot[index].style.backgroundColor = '#012a4a';
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
}

function previousSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentIndex);
}

showSlide(currentIndex);
setInterval(nextSlide, 3000);
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', previousSlide);