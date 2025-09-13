const prevButton = document.querySelector(".testimonials__controls-btn--prev");
const nextButton = document.querySelector(".testimonials__controls-btn--next");

const imageHolder = document.querySelector(".testimonials__images");
const testimonialHolder = document.querySelector(".testimonials__slides");
const testimonialMessage = document.querySelector(".testimonials__message");

const images = [];
const testimonials = [];

let currentTestimonialIndex = 0;
let isAnimating = false;
const animationDuration = 300;

const resquestAnimationFrameAfter = (duration, callback) => {
    let startTime = -1;

    const callbackLoop = (currentTime) => {
        console.log(currentTime);
        if (startTime === -1) {
            startTime = currentTime;
        }

        if (currentTime - startTime >= duration) {
            callback();
        } else {
            requestAnimationFrame(callbackLoop);
        }
    };
    requestAnimationFrame(callbackLoop);
};

const updateTestitmonialLiveMessage = () => {
    testimonialMessage.textContent = `Showing item ${currentTestimonialIndex} of ${images.length}`;
};

const handlePrevButtonClick = () => {
    if (isAnimating) return;

    const oldImage = images[currentTestimonialIndex];
    const oldTestimonial = testimonials[currentTestimonialIndex];
    currentTestimonialIndex = (currentTestimonialIndex - 1 + images.length) % images.length;
    const newImage = images[currentTestimonialIndex];
    const newTestimonial = testimonials[currentTestimonialIndex];

    isAnimating = true;

    oldImage.style.transition = `${animationDuration}ms ease`;

    newImage.style.margin = "0 0 0 -100%";
    newImage.style.transition = `${animationDuration}ms ease`;

    imageHolder.insertBefore(newImage, imageHolder.firstChild);

    newTestimonial.style.transform = "translateY(20px)";
    newTestimonial.style.opacity = "0";
    newTestimonial.style.transition = `${animationDuration}ms ease`;

    oldTestimonial.style.transition = `${animationDuration}ms ease`;
    oldTestimonial.style.position = "absolute";
    oldTestimonial.style.transform = "translateY(-20px)";
    oldTestimonial.style.opacity = "0";

    testimonialHolder.appendChild(newTestimonial);

    requestAnimationFrame(() => {
        newImage.style.margin = null;
        newTestimonial.style.opacity = null;
        newTestimonial.style.transform = null;
    });

    resquestAnimationFrameAfter(animationDuration, () => {
        isAnimating = false;

        oldImage.remove();
        oldImage.removeAttribute("style");

        newImage.removeAttribute("style");

        oldTestimonial.remove();
        oldTestimonial.removeAttribute("style");

        newTestimonial.removeAttribute("style");

        updateTestitmonialLiveMessage();
    });
};

const handleNextButtonClick = () => {
    if (isAnimating) return;

    const oldImage = images[currentTestimonialIndex];
    const oldTestimonial = testimonials[currentTestimonialIndex];
    currentTestimonialIndex = (currentTestimonialIndex + 1) % images.length;
    const newImage = images[currentTestimonialIndex];
    const newTestimonial = testimonials[currentTestimonialIndex];

    isAnimating = true;

    oldImage.style.transition = `${animationDuration}ms ease`;

    newImage.style.transition = `${animationDuration}ms ease`;

    newTestimonial.style.transform = "translateY(20px)";
    newTestimonial.style.opacity = "0";
    newTestimonial.style.transition = `${animationDuration}ms ease`;

    oldTestimonial.style.transition = `${animationDuration}ms ease`;
    oldTestimonial.style.position = "absolute";
    oldTestimonial.style.transform = "translateY(-20px)";
    oldTestimonial.style.opacity = "0";

    imageHolder.appendChild(newImage);
    testimonialHolder.appendChild(newTestimonial);

    oldImage.style.margin = "0 0 0 -100%";

    requestAnimationFrame(() => {
        newTestimonial.style.opacity = null;
        newTestimonial.style.transform = null;
    });

    resquestAnimationFrameAfter(animationDuration, () => {
        isAnimating = false;

        oldImage.remove();
        oldImage.removeAttribute("style");

        newImage.removeAttribute("style");

        oldTestimonial.remove();
        oldTestimonial.removeAttribute("style");

        newTestimonial.removeAttribute("style");

        updateTestitmonialLiveMessage();
    });
};

requestAnimationFrame(() => {
    document.querySelectorAll(".testimonials__images img").forEach((element) => {
        images.push(element);
        element.remove();
    });

    document.querySelectorAll(".testimonials__slide").forEach((element) => {
        testimonials.push(element);
        element.remove();
    });

    imageHolder.appendChild(images[currentTestimonialIndex]);
    testimonialHolder.appendChild(testimonials[currentTestimonialIndex]);
});

nextButton.addEventListener("click", () => handleNextButtonClick());
prevButton.addEventListener("click", () => handlePrevButtonClick());

window.addEventListener("keydown", (e) => {
    if (
        document.activeElement.isEqualNode(document.querySelector("body")) ||
        document.activeElement.parentElement.isEqualNode(nextButton.parentElement)
    ) {
        if (e.key == "ArrowRight") {
            e.preventDefault();
            nextButton.click();
            nextButton.focus();
        } else if (e.key == "ArrowLeft") {
            e.preventDefault();
            prevButton.click();
            prevButton.focus();
        }
    }
});
