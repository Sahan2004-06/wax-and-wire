# Wax & Wire

A neon synthwave record store built with React and Vite. Browse artists, pick a
physical copy (vinyl, CD, cassette) or a digital copy of each album, and check out.
Digital purchases land in **My Library**, where each download is licensed to the
buyer: the file is watermarked with their name and a unique license key, and each
license allows a limited number of downloads.

Extras: a spinning CD cursor that follows the mouse (and spins faster over anything
clickable), and an endless neon sunset background that gives way to an album's
artwork while you hover over it.

https://wax-and-wire.netlify.app

## Run locally

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Deploy (Netlify)

Build command `npm run build`, publish directory `dist` (also set in `netlify.toml`).

## How the React requirements are met

| Requirement | Where |
| --- | --- |
| 5+ components in separate files | `src/components/` (12 components) |
| Props | `ArtistCard`, `AlbumCard`, `Cart`, `LibraryItem`, `Background`, and more |
| 3+ pieces of `useState` | `App.jsx`: view, search, genre, selected artist, cart, cart open, library, last order, hovered cover; `AlbumCard`: format; `Cart`: buyer name |
| Lists with keys | Artists (`artist.id`), albums (`album.id`), cart items (`albumId:format`), library (`licenseKey`), genres |
| Conditional rendering | Store vs. library view, cart drawer, sold out / owned / in cart button states, order confirmation, hover artwork |
| Controlled inputs | Search box (`SearchBar`), buyer name (`Cart`) |
| Lifted state | `cart` lives in `App` and is shared by `Header` (count), `AlbumCard` (in cart status) and `Cart`; `hoveredCover` is set by the cards and read by `Background` |

## About the "no sharing" protection

This is a front-end-only demo, so it can't truly stop someone from copying a file
once it's on their computer (no web store can). It uses the approach real stores
use to discourage sharing: per-buyer watermarking that traces any leaked file back
to one purchase, and a download limit per license. A production version would also
generate files on a server and hand out short-lived signed download links.
