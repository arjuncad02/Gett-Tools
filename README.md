# GETT Tools — Website Redesign

A premium, industrial-grade redesign of the GETT Tools website. Static HTML/CSS/JS — no build step, no dependencies to install. Ready to push straight to GitHub Pages.

## What's in this repo

```
index.html         Home
shop.html           Shop / category page (filters, sort, grid/list view, live search)
product.html        Product detail page (gallery, 360° placeholder, tabs, related products)
about.html          Our story, timeline, manufacturing process, quality, careers
dealers.html        Become a Dealer, dealer map, benefits, application form
support.html        FAQs, warranty & returns, knowledge base
downloads.html       Download Center (catalogues, manuals, warranty forms)
contact.html         Contact form, office info, map
assets/css/style.css Shared design system (all pages)
assets/js/main.js    Shared interactions (all pages)
```

Every page shares the same header (with mega menus), footer, search overlay, quote/dealer request modals, compare bar, and chat widget — so navigation and CTAs work identically no matter which page you land on.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Upload the **contents** of this folder to the repo root — not the folder itself. `index.html` should sit at the repo root, alongside the `assets/` folder.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", pick your branch (usually `main`), and folder `/ (root)`.
5. Save. GitHub will give you a URL like `https://yourusername.github.io/repo-name/` within a minute or two.

No build step, no `npm install` — it's plain HTML/CSS/JS and will work as-is.

## Before you go live — replace placeholder content

This redesign uses realistic placeholder content in a few places that should be swapped for the real thing before launch:

- **Phone / email / address** (footer, Contact page) — currently `1-84-GETT-MORE` / `support@getttools.com` / "North Vancouver, BC" as placeholders.
- **Dealer map pins** (Dealers, Contact pages) — illustrative pins only, not real dealer locations.
- **Download Center files** — the Preview/Download buttons are visual only; wire them up to real PDF URLs once you have them.
- **Forms** (Quote request, Dealer application, Contact) — currently show a front-end "success" state only. Connect them to a form backend (e.g. Formspree, Web3Forms, or your own endpoint) to actually receive submissions.
- **Newsletter signup** — same as above, needs a real email provider hooked up (Mailchimp, Klaviyo, Brevo, etc.)

## Notes on the design

- Signature visual device: asymmetric "chamfered" corners (`clip-path`) on cards/buttons/badges instead of rounded corners — an industrial, CNC-machined-edge motif used throughout.
- Palette: near-black, charcoal, brushed-steel gradient, GETT red only.
- Type: Manrope (display) + Inter (body), loaded from Google Fonts.
- Motion: GSAP + ScrollTrigger (loaded from cdnjs) for scroll reveals, hero split-text, magnetic buttons, counters; everything else is hand-rolled vanilla JS (custom cursor, mega menus, filters, tabs, carousels, accordions).
- All product renders are original inline SVG line-art — no stock photography, so there are no licensing concerns with the visuals as shipped.
