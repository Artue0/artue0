document.addEventListener('DOMContentLoaded', function () {
    var track = document.getElementById("image-track");
    var enableCode = true;

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
      let topPage = true;
      const button = document.getElementsByClassName('button')[0];
      console.log(button);
    if (selectedImage.classList.contains('image') && !selectedImage.classList.contains('fullscreen') && enableCode){
        imageCopy = selectedImage.cloneNode(true);
        enableCode = !enableCode;
        document.body.appendChild(imageCopy);
        imageCopy.classList.add('fullscreen');
        imageCopy.style.setProperty('--start-x', rect.left + 'px');
        document.body.style.overflowY = 'auto';
        //const button = document.getElementsByClassName('button');
        button.classList.remove('slideUp');
        button.classList.add('slideDown');
        //console.log(button);
    }
    if (selectedImage.classList.contains('button')){
        if (topPage){
            document.body.style.overflowY = 'hidden';
            imageCopy.classList.add('reverseFullscreen');
            button.classList.remove('slideDown');
            button.classList.add('slideUp');
            setTimeout(function() {
                imageCopy.parentNode.removeChild(imageCopy);
                enableCode = !enableCode;
            }, 1200);
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        if (window.scrollY === 0) {
            topPage = true;
        } else {
            topPage = false;
        }
        console.log(window.scrollY)
    }
    }
    
});
function nav(endValue) {
    const track = document.getElementById("image-track");
    const maxDelta = window.innerWidth;
    let currentPercentage = parseFloat(track.dataset.percentage);
    
    // Determine whether to add or subtract to reach the endValue
    const increment = endValue > currentPercentage ? 0.3 : -0.3;
    
    // Update nextPercentage until it reaches the endValue
    let nextPercentage = currentPercentage;
    const updatePercentage = setInterval(() => {
        nextPercentage += increment;
        track.dataset.percentage = nextPercentage;
        
        track.style.transform = `translate(${nextPercentage}%, -50%)`;
        
        const images = track.getElementsByClassName("image");
        for (var image of images) {
            image.style.objectPosition = `${100 + nextPercentage}% center`;
        }
        
        // Check if nextPercentage has reached endValue
        if ((increment > 0 && nextPercentage >= endValue) || (increment < 0 && nextPercentage <= endValue)) {
            clearInterval(updatePercentage);
        }
    });
    track.dataset.prevPercentage = endValue;
}

function home(){nav(-6.5);}
function about(){nav(-6);}
function projects(){nav(-100);}
function portfolio(){nav(-100);}
function contact(){nav(-100);}
function music(){nav(-100);}
function games(){nav(-100);}