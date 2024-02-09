document.addEventListener('DOMContentLoaded', function () {
    var track = document.getElementById("image-track");
    var enableCode = true; // Flag to control code execution
    var animationDone = false;

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
    if (selectedImage.classList.contains('image') && !selectedImage.classList.contains('fullscreen') && !animationDone){
        imageCopy = selectedImage.cloneNode(true);
        enableCode = !enableCode;
        //animationDone = !animationDone;
        document.body.appendChild(imageCopy);
        imageCopy.classList.add('fullscreen');
        imageCopy.style.setProperty('--start-x', rect.left + 'px');
        document.body.style.overflowY = 'auto';
        //close.dataset.image_id = imageCopy;
    }
    if (selectedImage.classList.contains('button')){
        imageCopy.classList.add('reverseFullscreen');
        enableCode = !enableCode;
    }
    }
});
