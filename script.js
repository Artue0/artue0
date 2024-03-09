var savedImage = 0;
let activeIcon = 0;
let navTop = false;
let hideIcon = true;
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
        if (track.dataset.mouseDownAt === "0" || !enableCode || event.target.id === "myRange") return;

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
        console.log(nextPercentage)
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
                    enableCode = !enableCode;
                }, 1200);
            }
        }
    }

    const icons = document.querySelectorAll(".icon");
    icons.forEach(icon => {
        icon.addEventListener("click", function() {
            if (hideIcon) {this.classList.add("active");}
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

function nav(endValue, id) {
    hideIcon = true;
    const track = document.getElementById("image-track");
    let currentPercentage = parseFloat(track.dataset.percentage);
    const button = document.getElementsByClassName('button')[0];
    const increment = endValue > currentPercentage ? 0.35 : -0.35;
    let nextPercentage = currentPercentage;

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
        activeIcon.classList.remove("active");
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
            }
        });
    }

    track.dataset.prevPercentage = endValue;
}

function menu() {
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
    activeIcon.classList.remove("active");
    setTimeout(function() {
        savedImage.parentNode.removeChild(savedImage);
        savedImage = 0;
    }, 1200);
}

function home(clickedElement){
    if (clickedElement === activeIcon && navTop) { menu(); }
    else {nav(-6.5, "home");}
}
function about(clickedElement){
    if (clickedElement === activeIcon && navTop) { menu(); }
    else {nav(-21, "about");}
}
function projects(clickedElement){
    if (clickedElement === activeIcon && navTop) { menu(); }
    else {nav(-35.5, "projects");}
}
function portfolio(clickedElement){
    if (clickedElement === activeIcon && navTop) { menu(); }
    else {nav(-50, "portfolio");}
}
function contact(clickedElement){
    if (clickedElement === activeIcon && navTop) { menu(); }
    else {nav(-64.5, "contact");}
}
function music(clickedElement){
    if (clickedElement === activeIcon && navTop) { menu(); }
    else {nav(-79, "music");}
}
function games(clickedElement){
    if (clickedElement === activeIcon && navTop) { menu(); }
    else {nav(-93.5, "games");}
}