document.addEventListener("DOMContentLoaded", () => {

  const initCarousels = () => {
    const entries = document.querySelectorAll(".portfolio-entry");

    entries.forEach(entry => {
      if (entry.dataset.carouselInit) return;
      entry.dataset.carouselInit = "true";

      const carousel = entry.querySelector(".carousel");
      const prevBtn = entry.querySelector(".prev");
      const nextBtn = entry.querySelector(".next");
      const counter = entry.querySelector(".list-counter");

      if (!carousel || !prevBtn || !nextBtn || !counter) return;

      const slides = carousel.querySelectorAll("li");
      const total = slides.length;

      if (!total) return;

      let currentIndex = 0; // zero-based

      const updateCounter = () => {
        counter.textContent = `${currentIndex + 1} / ${total}`;
      };

      const getSlideWidth = () =>
        slides[0].getBoundingClientRect().width || 0;

      const scroll = direction => {
        const slideWidth = getSlideWidth();
        if (!slideWidth) return;

        currentIndex = Math.min(
          total - 1,
          Math.max(0, currentIndex + direction)
        );

        if ("scrollBehavior" in document.documentElement.style) {
          carousel.scrollTo({
            left: currentIndex * slideWidth,
            behavior: "smooth"
          });
        } else {
          carousel.scrollLeft = currentIndex * slideWidth;
        }

        updateCounter();
      };

      // Initial render
      updateCounter();

      prevBtn.addEventListener("click", () => scroll(-1));
      nextBtn.addEventListener("click", () => scroll(1));

      // Optional: sync index if user swipes
      carousel.addEventListener("scroll", () => {
        const slideWidth = getSlideWidth();
        if (!slideWidth) return;

        currentIndex = Math.round(carousel.scrollLeft / slideWidth);
        updateCounter();
      });
    });
  };

  // Initial load
  initCarousels();

});