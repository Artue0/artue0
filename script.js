var savedImage = 0;
let activeIcon = 0;
let navTop = false;
let hideIcon = true;
let isMoving = false;
let clickedIcon = null;
var mainPage = document.getElementById("main-page");
var catPage = document.getElementById("cat-page");
var pcPage = document.getElementById("pc-page");
var musicPage = document.getElementById("music-page");
var gamesPage = document.getElementById("games-page");
var projectsPage = document.getElementById("projects-page");
var websitePage = document.getElementById("website-page");
var linksPage = document.getElementById("links-page");
let page;
var enableCode = true;
var forceMenu = false;
const icons = document.querySelectorAll(".icon");
let selectedIcon = null;
let index = 0;
let pos = null;
const indicator = document.querySelectorAll('#indicator p');
const pages = document.querySelectorAll("#pc-page, #cat-page, #projects-page, #website-page, #links-page, #music-page, #games-page");
let nextPercentage2 = null;

pages.forEach(page2 => {
    page2.childNodes.forEach(child => {
        if (child.nodeType === 1) {child.classList.add("invisible");}
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var track = document.getElementById("image-track");

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
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, -6.5), -93.5);

        track.dataset.percentage = nextPercentage;

        track.style.transform = `translate(${nextPercentage}%, -50%)`;

        let nextPercentage2Unconstrained = Math.max(Math.min(((nextPercentageUnconstrained + 50) * 6.9), 300), -300);
        nextPercentage2 = nextPercentage2Unconstrained;
        indicator.forEach((pElement) => {
            pElement.style.transform = `translate(${nextPercentage2}%, 0)`;
        });
        console.log("1: ", nextPercentage);
        console.log("2: ", nextPercentage2);

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
        // console.log("navTop: ", navTop);
        // console.log("nextPercentage: ", (nextPercentage + 50)*6);
    });

    window.addEventListener('touchmove', function (event) {
        handleOnMove(event.touches[0]);
    });
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
        navTop = true;
        imageCopy.style.boxShadow = "none";
        imageCopy.classList.remove("imageAnim");
        imageCopy.classList.add("visible");
        // hideIcon = true;
        // isMoving = false;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    if (selectedImage.classList.contains('button')){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        if (window.scrollY === 0) {
            activeIcon = 0;
            imageCopy.classList.add('reverseFullscreen');
            button.classList.remove('slideDown');
            button.classList.add('slideUp');
            setTimeout(function() {
                imageCopy.parentNode.removeChild(imageCopy);
                enableCode = !enableCode;
            }, 1200);

            mainPage.classList.remove('invisible');
            // pcPage.classList.add('invisible');
            // catPage.classList.add('invisible');
            // projectsPage.classList.add('invisible');
            // websitePage.classList.add('invisible');
            // linksPage.classList.add('invisible');
            // musicPage.classList.add('invisible');
            // gamesPage.classList.add('invisible');
            pages.forEach(page2 => {
                page2.childNodes.forEach(child => {
                    if (child.nodeType === 1) {child.classList.add("invisible");}
                });
            });

            const activeElements = document.querySelectorAll('.active');
            activeElements.forEach(element => {
                element.classList.remove('active');
            });
        }
    }
    if (selectedImage.parentNode.classList.contains("icon2") || selectedImage.classList.contains("image")) {
        switch (true) {
            case selectedImage.classList.contains("cPc") || selectedImage.classList.contains("imgSetup"):
                selectedIcon = document.getElementById("iconPc").querySelector("i");
                page = pcPage;
                break;
            case selectedImage.classList.contains("cCats") || selectedImage.classList.contains("imgCats"):
                selectedIcon = document.getElementById("iconCats").querySelector("i");
                page = catPage;
                break;
            case selectedImage.classList.contains("cProjects") || selectedImage.classList.contains("imgProjects"):
                selectedIcon = document.getElementById("iconProjects").querySelector("i");
                page = projectsPage;
                break;
            case selectedImage.classList.contains("cWebsite") || selectedImage.classList.contains("imgWebsite"):
                selectedIcon = document.getElementById("iconWebsite").querySelector("i");
                page = websitePage;
                break;
            case selectedImage.classList.contains("cLinks") || selectedImage.classList.contains("imgLinks"):
                selectedIcon = document.getElementById("iconLinks").querySelector("i");
                page = linksPage;
                break;
            case selectedImage.classList.contains("cMusic") || selectedImage.classList.contains("imgMusic"):
                selectedIcon = document.getElementById("iconMusic").querySelector("i");
                page = musicPage;
                break;
            case selectedImage.classList.contains("cGames") || selectedImage.classList.contains("imgGames"):
                selectedIcon = document.getElementById("iconGames").querySelector("i");
                page = gamesPage;
                break;
        }
        if (selectedImage.classList.contains("image")){
            pages.forEach(page2 => {
                page2.childNodes.forEach(child => {
                    if (child.nodeType === 1) {child.classList.add("invisible");}
                });
            });
            setTimeout(function() {
                page.childNodes.forEach(child => {
                    if (child.nodeType === 1) {child.classList.remove("invisible");}
                });
                mainPage.classList.add('invisible');
            }, 1000);
        }
        activeIcon = selectedIcon;
        if ((hideIcon && !isMoving) || selectedImage.classList.contains("image")) {
            activeIcon.classList.add("active");
        }
    }
}

icons.forEach(icon => {
    icon.addEventListener("click", function() {
        if (hideIcon && !isMoving) {
            this.classList.add("active");
        }
        activeIcon = this.querySelector("i");
    });
});

