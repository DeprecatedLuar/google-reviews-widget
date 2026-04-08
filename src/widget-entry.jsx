import { createRoot } from "react-dom/client";
import ReviewsWidget from "./ReviewsWidget.jsx";

function mount() {
  const el = document.getElementById("reviews-widget");
  if (!el) return;
  const src = el.dataset.src;
  createRoot(el).render(<ReviewsWidget src={src} />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
