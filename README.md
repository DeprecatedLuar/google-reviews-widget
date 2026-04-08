# Google Reviews Widget

Embeddable Google reviews carousel for Luar's money business.

## React (recommended)

Install:

```bash
npm install github:DeprecatedLuar/google-reviews-widget react-google-reviews
```

Use:

```jsx
import ReviewsWidget from "google-review-widget";
import "react-google-reviews/dist/index.css";

<ReviewsWidget src="/reviews.json" />
```

`src` points to your reviews JSON file (served as a static asset).

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

Reviews with `"text": null` are filtered out automatically.
