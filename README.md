# Google Reviews Widget

Embeddable Google reviews carousel for Luar's money business.

## Embed

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/style.css" />
<div id="reviews-widget" data-src="/reviews.json"></div>
<script src="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/reviews-widget.js"></script>
```

`data-src` points to your reviews JSON file.

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
