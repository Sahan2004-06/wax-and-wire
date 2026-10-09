# AI Chat Log: Wax & Wire (CSC 436, Project 2)

**Student:** Sahan Kumarage
**AI tool:** Claude (Anthropic)
**Date:** October 1, 2026

This log records how I used an AI assistant on this project, in line with the
course's AI-assisted coding rules. My messages are copied word for word. Claude's
replies are condensed, and the code it wrote is described rather than pasted,
because the code itself is in this repository.

---

### 1. Project idea

**Me:**
> A website that shows Artists, and their music's physical copy and digital copy and you would be able to purchase whichever one they like and they are able to download it but without letting them able to share it.

**Claude:**
Started building the project with Vite + React and set it up to meet the Project 2
objectives:

- Created the Vite React project ("Wax & Wire") with five fictional artists in
  `src/data/artists.js`. Each album has a physical format (vinyl, CD or cassette,
  with stock) and a digital format.
- Split the UI into components in separate files: `Header`, `SearchBar`,
  `ArtistList`, `ArtistCard`, `AlbumCover`, `ArtistDetail`, `AlbumCard`, `Cart`,
  `Library` and `LibraryItem`.
- Kept the shared state (`view`, `search`, `genre`, `selectedArtistId`, `cart`,
  `isCartOpen`, `library`, `lastOrder`) in `App.jsx` and passed it down through props.
- Added a controlled search input and a controlled buyer name input at checkout.
- Wrote `src/utils/license.js` for the "download but don't share" requirement.
  Claude explained that a website can't truly stop a downloaded file from being
  copied, so it used the same approach real stores use:
  - Every download is a WAV file with the buyer's name and a unique license key
    written into its metadata (a watermark), so a leaked file traces back to one
    purchase.
  - Each license allows a limited number of downloads (3).

### 2. Extra features (sent while Claude was still building)

**Me:**
> I would like to add a cool feature where the cursor becomes a cd icon when it hovers over the website. I want to make it live as much as it can, and if we are able to have a neon endless sunset on the background and then when you hover over the album it's artwork get pushed to the background and when the cursor moves away it resets back to the neon endless sunset.

**Claude:**
Added these features:

- **`CdCursor.jsx`:** a spinning CD that follows the mouse. It spins faster over
  clickable elements. It uses `useRef` and `useEffect` to update the position
  directly, so the app doesn't re-render on every mouse movement. It's turned off
  on touch screens.
- **`Background.jsx`:** a neon synthwave sunset with a striped sun, a glowing
  horizon and an endlessly scrolling grid floor, all done in CSS.
- **Hover takeover:** a new `hoveredCover` state in `App`. Hovering over an artist
  or album card sets it, and `Background` fades that album's artwork in. Moving
  away sets it back to `null`, so the sunset returns. This is also an example of
  lifted state.
- Respects "reduced motion" settings by turning off the animations.

Claude tested the site in a headless browser and fixed two issues it found:

- The sunset was hidden behind the page background.
- The artist cards weren't lining up.

It also improved text contrast over the sun and confirmed the full purchase and
download flow works. The watermark in the downloaded file read
"Licensed to Sahan Kumarage | Key WW-… | Personal use only, do not share".
Finally, it wrote the README with a table mapping each rubric requirement to the
code, and sent the project as a zip.

Claude also reminded me that I have to be able to explain every line before
submitting, especially `license.js` and `CdCursor.jsx`, and that I should commit
in stages instead of all at once.

### 3. Viewing it locally

**Me:**
> would you be able to tell me how I can view it before uploading any. I want to make sure it looks good.

**Claude:**
Explained how to run it locally:

1. Check Node.js with `node -v`.
2. Unzip the project and open its folder.
3. Run `npm install`, then `npm run dev`, and open `http://localhost:5173/`.

It also listed what to test, and how to check the production build with
`npm run build` and `npm run preview`.

### 4. Errors

**Me:** *(screenshot of the VS Code terminal showing `npm error enoent Could not read package.json`)*
> Yeah I think something is coming out wrong. And also when I went live through the live extension it doesn't show anything but a white screen

**Claude:**
- **The npm error:** the terminal was in the wrong folder. Unzipping had created a
  `wax-and-wire` folder inside another `wax-and-wire` folder, so I needed to `cd`
  into the inner one.
- **The white screen:** Live Server can't run React/JSX, because the code has to
  be compiled by Vite first. For this project I should use `npm run dev` instead
  of Live Server.

**Me:**
> Okay it worked now.

**Claude:**
Walked through the next steps:

1. Check where the git repo is.
2. Commit in stages.
3. Push to GitHub.
4. Deploy on Netlify (`npm run build`, publish directory `dist`).
5. Add the live URL to the README and test both links in incognito.

### 5. Deadline

**Me:**
> oh no it's not due tonight. We have till 8th, which is like 7 days away.

**Claude:**
Suggested confirming the date on Brightspace, since the brief says October 1.
Then suggested using the extra time to:

- Spread the commits over several days.
- Study each file before committing it.
- Deploy early to catch problems.
- Customize the project to make it more my own.

