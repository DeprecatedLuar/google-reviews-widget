# Google Reviews Widget

Embeddable Google reviews carousel for Luar's money business.

## React (recommended)

Install:

```bash
npm install github:DeprecatedLuar/google-reviews-widget react-google-reviews
```

> Note: the installed package name is `google-review-widget` (no 's'), even though the repo is `google-reviews-widget`.

Use:

```jsx
import ReviewsWidget from "google-review-widget";

<ReviewsWidget src="/reviews.json" />
```

`src` points to your reviews JSON file served as a static asset (e.g. `public/reviews.json`).

The CSS is imported internally — no need to import `react-google-reviews/dist/index.css` yourself.

## CDN embed

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/style.css" />
<div id="reviews-widget" data-src="/reviews.json"></div>
<script src="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/reviews-widget.js"></script>
```

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
