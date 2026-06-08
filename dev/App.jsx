import ReviewsWidget from "../src/ReviewsWidget.jsx";

export default function App() {
  return (
    <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Google Reviews Widget - Format Tests</h1>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Scraper Format</h2>
        <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
          Format: reviewer_name, rating, content, review_url, reviewer_photo_url
        </p>
        <ReviewsWidget src="/reviews-scraper.json" />
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Original Format</h2>
        <p style={{ color: "#666", marginBottom: "1rem", fontSize: "0.9rem" }}>
          Format: name/authorName, rating/stars, text, reviewUrl/authorUrl
        </p>
        <ReviewsWidget src="/reviews.json" />
      </section>
    </div>
  );
}
