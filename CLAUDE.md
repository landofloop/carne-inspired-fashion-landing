# CORPO CALIENTE - Fashion Landing Page

## What this project is

A bold, artistic multi-page site for a fictional fashion brand called **CORPO CALIENTE**. The brand sells graphic clothing with a provocative, provocative, and bold aesthetic. Inspired by the layout and identity of [Carne Bollente](https://www.carnebollente.com/). The goal is for visitors to explore the collection, feel the brand identity, and shop products easily.

The site is live at: **https://landofloop.github.io/carne-inspired-fashion-landing/**

GitHub repo: **https://github.com/landofloop/carne-inspired-fashion-landing**

## Folder structure

```
carne-inspired-fashion-landing/
├── index.html                    # Landing/home page (all editorial sections)
├── shop.html                     # Shop page (full catalog with filters & sort)
├── style.css                     # Shared styling (responsive, animations, layout)
├── shop.css                      # Shop-specific styles (filters bar, grid, badges)
├── script.js                     # Landing page JS (scroll animations, mobile menu, quick-add)
├── shop.js                       # Shop page JS (filtering, sorting, quick-add, load more)
├── CLAUDE.md                     # This file
└── .github/
    └── workflows/
        └── deploy.yml            # GitHub Actions workflow for GitHub Pages deployment
```

No build tools, no frameworks, no dependencies. Pure HTML + CSS + JS. This is intentional — the owner does not code and wants things simple.

## What each file does

### `index.html`
The landing/home page. Contains all editorial sections (see below), inline SVG icons for the header (search, account, wishlist, cart), and links to Google Fonts and the stylesheet/script. Nav links connect to `shop.html`.

### `shop.html`
Full shop/catalog page with 24 products. Features a "Shop All" hero title, sticky filter bar with category pill buttons (All, Tees, Hoodies, Shirts, Tanks, Bottoms, Accessories), sort dropdown (Featured, Price Low/High, Newest), a 4-column product grid with badges ("New", "Hot"), and a "Load More" button. Same header/footer as the landing page.

### `style.css`
Shared visual styling used by both pages. Uses CSS custom properties (`:root` variables), CSS Grid for layouts, `aspect-ratio` for image containers, `@keyframes` for the scrolling announcement bar, and three responsive breakpoints (1024px, 768px, 480px). BEM-style class naming throughout (e.g. `.product-card__image-wrap`).

### `shop.css`
Shop-page-specific styles: active nav underline, shop hero title, sticky filter/sort bar with pill buttons and custom dropdown arrow, shop grid layout, product badges (New in black, Hot in red accent), load-more button, no-results state, and responsive overrides (3-col on tablet, 2-col on mobile, horizontally scrollable filter pills).

### `script.js`
Landing page JS. Three features:
1. **Scroll fade-in animations** — IntersectionObserver adds `.visible` class to product cards and editorial blocks as they enter the viewport.
2. **Mobile menu toggle** — hamburger button toggles `.mobile-open` on the nav.
3. **Quick Add to cart** — clicking "Quick Add" on a product increments the cart badge counter and shows "Added!" feedback for 1.2 seconds.

### `shop.js`
Shop page JS. Features:
1. **Category filtering** — pill buttons filter products by `data-category` attribute. Active filter gets filled black style.
2. **Sorting** — dropdown sorts visible products by price (asc/desc) or newest (badges). DOM reorders on sort.
3. **Scroll fade-in** — same IntersectionObserver pattern as landing page.
4. **Quick Add** — same cart badge increment + "Added!" feedback.
5. **Load More** — simulated button that disables on click (placeholder for future pagination).

### `.github/workflows/deploy.yml`
GitHub Actions workflow that deploys the site to GitHub Pages on every push to `master`. Uses `actions/upload-pages-artifact` to upload the root directory as a static site.

## Design choices

### Colors (CSS custom properties)
| Variable    | Value      | Usage                              |
|-------------|------------|------------------------------------|
| `--bg`      | `#f5f3f0`  | Off-white background (warm tone)   |
| `--text`    | `#1a1a1a`  | Near-black for text and UI         |
| `--accent`  | `#e63946`  | Red, used for cart badge           |
| `--muted`   | `#777`     | Grey for prices and secondary text |

### Fonts (Google Fonts)
- **Space Grotesk** (400, 500, 600, 700) — body font, nav, product names, all UI text. Modern geometric sans-serif.
- **Instrument Serif** (regular, italic) — display font for the logo and the big "YOU ARE HOT" typography statement. Editorial, elegant contrast.

### Layout principles
- **Max-width 1600px** centered container for all sections.
- **CSS Grid** everywhere: 2-column hero, 4-column product grids (collapses to 2 on tablet/mobile), 2-column editorial splits, 4-column footer.
- **Tight 4px gaps** between editorial images (magazine-style density).
- **Aspect ratios**: hero images 4:5, product cards 5:6, editorial blocks 4:5.
- Images come from **Unsplash** (placeholder URLs with `?w=` and `&h=` params for sizing). All fashion/editorial subjects.

### Visual style
- Clean, light background so bold imagery stands out.
- Minimal UI but visually loud content — the products and editorial photos carry the energy.
- All text is uppercase with generous letter-spacing (0.1em–0.15em) for a fashion-label feel.
- Subtle hover effects: images scale 1.03–1.05 on hover, "Quick Add" bar slides up from the bottom of product cards.
- Scroll-triggered fade-in animations (opacity 0 → 1, translateY 20px → 0).
- Scrolling announcement bar with infinite CSS animation.

### Typography statements
Bold, provocative slogans used as standalone visual sections:
- `[FEEL THE HEAT]` — section label for a statement collection
- `YOU ARE HOT →` — large serif typography with a "JOIN THE COMMUNITY" CTA button

## Pages

The site has two pages:
- **index.html** — Landing/home page (editorial-focused, brand identity)
- **shop.html** — Shop page (full catalog, filtering, sorting)

Both share the same header, footer, announcement bar, and base styles.

## Landing page sections (top to bottom)

1. **Announcement Bar** — black strip with scrolling "FREE SHIPPING ON ORDERS OVER €100" text
2. **Header** — sticky, with left nav (New In, Shop, Search icon), centered logo (CORPO CALIENTE), right icons (Account, Wishlist, Cart with badge)
3. **Hero** — two large side-by-side editorial model images (collaboration callout on left, [NEW ARRIVALS] tag on right)
4. **Product Grid 1** — 4 products: Sadao's Dream (95€), Echoes of Eros (195€), Heatwave Tango (120€), In Blue (145€ with color dots)
5. **Editorial Split** — two full-width editorial images with [ICONIC PRINTS] and [ITALIANO À CR] labels
6. **Product Grid 2** — 4 products: Benefits with Friends (85€), Lover Pants Gone Wild (210€), How I Met Your Father (145€), Rex Hoodie (185€ with color dots)
7. **Statement Section** — two side-by-side editorial images + [FEEL THE HEAT] label
8. **Product Grid 3** — "Feel the Heat" collection: Sounds Gay I'm In (85€), Hot Steps (25€ socks), Clean Slate (85€), Sun Kissed Tank (75€)
9. **Big Typography Statement** — "YOU ARE HOT →" in giant serif type + "JOIN THE COMMUNITY" button + editorial image with [@CORPOCALIENTE] tag
10. **Footer** — 4-column: Help (FAQ, Contact, Shipping, Size Guide), Customer Care (Account, Track Order, Gift Cards), Company (About, Terms, Privacy, Careers), Newsletter (email signup + Instagram/TikTok icons). Bottom bar has payment icons (VISA, MC, AMEX, PP) and copyright.

## Shop page sections (top to bottom)

1. **Announcement Bar** — same as landing page
2. **Header** — same as landing, "Shop" link has active underline
3. **Shop Hero** — centered "Shop All" in large serif + product count
4. **Filter & Sort Bar** — sticky below header. Category pill buttons (All, Tees, Hoodies, Shirts, Tanks, Bottoms, Accessories) + sort dropdown (Featured, Price Low→High, Price High→Low, Newest)
5. **Product Grid** — 4-column grid with 24 products. Each card has image, name, price, hover Quick Add, and optional badge (New/Hot) or color dots
6. **Load More** — centered button + "Showing X of 48 products" text
7. **Footer** — same as landing page

## Product catalog (24 items)

| Name                      | Price  | Category    | Badge |
|---------------------------|--------|-------------|-------|
| Sadao's Dream             | 95€    | Tees        | New   |
| Echoes of Eros            | 195€   | Hoodies     |       |
| Heatwave Tango            | 120€   | Tanks       |       |
| In Blue                   | 145€   | Shirts      |       |
| Benefits with Friends     | 85€    | Tees        |       |
| Lover Pants Gone Wild     | 210€   | Bottoms     | Hot   |
| How I Met Your Father     | 145€   | Tees        |       |
| Rex Hoodie                | 185€   | Hoodies     |       |
| Feel the Heat        | 85€    | Tees        | New   |
| Hot Steps         | 25€    | Accessories |       |
| Clean Slate         | 85€    | Tees        |       |
| Sun Kissed Tank | 75€    | Tanks       |       |
| Tender Touch              | 155€   | Shirts      |       |
| Kiss & Tell               | 90€    | Tees        | Hot   |
| Body Language             | 205€   | Hoodies     |       |
| Pleasure Jeans            | 190€   | Bottoms     |       |
| Hot Stuff Cap             | 35€    | Accessories |       |
| Forbidden Fruit           | 95€    | Tees        | New   |
| Bare Minimum              | 70€    | Tanks       |       |
| After Dark                | 160€   | Shirts      |       |
| Skin on Skin              | 195€   | Hoodies     |       |
| Street Glow              | 85€    | Tees        |       |
| Love Bites Tote           | 45€    | Accessories |       |
| Night Moves               | 175€   | Bottoms     | Hot   |

## Responsive breakpoints

- **> 1024px** — full desktop: 4-column product grids, 2-column hero/editorial, side-by-side big statement
- **768px–1024px** — tablet: product grids collapse to 2 columns, footer goes 2-column
- **< 768px** — mobile: single-column hero and editorial, hamburger menu appears, nav links hidden, "Quick Add" always visible (no hover), smaller padding
- **< 480px** — small mobile: tighter grid gaps, smaller font sizes on product info

## Deployment

Hosted on GitHub Pages. The workflow at `.github/workflows/deploy.yml` auto-deploys on every push to `master`. No build step needed — the site is static HTML/CSS/JS served directly.

## Owner preferences

- Does not code and does not want to learn — everything should be done for them.
- Wants minimal permission prompts and friction.
- Aesthetic preference: fashion editorial meets online store. Clean backgrounds, loud visuals.
- Brand values: bold, provocative, playful/ironic humor in product names.
- Pricing in euros (€). European brand feel.
