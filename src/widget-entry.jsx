import { createRoot } from "react-dom/client";
import ReviewsWidget from "./ReviewsWidget.jsx";

function mount() {
  // Support both old id="reviews-widget" and new data-reviews-widget attribute
  const elements = document.querySelectorAll('[data-reviews-widget], #reviews-widget');

  elements.forEach(el => {
    // Prefer data-reviews-widget value, fallback to data-src
    const src = el.dataset.reviewsWidget || el.dataset.src;
    if (src) {
      createRoot(el).render(<ReviewsWidget src={src} />);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
