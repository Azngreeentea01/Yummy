# Yummy

Cached local visual build for the Yummy Asian food discovery website.

## Run on Windows / Ryzen VM

1. Clone the repo, preferably to `E:\Projects\Yummy`
2. Double-click `start-yummy.bat`
3. Open `http://localhost:8080`

This build intentionally uses a cached local restaurant/menu dataset and locally stored generated visual assets. It makes no paid live restaurant, map, rating, or menu API calls.

## Pages

- `index.html` — homepage / nearby discovery
- `results.html` — search, cuisine/open/rating filters, list-map linkage
- `restaurant.html` — detail/menu page driven by restaurant ID
- `saved.html` — saved restaurants

## V3 final-pass features

- One cached restaurant ID drives list card, map pin, saved state, ratings, menu, and detail page
- Multi-word search + cuisine/open/rating filtering
- Sorting by best match, distance, or rating
- Working Saved page using browser localStorage
- Working Menu / Overview / Reviews / Photos tabs
- Mobile List / Map switch and navigation drawer
- Manual location fallback if geolocation is blocked
- Empty-state handling and keyboard focus support

QA target: Chromium/Chrome desktop and mobile responsive layouts.
