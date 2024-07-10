const testimonial = {
    prevBtn: document.querySelector(".testimonial__carousel__btn--prev"),
    nextBtn: document.querySelector(".testimonial__carousel__btn--next"),
    imageHolder: document.querySelector(".testimonial__carousel__image"),
    quoteHolder: document.querySelector(".testimonial__quote"),
    personNameHolder: document.querySelector(".testimonial__person__name"),
    personRoleHolder: document.querySelector(".testimonial__person__role"),
    testimonials: [],
    currentIndex: 0,
    isTransitioning: false,
    settings: {
        transitionDurationBase: 300,
    },
    handlePrevClick() {
        if (this.isTransitioning) return;

        const oldImage = this.testimonials[this.currentIndex][0];
        const oldQuote = this.testimonials[this.currentIndex][1];
        const oldPersonName = this.testimonials[this.currentIndex][2];
        const oldPersonRole = this.testimonials[this.currentIndex][3];

        if (this.currentIndex == 0) {
            this.currentIndex = this.testimonials.length - 1;
        } else {
            this.currentIndex--;
        }

        const newImage = this.testimonials[this.currentIndex][0];
        const newQuote = this.testimonials[this.currentIndex][1];
        const newPersonName = this.testimonials[this.currentIndex][2];
        const newPersonRole = this.testimonials[this.currentIndex][3];

        requestAnimationFrame(() => {
            this.isTransitioning = true;

            this.imageHolder.insertBefore(newImage, this.imageHolder.firstChild);
            newImage.style.margin = "0 0 0 -100%";
            oldImage.style.transition = `${this.settings.transitionDurationBase}ms ease`;
            newImage.style.transition = `${this.settings.transitionDurationBase}ms ease`;

            oldQuote.remove();
            this.quoteHolder.appendChild(newQuote);
            newQuote.style.transform = "translateY(1rem)";
            newQuote.style.transition = `transform ${this.settings.transitionDurationBase}ms ease`;
            newQuote.style.opacity = "0";

            oldPersonName.remove();
            this.personNameHolder.appendChild(newPersonName);
            newPersonName.style.transform = "translateY(1rem)";
            newPersonName.style.transition = `transform ${this.settings.transitionDurationBase}ms ease`;
            newPersonName.style.opacity = "0";

            oldPersonRole.remove();
            this.personRoleHolder.appendChild(newPersonRole);
            newPersonRole.style.transform = "translateY(1rem)";
            newPersonRole.style.transition = `transform ${this.settings.transitionDurationBase}ms ease`;
            newPersonRole.style.opacity = "0";

            requestAnimationFrame(() => {
                let startTime = null;

                newImage.style.margin = null;
                newQuote.style.transform = null;
                newQuote.style.opacity = null;
                newPersonName.style.transform = null;
                newPersonName.style.opacity = null;
                newPersonRole.style.transform = null;
                newPersonRole.style.opacity = null;

                function resetStyle(t) {
                    if (!startTime) {
                        startTime = t;
                    }
                    if (t - startTime < testimonial.settings.transitionDurationBase) {
                        requestAnimationFrame(resetStyle);
                    } else {
                        testimonial.isTransitioning = false;

                        oldImage.remove();
                        oldImage.style.margin = null;
                        oldImage.style.transition = null;
                        newImage.style.transition = null;
                        newQuote.style.transition = null;
                        newPersonName.style.transition = null;
                        newPersonRole.style.transition = null;
                    }
                }

                requestAnimationFrame(resetStyle);
            });
        });
    },
    handleNextClick(e) {
        if (this.isTransitioning) return;

        const oldImage = this.testimonials[this.currentIndex][0];
        const oldQuote = this.testimonials[this.currentIndex][1];
        const oldPersonName = this.testimonials[this.currentIndex][2];
        const oldPersonRole = this.testimonials[this.currentIndex][3];

        if (this.currentIndex == this.testimonials.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }

        const newImage = this.testimonials[this.currentIndex][0];
        const newQuote = this.testimonials[this.currentIndex][1];
        const newPersonName = this.testimonials[this.currentIndex][2];
        const newPersonRole = this.testimonials[this.currentIndex][3];

        requestAnimationFrame(() => {
            this.isTransitioning = true;

            oldImage.style.transition = `${this.settings.transitionDurationBase}ms ease`;
            newImage.style.transition = `${this.settings.transitionDurationBase}ms ease`;
            this.imageHolder.appendChild(newImage);

            oldQuote.remove();
            this.quoteHolder.appendChild(newQuote);
            newQuote.style.transform = "translateY(1rem)";
            newQuote.style.transition = `transform ${this.settings.transitionDurationBase}ms ease`;
            newQuote.style.opacity = "0";

            oldPersonName.remove();
            this.personNameHolder.appendChild(newPersonName);
            newPersonName.style.transform = "translateY(1rem)";
            newPersonName.style.transition = `transform ${this.settings.transitionDurationBase}ms ease`;
            newPersonName.style.opacity = "0";

            oldPersonRole.remove();
            this.personRoleHolder.appendChild(newPersonRole);
            newPersonRole.style.transform = "translateY(1rem)";
            newPersonRole.style.transition = `transform ${this.settings.transitionDurationBase}ms ease`;
            newPersonRole.style.opacity = "0";

            requestAnimationFrame(() => {
                let startTime = null;

                oldImage.style.margin = "0 0 0 -100%";
                newQuote.style.transform = null;
                newQuote.style.opacity = null;
                newPersonName.style.transform = null;
                newPersonName.style.opacity = null;
                newPersonRole.style.transform = null;
                newPersonRole.style.opacity = null;

                function resetStyle(t) {
                    if (!startTime) {
                        startTime = t;
                    }

                    if (t - startTime < testimonial.settings.transitionDurationBase) {
                        requestAnimationFrame(resetStyle);
                    } else {
                        testimonial.isTransitioning = false;

                        oldImage.remove();
                        oldImage.style.margin = null;
                        oldImage.style.transition = null;

                        newImage.style.transition = null;
                        newQuote.style.transition = null;
                        newPersonName.style.transition = null;
                        newPersonRole.style.transition = null;
                    }
                }

                requestAnimationFrame(resetStyle);
            });
        });
    },
    init() {
        requestAnimationFrame(() => {
            document
                .querySelectorAll(".testimonial__carousel__image img")
                .forEach((imageElement) => {
                    this.testimonials.push([imageElement]);
                    imageElement.remove();
                });

            document.querySelectorAll(".testimonial__quote span").forEach((quoteElement, index) => {
                this.testimonials[index].push(quoteElement);
                quoteElement.remove();
            });

            document
                .querySelectorAll(".testimonial__person__name span")
                .forEach((personNameElement, index) => {
                    this.testimonials[index].push(personNameElement);
                    personNameElement.remove();
                });

            document
                .querySelectorAll(".testimonial__person__role span")
                .forEach((personRoleElement, index) => {
                    this.testimonials[index].push(personRoleElement);
                    personRoleElement.remove();
                });

            this.imageHolder.appendChild(this.testimonials[this.currentIndex][0]);
            this.quoteHolder.appendChild(this.testimonials[this.currentIndex][1]);
            this.personNameHolder.appendChild(this.testimonials[this.currentIndex][2]);
            this.personRoleHolder.appendChild(this.testimonials[this.currentIndex][3]);
        });

        this.nextBtn.addEventListener("click", (e) => this.handleNextClick(e));
        this.prevBtn.addEventListener("click", (e) => this.handlePrevClick(e));

        window.addEventListener("keydown", (e) => {
            if (
                document.activeElement.isEqualNode(document.querySelector("body")) ||
                document.activeElement.parentElement.isEqualNode(this.nextBtn.parentElement)
            ) {
                if (e.key == "ArrowRight") {
                    this.nextBtn.click();
                    this.nextBtn.focus();
                } else if (e.key == "ArrowLeft") {
                    this.prevBtn.click();
                    this.prevBtn.focus();
                }
            }
        });
    },
};

testimonial.init();
