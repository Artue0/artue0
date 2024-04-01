var savedImage = 0;
let activeIcon = 0;
let navTop = false;
let hideIcon = true;
let isMoving = false;
let clickedIcon = null;
document.addEventListener('DOMContentLoaded', function () {
    var track = document.getElementById("image-track");
    var enableCode = true;
    track.dataset.percentage = -50;

    var handleOnDown = function (event) {
        track.dataset.mouseDownAt = event.clientX;
    };

    var handleOnUp = function () {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
    };

    const handleOnMove = function (event) {
        if (track.dataset.mouseDownAt === "0" || !enableCode) return;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - event.clientX;
        const maxDelta = window.innerWidth;

        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        track.dataset.percentage = nextPercentage;

        track.style.transform = `translate(${nextPercentage}%, -50%)`;

        const images = track.getElementsByClassName("image");
        for (var image of images) {
            image.style.objectPosition = `${100 + nextPercentage}% center`;
        }
    };

    window.addEventListener('mousedown', function (event) {
        handleOnDown(event);
        handleImageClick(event);
    });

    window.addEventListener('touchstart', function (event) {
        handleOnDown(event.touches[0]);
    });

    window.addEventListener('mouseup', function (event) {
        handleOnUp(event);
    });

    window.addEventListener('touchend', function (event) {
        handleOnUp(event.touches[0]);
    });

    window.addEventListener('mousemove', function (event) {
        handleOnMove(event);
    });

    window.addEventListener('touchmove', function (event) {
        handleOnMove(event.touches[0]);
    });

    function handleImageClick(event) {
        const selectedImage = event.target;
        const rect = selectedImage.getBoundingClientRect();
        const button = document.getElementsByClassName('button')[0];
        if (selectedImage.classList.contains('image') && !selectedImage.classList.contains('fullscreen') && enableCode){
            imageCopy = selectedImage.cloneNode(true);
            savedImage = imageCopy;
            enableCode = !enableCode;
            document.body.appendChild(imageCopy);
            imageCopy.classList.add('fullscreen');
            imageCopy.style.setProperty('--start-x', rect.left + 'px');
            button.classList.remove('slideUp');
            button.classList.add('slideDown');
        }
        if (selectedImage.classList.contains('button')){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            if (window.scrollY === 0) {
                imageCopy.classList.add('reverseFullscreen');
                button.classList.remove('slideDown');
                button.classList.add('slideUp');
                setTimeout(function() {
                    imageCopy.parentNode.removeChild(imageCopy);
                    if (!navTop) {enableCode = !enableCode;}
                }, 1200);
            }
        }
    }

    const icons = document.querySelectorAll(".icon");
    icons.forEach(icon => {
        icon.addEventListener("click", function() {
            if (hideIcon && !isMoving) {this.classList.add("active");}
            activeIcon = this;
        });
    });

    // const myRange = document.getElementById("myRange");

    // myRange.addEventListener("input", function(event) {
    //     const sliderValue = parseInt(event.target.value);
    //     const nextPercentage = sliderValue * -1 /10;

    //     track.dataset.percentage = nextPercentage;
    //     track.style.transform = `translate(${nextPercentage}%, -50%)`;

    //     const images = track.getElementsByClassName("image");
    //     for (var image of images) {
    //         image.style.objectPosition = `${100 + nextPercentage}% center`;
    //     }
    // });
});


function home(clickedElement){
    clickedIcon = document.getElementsByClassName('setup')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    else {nav(-6.5, "home", clickedIcon);}
}
function about(clickedElement){
    clickedIcon = document.getElementsByClassName('cats')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    else {nav(-21, "about", clickedIcon);}
}
function projects(clickedElement){
    clickedIcon = document.getElementsByClassName('projects')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    else {nav(-35.5, "projects", clickedIcon);}
}
function portfolio(clickedElement){
    clickedIcon = document.getElementsByClassName('portfolio')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    else {nav(-50, "portfolio", clickedIcon);}
}
function contact(clickedElement){
    clickedIcon = document.getElementsByClassName('links')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    else {nav(-64.5, "contact", clickedIcon);}
}
function music(clickedElement){
    clickedIcon = document.getElementsByClassName('music')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    else {nav(-79, "music", clickedIcon);}
}
function games(clickedElement){
    clickedIcon = document.getElementsByClassName('games')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    else {nav(-93.5, "games", clickedIcon);}
}

function nav(endValue, id, clickedElement) {
    if(isMoving){return;}

    hideIcon = true;
    isMoving = true;
    const track = document.getElementById("image-track");
    let currentPercentage = parseFloat(track.dataset.percentage);
    const button = document.getElementsByClassName('button')[0];
    const increment = endValue > currentPercentage ? 0.35 : -0.35;
    let nextPercentage = currentPercentage;
    const activeElements = document.querySelectorAll('.active');

    activeElements.forEach(element => {
        element.classList.remove('active');
    });

    if (!clickedElement.classList.contains('active')) {
        clickedElement.classList.add('active');
    }

    if (window.scrollY !== 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    if (savedImage === 0) {
        startUpdatePercentage();
    } else {
        setTimeout(startUpdatePercentage, 1200);
        savedImage.classList.add('reverseFullscreen');
        button.classList.remove('slideDown');
        button.classList.add('slideUp');
        clickedElement.classList.add("active");
        navTop = false;
        setTimeout(function() {
            savedImage.parentNode.removeChild(savedImage);
            savedImage = 0;
        }, 1200);
    }

    function startUpdatePercentage() {
        const updatePercentage = setInterval(() => {
            nextPercentage += increment;
            track.dataset.percentage = nextPercentage;

            track.style.transform = `translate(${nextPercentage}%, -50%)`;

            const images = track.getElementsByClassName("image");
            for (var image of images) {
                image.style.objectPosition = `${100 + nextPercentage}% center`;
            }

            if ((increment > 0 && nextPercentage >= endValue) || (increment < 0 && nextPercentage <= endValue)) {
                clearInterval(updatePercentage);
                const image = document.getElementById(id);
                const rect = image.getBoundingClientRect();
                imageCopy = image.cloneNode(true);
                savedImage = imageCopy;
                document.body.appendChild(imageCopy);
                imageCopy.classList.add('fullscreen');
                imageCopy.style.setProperty('--start-x', rect.left + 'px');
                button.classList.remove('slideUp');
                button.classList.add('slideDown');
                navTop = true;
                isMoving = false;
            }
        });
    }
    console.log(clickedElement);
    track.dataset.prevPercentage = endValue;
}

function menu(clickedElement) {
    hideIcon = false;
    const button = document.getElementsByClassName('button')[0];
    navTop = false;
    if (window.scrollY !== 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    savedImage.classList.add('reverseFullscreen');
    button.classList.remove('slideDown');
    button.classList.add('slideUp');
    clickedElement.classList.remove("active");
    setTimeout(function() {
        savedImage.parentNode.removeChild(savedImage);
        savedImage = 0;
    }, 1200);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    }));
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});
