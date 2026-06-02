# Google Reviews Widget

Self-contained embeddable Google reviews carousel. Drop into any website with zero dependencies.

## Features

- **Standalone**: Bundles React + all dependencies (210KB gzipped: ~64KB)
- **Zero config**: Just add 2 lines of HTML
- **Responsive**: Mobile-first design with smart breakpoints
- **Custom carousel**: React Slick with Google Reviews styling
- **Smart pagination**: Dots for <100 reviews, counter for ≥100

## Usage

**Step 1**: Create a `reviews.json` file and upload it to your site (e.g., in `/public/` or `/assets/`)

**Step 2**: Add this to your HTML where you want the widget to appear:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/style.css" />
<div data-reviews-widget="/reviews.json"></div>
<script src="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@latest/dist/reviews-widget.js"></script>
```

Replace `/reviews.json` with the actual path to your JSON file.

**That's it.** No npm install, no build step, no React required on your page.

### Multiple Widgets on Same Page

You can have multiple widgets with different review sources:

```html
<div data-reviews-widget="/location-a-reviews.json"></div>
<div data-reviews-widget="/location-b-reviews.json"></div>
```

### Using in React/Vue/Angular Projects

The widget works in any framework. Just include the script tag in your `index.html` or use it in components:

```jsx
// React example
function MyComponent() {
  return (
    <>
      <div data-reviews-widget="/reviews.json"></div>
      {/* Widget auto-mounts when script loads */}
    </>
  );
}
```

Make sure the CSS and JS are loaded in your HTML (see Step 2 above).

### Backward Compatibility

The old syntax still works:

```html
<div id="reviews-widget" data-src="/reviews.json"></div>
```

## Version Pinning (Optional)

Using `@latest` (shown above) automatically gets the newest version. If you need stability, pin to a specific version:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@v1.0.3/dist/style.css" />
<div data-reviews-widget="/reviews.json"></div>
<script src="https://cdn.jsdelivr.net/gh/DeprecatedLuar/google-reviews-widget@v1.0.3/dist/reviews-widget.js"></script>
```

## JSON File Format

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
