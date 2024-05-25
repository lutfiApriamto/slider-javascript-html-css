const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll('img')[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevpageX, prevScrollLeft;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; //getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ?'none' : 'block';
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ?'none' : 'block';
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () =>{
        let firstImgWidth = firstImg.clientWidth + 14 //getting first img width & adding 14 margin value
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        // jika gak paham pakai operator ternarry pakai ini
        // if(icon.id == "left"){
        //     carousel.scrollLeft -= firstImgWidth;
        // } else {
        //     carousel.scrollLeft += firstImgWidth;
        // }
        
        setTimeout(() => showHideIcons(), 60) // memuculkan icon setelah 60ms
    });
});

const dragStart = (e) => {
    // updatting global variable value on mouse down event
    isDragStart = true;
    prevpageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scroling iamges/ carousel to left according to mouse pinter
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = (e.pageX || e.touches[0].pageX )- prevpageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);