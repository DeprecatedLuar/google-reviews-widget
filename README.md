# Google Reviews Widget

Self-contained embeddable Google reviews carousel. Drop into any website with zero dependencies.

## Features

- **Standalone**: Bundles React + all dependencies (210KB gzipped: ~64KB)
- **Zero config**: Just add 2 lines of HTML
- **Responsive**: Mobile-first design with smart breakpoints
- **Custom carousel**: React Slick with Google Reviews styling
- **Smart pagination**: Dots for <100 reviews, counter for ≥100

## CDN Embed (Primary Usage)

Drop this into any HTML page:

```html
<!-- 1. Load stylesheet -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/style.css" />

<!-- 2. Add widget container -->
<div id="reviews-widget" data-src="/reviews.json"></div>

<!-- 3. Load widget script -->
<script src="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/reviews-widget.js"></script>
```

Replace `/reviews.json` with the path to your reviews JSON file (can be relative or absolute URL).

**That's it.** No npm install, no build step, no React on the host page required.

## Direct Import (React Projects)

If you're already using React 18.3+, you can import the component directly:

```jsx
import ReviewsWidget from "google-review-widget";

<ReviewsWidget src="/reviews.json" />
```

Install from GitHub:
```bash
npm install github:DeprecatedLuar/google-reviews-widget
```

> **Note**: Package name is `google-review-widget` (singular), repo is `google-reviews-widget` (plural).

## Versioning

**CDN version control:**
- `@latest` - Automatically updates to newest tagged release (convenient, but can break)
- `@v1.0.2` - Pins to a specific version (recommended for production)

Example with pinned version:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@v1.0.2/dist/style.css" />
<script src="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@v1.0.2/dist/reviews-widget.js"></script>
```

**Recommendation**: Use `@latest` during development, pin to a specific version for production deploys.

## reviews.json format

```json
[
  {
    "name": "Jane Doe",
    "stars": 5,
    "text": "Great service!",
    "reviewUrl": "https://maps.google.com/..."
  }
]
```

- `reviewUrl` — the direct link to the Google review; used as the review ID internally
- Reviews with `"text": null` are filtered out automatically
- **An empty array (`[]`) renders only the carousel arrows with no cards** — always have at least one review entry