function home(clickedElement){
    clickedIcon = document.getElementsByClassName('setup')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    if (clickedElement != activeIcon) {nav(-6.5, "home", clickedIcon, pcPage);}
}
function about(clickedElement){
    clickedIcon = document.getElementsByClassName('cats')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    if (clickedElement != activeIcon) {nav(-21, "about", clickedIcon, catPage);}
}
function projects(clickedElement){
    clickedIcon = document.getElementsByClassName('projects')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    if (clickedElement != activeIcon) {nav(-35.5, "projects", clickedIcon, projectsPage);}
}
function portfolio(clickedElement){
    clickedIcon = document.getElementsByClassName('portfolio')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    if (clickedElement != activeIcon) {nav(-50, "portfolio", clickedIcon, websitePage);}
}
function contact(clickedElement){
    clickedIcon = document.getElementsByClassName('links')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    if (clickedElement != activeIcon) {nav(-64.5, "contact", clickedIcon, linksPage);}
}
function music(clickedElement){
    clickedIcon = document.getElementsByClassName('music')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    if (clickedElement != activeIcon) {nav(-79, "music", clickedIcon, musicPage);}
}
function games(clickedElement){
    clickedIcon = document.getElementsByClassName('games')[0];
    if (clickedElement === activeIcon && navTop) { menu(clickedIcon); }
    if (clickedElement != activeIcon) {nav(-93.5, "games", clickedIcon, gamesPage);}
}

function nav(endValue, id, clickedElement, page) {
    console.log("nav");
    if(isMoving){return;}

    hideIcon = true;
    isMoving = true;
    enableCode = false;
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
        // clickedElement.querySelector(".text").classList.add("textActive");
        navTop = false;
        setTimeout(function() {
            savedImage.remove();
            savedImage = 0;
        }, 1200);
        mainPage.classList.add('invisible');
        // pcPage.classList.add('invisible');
        // catPage.classList.add('invisible');
        // projectsPage.classList.add('invisible');
        // websitePage.classList.add('invisible');
        // linksPage.classList.add('invisible');
        // musicPage.classList.add('invisible');
        // gamesPage.classList.add('invisible');
        pages.forEach(page2 => {
            page2.childNodes.forEach(child => {
                if (child.nodeType === 1) {child.classList.add("invisible");}
            });
        });
    }

    function startUpdatePercentage() {
        const updatePercentage = setInterval(() => {
            nextPercentage += increment;
            track.dataset.percentage = nextPercentage;
            track.style.transform = `translate(${nextPercentage}%, -50%)`;
            indicator.forEach((pElement) => {
                pElement.style.transform = `translate(${nextPercentage2}%, 0)`;
            });

            const images = track.getElementsByClassName("image");
            for (var image of images) {
                image.style.objectPosition = `${100 + nextPercentage}% center`;
            }

            if ((increment > 0 && nextPercentage >= endValue) || (increment < 0 && nextPercentage <= endValue)) {
                clearInterval(updatePercentage);
                const image = document.getElementById(id);
                const rect = image.getBoundingClientRect();
                imageCopy = image.cloneNode(true);
                imageCopy.style.boxShadow = "none";
                imageCopy.classList.remove("imageAnim");
                imageCopy.classList.add("visible");
                savedImage = imageCopy;
                document.body.appendChild(imageCopy);
                imageCopy.classList.add('fullscreen');
                imageCopy.style.setProperty('--start-x', rect.left + 'px');
                button.classList.remove('slideUp');
                button.classList.add('slideDown');
                navTop = true;
                isMoving = false;
                setTimeout(function() {
                    page.childNodes.forEach(child => {
                        if (child.nodeType === 1) {child.classList.remove("invisible");}
                    });
                    mainPage.classList.add('invisible');
                    setTimeout(() => {
                        observe();
                    }, 1000);
                    
                }, 1000);
            }
        });
    }
    console.log(clickedElement);
    track.dataset.prevPercentage = endValue;
}

function menu(clickedElement) {
    console.log("menu");
    mainPage.classList.remove('invisible');
    // pcPage.classList.add('invisible');
    // catPage.classList.add('invisible');
    // projectsPage.classList.add('invisible');
    // websitePage.classList.add('invisible');
    // linksPage.classList.add('invisible');
    // musicPage.classList.add('invisible');
    // gamesPage.classList.add('invisible');
    pages.forEach(page2 => {
        page2.childNodes.forEach(child => {
            if (child.nodeType === 1) {child.classList.add("invisible");}
        });
    });
    hideIcon = false;
    const button = document.getElementsByClassName('button')[0];
    navTop = false;
    if (window.scrollY !== 0) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    if (savedImage) { // Check if savedImage is not null or undefined
        savedImage.classList.add('reverseFullscreen');
    }
    button.classList.remove('slideDown');
    button.classList.add('slideUp');
    if (clickedElement) { // Ensure clickedElement is defined
        clickedElement.classList.remove("active");
    }
    enableCode = true;
    setTimeout(function () {
        if (savedImage) { // Check if savedImage is not null or undefined
            savedImage.parentNode.removeChild(savedImage);
            savedImage = 0;
        }
        forceMenu = false;
        activeIcon = 0;
    }, 1200);
}

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry => {
        if(entry.isIntersecting && entry.target.classList.contains('imageAppear')) {
            entry.target.classList.add('imageAnim');
        } else {
            entry.target.classList.remove('imageAppear');
            entry.target.classList.add('visible');
        }
    }));
});

const imageElements = document.querySelectorAll('.image');
imageElements.forEach((el) => observer2.observe(el));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry => {
        if(entry.isIntersecting && !entry.target.classList.contains("invisible")) {
            console.log("succed");
            entry.target.classList.add('show');
            console.log("entry: ", entry.target);
        }
    }));
});

const hiddenElements = document.querySelectorAll('.hidden');
function observe(){
    hiddenElements.forEach((el) => observer.observe(el));
}
observe();