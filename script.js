var savedImage = 0;
let activeIcon = 0;
let navTop = false;
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
            document.body.style.overflowY = 'auto';
            button.classList.remove('slideUp');
            button.classList.add('slideDown');
        }
        if (selectedImage.classList.contains('button')){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            if (window.scrollY === 0) {
                document.body.style.overflowY = 'hidden';
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
            this.classList.add("active");
            activeIcon = this;
        });
    });
});

function nav(endValue, id) {
    iconMenu = false;
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
        setTimeout(startUpdatePercentage, 1000);

        document.body.style.overflowY = 'hidden';
        savedImage.classList.add('reverseFullscreen');
        button.classList.remove('slideDown');
        button.classList.add('slideUp');
        activeIcon.classList.remove("active");
        navTop = false;
        setTimeout(function() {
            savedImage.parentNode.removeChild(savedImage);
            savedImage = 0;
        }, 1000);
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
                document.body.style.overflowY = 'auto';
                button.classList.remove('slideUp');
                button.classList.add('slideDown');
                navTop = true;
            }
        });
    }

    track.dataset.prevPercentage = endValue;
}

function menu() {
    console.log("y");
    const button = document.getElementsByClassName('button')[0];
    navTop = false;
    if (window.scrollY !== 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    document.body.style.overflowY = 'hidden';
    savedImage.classList.add('reverseFullscreen');
    button.classList.remove('slideDown');
    button.classList.add('slideUp');
    activeIcon.classList.remove("active");
    setTimeout(function() {
        savedImage.parentNode.removeChild(savedImage);
        savedImage = 0;
    }, 1000);
}

function home(clickedElement){
    if (clickedElement !== activeIcon){
        nav(-6.5, "home");
    } else { menu(); }
}
function about(clickedElement){
    nav(-21, "about");
}
function projects(clickedElement){
    nav(-35.5, "projects");
}
function portfolio(clickedElement){
    nav(-50, "portfolio");
}
function contact(clickedElement){
    nav(-64.5, "contact");
}
function music(clickedElement){
    nav(-79, "music");
}
function games(clickedElement){
    nav(-93.5, "games");
}