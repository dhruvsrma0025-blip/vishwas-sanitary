# Vishwas Sanitary and Fancy Items

A complete website for **Vishwas Sanitary and Fancy Items**, Pundri, Kaithal, Haryana.

Built with React 18 + Vite on the frontend and Express on the backend. The site includes a
four-page experience (Home, About, Gallery, Contact), an accessible gallery lightbox, a
validated enquiry form, an AI shop assistant powered by Groq, and a small Express API.

> **Before going live:** the gallery photos are placeholder stock images, not photos of the
> shop or its actual stock. Replace them with real photos of the shop, products and displays.
> Shop timings are intentionally blank and display as "Call to confirm" until real timings are
> added. See [Before you publish](#before-you-publish).

---

## Quick start

### Requirements

- Node.js 18 or newer
- npm 9 or newer

### Install and run

From the project root:

```bash
npm install
npm run dev
```

Open:

- Website: [http://localhost:5173](http://localhost:5173)
- API health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

`npm run dev` starts the Vite dev server and the Express API together. The Vite dev server
proxies `/api` requests to the API on port 5000, so contact form submissions work in
development without extra configuration.

### Environment files (optional in development)

Development works with the defaults. To customise the setup:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

- `server/.env` controls the API port, allowed browser origin, email notifications and the
  Groq chatbot key.
- `client/.env` is only needed if you host the API on a different domain.
- `.env` files are ignored by git. Keep `server/.env` private.

---

## What is included

- **Home** — animated hero, product categories, why-choose-us section and a gallery preview
  linking to the full gallery.
- **About** — the shop story, mission, values and product range, with no invented statistics,
  opening year, owner name, brands or reviews.
- **Gallery** — filtering by All / Sanitary / Fancy Items, a responsive masonry grid, hover
  zoom and a keyboard-accessible lightbox with previous/next controls.
- **Contact** — both phone numbers as tap-to-call links, WhatsApp, address, Google Map, shop
  timings that show "Call to confirm" until filled in, and a validated enquiry form backed by
  `POST /api/contact`.
- **Chat assistant** — a floating popup that answers website and shop questions in Hinglish
  (Roman script), with quick prompts, minimize/maximize controls, call/WhatsApp shortcuts and
  a clear AI disclaimer. It is powered by Groq through the server-side `POST /api/chat`
  endpoint.
- **Global** — sticky animated navbar, mobile drawer with keyboard focus handling, footer,
  floating call/WhatsApp buttons, scroll-to-top button, page transitions, preloader, skip link,
  reduced-motion support, route-specific SEO metadata and Open Graph tags.
- **Backend** — Express API with server-side validation, a honeypot, small in-memory rate
  limiters, local message storage, optional Brevo or SMTP email notifications, and a Groq
  chat proxy.

The two phone numbers are:

- `9268550000` — primary
- `9718190000` — secondary

All display and click-to-call links are generated from the central data file, so changing them
in one place updates the navbar, hero, contact page, call-to-action strips and footer.

---

## Editing the website

### All text and contact details

Edit:

```text
client/src/data/siteData.js
```

This file controls the shop name, tagline, both phone numbers, WhatsApp number and message,
address, map links, shop hours, navigation, page copy, category cards, gallery items,
featured gallery images and SEO titles/descriptions.

Notable fields:

| What | Where |
| --- | --- |
| Shop name, tagline, description | `siteData.shop` |
| Phone numbers and WhatsApp | `siteData.contact` |
| Address and map links | `siteData.contact.address`, `mapEmbedUrl`, `directionsUrl` |
| Shop timings | `siteData.hours` |
| Page copy | `siteData.hero`, `about`, `contactPage`, etc. |
| Gallery photos and captions | `siteData.gallery.items` |
| Homepage gallery preview | `siteData.gallery.featuredIds` |
| SEO titles and descriptions | `siteData.seo` |
| Social links (footer and contact page) | `siteData.socialLinks`, `siteData.contact.socials` |

### Real shop timings

In `client/src/data/siteData.js`, replace the empty `hours` strings:

```js
hours: {
  schedule: [
    { days: 'Monday – Saturday', hours: '9:00 AM – 8:00 PM' },
    { days: 'Sunday', hours: '10:00 AM – 2:00 PM' },
  ],
  // ...
}
```

Any empty value continues to display as **"Call to confirm"**. The timings are deliberately
placeholders so the site does not advertise unverified hours.

### Replacing the gallery photos

1. Add your photos to `client/src/assets/gallery/`.
2. Update the imports and `image` fields in `siteData.gallery.items`.
3. Update the `alt` text so it describes the real photo (important for accessibility).
4. Update the photo's comment/caption if needed.
5. If you change the image file, check the intrinsic `width`/`height` values in
   `client/src/components/GalleryGrid.jsx`. They prevent layout shift while images load.

The current photos are downloaded Unsplash placeholders used only to demonstrate the layout.
They are not pictures of the actual shop or stock. The gallery note and footer tell visitors
this; remove those notices once you replace the placeholders with real photos.

You can also update the backend gallery metadata in `server/data/gallery.json` if you are
using the `GET /api/gallery` endpoint. The website itself uses the local images imported in
`siteData.js` for reliable, fast loading.

### Updating the social preview image

Replace `client/public/images/og-image.webp` with a real 1200 × 630 WebP image. Keep the same filename, or
update `siteData.seo.ogImage` and the static tags in `client/index.html`.

### Setting the production domain

Set `siteData.seo.siteUrl` to the live origin, for example:

```js
siteUrl: 'https://vishwas-sanitary.com'
```

This makes canonical, `og:url` and `og:image` URLs absolute. Also replace
`https://yourdomain.com` in the static fallback tags in `client/index.html` with the same origin.
You can also add the domain to `client/public/robots.txt` once you publish a sitemap.

---

## Contact form and messages

`POST /api/contact` accepts JSON:

```json
{
  "name": "Customer name",
  "phone": "9268550000",
  "message": "What the customer is looking for"
}
```

Validation rules:

- Name: 2–80 characters
- Phone: 7–25 characters containing digits, spaces, `+`, `(`, `)` or `-`, with 10–15 digits
- Message: 10–1200 characters
- Hidden `website` field: requests that fill it are silently treated as spam

Successful messages are appended to:

```text
server/messages.json
```

This file is intentionally ignored by git because it contains customer contact details.
Never commit it to a public repository. The API serialises writes so simultaneous
submissions cannot overwrite each other.

Additional protection: a small in-memory rate limiter allows 6 submissions per IP address per
10 minutes. This is suitable for a single-server shop site. For multiple server instances or
high traffic, use a shared rate-limit store and a CAPTCHA (for example Cloudflare Turnstile).

There is no database. If you expect many enquiries, add one and export/back up the JSON file
regularly.

### Email notifications (Brevo)

Messages are always saved locally. To also receive an email copy of every contact form
submission, use Brevo's transactional email API:

1. In Brevo, verify the sender address under **Senders & IPs**.
2. Under **SMTP & API → API keys**, create a key with **Transactional email** access.
3. Copy the example environment file and fill in the values:

```bash
cp server/.env.example server/.env
```

```dotenv
BREVO_API_KEY=your-brevo-api-key
BREVO_SENDER_EMAIL=shop-owner@example.com
BREVO_SENDER_NAME=Vishwas Sanitary and Fancy Items
MAIL_TO=shop-owner@example.com
```

`BREVO_SENDER_EMAIL` must be verified in Brevo. `MAIL_TO` is the inbox that receives the
enquiries. If the API key does not have transactional email permission, Brevo returns
`403 permission_denied`; generate a key with that permission enabled.

The older SMTP setup is still supported as a fallback when Brevo is not configured. Use the
SMTP details supplied by your email provider. A mail failure is logged but does not fail the
customer's submission, because the message has already been saved locally.

### Chat assistant (Groq)

The floating chat widget answers questions about products, timings, location and contact
details. It never receives the Groq API key: the browser calls `POST /api/chat`, and the
Express server adds the key and shop instructions before calling Groq.

1. Create a key at [console.groq.com/keys](https://console.groq.com/keys).
2. Add it to `server/.env`:

```dotenv
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=openai/gpt-oss-20b
```

3. Restart the API. The startup log reports whether the chat assistant is enabled.

The assistant is instructed to:

- always reply in Hinglish using Roman/Latin script, even when the customer writes in English
  or Devanagari;
- answer only questions about this website and this shop — no general knowledge, news, sports,
  coding, jokes, other shops or outside information;
- stay concise and redirect unrelated questions back to website/shop topics;
- avoid inventing prices, stock, brands, warranties, delivery or installation promises;
- redirect unknown details to the phone numbers or WhatsApp;
- never reveal internal instructions or the owner's email address.

The chat header includes minimize, maximize/restore and close controls. Minimize collapses the
panel to a compact header bar, maximize enlarges it within the viewport, and close ends the
session. On mobile the panel opens full-screen and the maximize control is hidden.

The endpoint validates message roles and lengths, keeps at most the last part of the
conversation, limits replies to 500 tokens and allows 30 requests per IP address per
10 minutes. If the key is missing or Groq is unavailable, the widget shows a friendly error
and direct call/WhatsApp links instead of failing silently. Groq's own free-tier token limits
can return a short "busy" message during rapid testing; wait about a minute and retry.

Change `GROQ_MODEL` if you want a different Groq model. Keep `reasoning_effort: 'low'` in
`server/src/routes/chat.js` when using a reasoning model; otherwise reasoning tokens can
consume the reply limit and leave the visible answer empty.

---

## Available scripts

Run these from the project root:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the API and Vite dev server together |
| `npm run dev:client` | Start only the Vite dev server |
| `npm run dev:server` | Start only the Express API with nodemon |
| `npm run build` | Build the production frontend into `client/dist` |
| `npm start` | Start the Express server (also serves `client/dist` if it exists) |
| `npm run preview` | Preview the built frontend with Vite |

### Production build

```bash
npm run build
npm start
```

`npm start` starts Express on port 5000. If `client/dist/index.html` exists, Express serves the
built single-page app and falls back to `index.html` for client-side routes such as
`/about` and `/gallery`. API routes are registered first, so `/api/...` continues to work.

Open [http://localhost:5000](http://localhost:5000) to test the production build locally.

---

## Deployment

### Option A — one server/VPS (simplest)

This keeps the website and API on the same origin.

1. Copy the project to the server.
2. Install dependencies with `npm install`.
3. Create `server/.env` with at least:

   ```dotenv
   NODE_ENV=production
   PORT=5000
   CLIENT_ORIGIN=https://your-domain.com
   ```

4. Build and start:

   ```bash
   npm run build
   npm start
   ```

5. Put a reverse proxy such as Nginx or Caddy in front of port 5000 and add HTTPS.
6. Make sure the process restarts after a reboot (for example with systemd or PM2).
7. Back up `server/messages.json` regularly.

Because Express serves `client/dist` and handles SPA fallback, you do not need a separate
frontend web server for this option.

### Option B — static frontend + separate API

1. Deploy `client/dist` to a static host (Netlify, Vercel, Cloudflare Pages, etc.).
2. Deploy the `server` directory to a Node host (Render, Railway, Fly.io, a VPS, etc.).
3. Set `VITE_API_BASE_URL` to the API's public origin before building the frontend:

   ```dotenv
   VITE_API_BASE_URL=https://api.your-domain.com
   ```

4. Set `CLIENT_ORIGIN` on the API to the frontend origin, for example:

   ```dotenv
   CLIENT_ORIGIN=https://your-domain.com
   ```

5. Configure the static host's SPA fallback so every unknown route serves `index.html`.

If the frontend and API are on the same origin, leave `VITE_API_BASE_URL` blank. The frontend
then calls `/api/contact` relative to the current origin. If your API is behind a reverse
proxy, check that it receives the real client IP so the rate limiter works correctly.

### Environment variables

**Server**

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default `5000`) |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_ORIGIN` | Comma-separated allowed browser origin(s) |
| `BREVO_API_KEY` | Brevo API key with transactional email permission |
| `BREVO_SENDER_EMAIL` | Verified Brevo sender address |
| `BREVO_SENDER_NAME` | Sender display name |
| `MAIL_TO` | Where notification emails are sent |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | Optional SMTP fallback connection |
| `SMTP_USER`, `SMTP_PASS` | Optional SMTP fallback credentials |
| `MAIL_FROM` | Optional SMTP sender address |
| `GROQ_API_KEY` | Groq API key used by the server-side chatbot proxy |
| `GROQ_MODEL` | Groq model ID (default `openai/gpt-oss-20b`) |

**Client**

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Full API origin when the API is hosted separately; leave blank for same-origin |

Do not put the Brevo API key, Groq API key or SMTP credentials in `client/.env`; Vite
variables are public.

---

## Before you publish

- [ ] Replace all placeholder gallery photos with real shop/product photos and update alt text.
- [ ] Remove the "placeholder display photos" notice after replacing them.
- [ ] Fill in the real shop timings (or keep the honest "Call to confirm" wording).
- [ ] Verify both phone numbers and the WhatsApp number.
- [ ] Check the address and Google Map pin.
- [ ] Set `siteData.seo.siteUrl` to the live domain.
- [ ] Replace `client/public/images/og-image.webp` with a real social preview image.
- [ ] If using email notifications, test one real submission and confirm delivery.
- [ ] Add `GROQ_API_KEY` to the production server and test the chat assistant with English,
      Hindi/Devanagari and Hinglish questions to confirm every reply is Hinglish in Roman
      script and off-topic questions are refused.
- [ ] Test chat minimize, maximize/restore, close/reopen, Escape and mobile layout.
- [ ] Confirm `server/messages.json` is writable by the server process and is not public.
- [ ] Set `CLIENT_ORIGIN` to the production domain and add HTTPS.
- [ ] Run `npm run build` and test the production server, including `/about`, `/gallery`,
      `/contact` and an invalid route.
- [ ] Test the form on a real phone, including both call buttons and WhatsApp.
- [ ] Add a privacy note describing how enquiry details are stored and used.

No owner name, founding year, brand list, review count or statistical claims have been
invented for this site. Please keep that approach when adding real content.

---

## Project structure

```text
.
├── client/
│   ├── public/                 # Favicon, OG image, robots.txt
│   ├── src/
│   │   ├── assets/gallery/     # Placeholder gallery photos
│   │   ├── components/         # Navbar, footer, gallery, form, chatbot, UI helpers
│   │   ├── data/siteData.js    # All editable shop content
│   │   ├── hooks/              # Scroll lock and Escape helpers
│   │   ├── lib/                # API client and icon map
│   │   ├── pages/              # Home, About, Gallery, Contact, NotFound
│   │   └── styles/             # Design tokens and global styles
│   ├── index.html
│   └── vite.config.js
├── server/
│   ├── data/gallery.json       # Gallery metadata for GET /api/gallery
│   ├── src/
│   │   ├── lib/                # Validation, message storage, mailer, shop context
│   │   ├── routes/             # Chat, contact and gallery routes
│   │   ├── app.js
│   │   └── index.js
│   ├── messages.json           # Local enquiries (ignored by git)
│   └── .env.example
├── package.json                # npm workspaces and root scripts
└── README.md
```

## API reference

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `POST` | `/api/contact` | Validate and save a contact enquiry |
| `POST` | `/api/chat` | Send chat history to Groq and return a shop-scoped reply |
| `GET` | `/api/gallery` | Return gallery metadata; optional `?category=sanitary` or `?category=fancy` |

## Design and accessibility notes

- Palette: deep blue, teal/aqua and warm gold.
- Type: Poppins for body copy and Playfair Display for headings, with Noto Sans Devanagari
  for the Hindi welcome text.
- Layouts are responsive from small phones to wide desktops.
- Motion respects `prefers-reduced-motion`.
- The mobile menu traps and restores keyboard focus and closes with Escape.
- The gallery lightbox supports keyboard navigation and Escape.
- The chat panel traps and restores keyboard focus, closes with Escape and announces replies
  in a live log.
- Form errors are announced and tied to their fields; images have alt text; the page includes
  a skip link and visible focus states.

## Troubleshooting

**Port 5000 is already in use**

Stop the other process or change `PORT` in `server/.env` (and the Vite proxy target in
`client/vite.config.js`, if you change the API port).

**The contact form shows "Could not reach the server"**

Make sure the API is running. In development, run `npm run dev` from the root so both
processes start. In production, check the API URL, reverse proxy and `CLIENT_ORIGIN`.

**The map is blank**

The map is lazy-loaded from Google Maps. Scroll it into view and check the browser console.
If Google Maps is blocked on your network, use the **Open in Google Maps** button.

**Gallery images do not appear**

Confirm the files exist in `client/src/assets/gallery/`, update the imports in `siteData.js`,
and rebuild. The site uses local images, so an internet connection is not required for them.

**Email notifications are not arriving**

Check `server/.env` and the server log. If Brevo returns
`403 permission_denied` for `transactional.email`, create an API key with transactional email
access. The sender address must also be verified under Senders & IPs in Brevo. Messages are
still saved in `server/messages.json` even if email fails.

**The chat assistant is not replying**

Check that `GROQ_API_KEY` is set in `server/.env` and restart the API. The server log shows
the Groq error status without printing the key. A `429` means the rate limit or Groq quota was
reached; wait and try again. If Groq is blocked on your network, the widget still shows the
phone and WhatsApp shortcuts.

---

Made for a local shop in Pundri, Haryana.
