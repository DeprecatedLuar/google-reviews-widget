# Google Reviews Widget

Embeddable Google reviews carousel for Luar's money business.

## CDN Embed (Recommended)

For static sites or any HTML page:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/style.css" />
<div id="reviews-widget" data-src="/reviews.json"></div>
<script src="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/reviews-widget.js"></script>
```

Replace `/reviews.json` with the path to your reviews JSON file.

## React Component

For React projects, install as a package:

```bash
npm install github:DeprecatedLuar/google-reviews-widget
```

> Note: the installed package name is `google-review-widget` (no 's'), even though the repo is `google-reviews-widget`.

Use:

```jsx
import ReviewsWidget from "google-review-widget";

<ReviewsWidget src="/reviews.json" />
```

`src` points to your reviews JSON file served as a static asset (e.g. `public/reviews.json`).

The CSS is bundled with the component — no additional imports needed.

## Versioning

**CDN version control:**
- `@latest` - Automatically updates to the newest tagged release
- `@v0.0.2` - Pins to a specific version (stable, never changes)

Example with pinned version:
```html
<script src="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@v0.0.2/dist/reviews-widget.js"></script>
```

Use `@latest` for convenience, or pin to a specific version for stability.

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
