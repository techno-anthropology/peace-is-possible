# Peace is Possible

The website for [Peace is Possible Recovery Coaching](https://peaceispossiblerecovery.com): eating disorder and addiction recovery coaching with Ronnie Sullivan and nutrition coaching with Sara Potter, in Colorado Springs and online.

The site covers coaching, the coaches, Ronnie's story, testimonials, resources, articles, contact, and a coffee and merch shop. Page paths match the current Shopify site, so existing links and search rankings carry over. Shopify still handles checkout and the contact inbox.

## Stack

- [Next.js 16](https://nextjs.org) with the App Router and Cache Components. Next 16 differs from older versions. Its docs ship in `node_modules/next/dist/docs/`.
- React 19, TypeScript, and Tailwind CSS 4.
- Motion for scroll and reveal animation. React Three Fiber draws the 3D forest canopy in the home page hero.
- Playwright and axe for end-to-end checks.

## Run the site locally

You need Node.js 24 or later and pnpm.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000.

To run the production build:

```sh
pnpm build
pnpm start
```

## Edit the words

Every word on the site lives in `src/content/`:

- `site.ts` has page copy, navigation, booking links, testimonials, Ronnie's story, resources, the crisis notice, the page titles and descriptions in `seo`, and the old-URL `redirects`.
- `articles.ts` has the blog articles.
- `products.ts` has the shop's product names, descriptions, photos, and categories.

Testimonials, Ronnie's story, and the articles match the old Shopify site word for word. Keep them that way unless Ronnie changes them.

## Refresh shop products and prices

Options, variants, and prices come from the Shopify store. To pull the latest:

```sh
node scripts/sync-products.mjs
```

The script reads the product handles listed in `src/content/products.ts`, fetches the store's public `products.json`, and writes `src/content/products.generated.json`. Commit that file. Prices are stored in cents.

To add a product, add an entry with its Shopify handle to `products.ts`, add its photo to `public/shop/`, and run the script. The build fails if a listed handle has no store data.

## How checkout works

The bag lives in the visitor's browser (`localStorage`), so the site needs no Shopify API token. **Checkout** sends the visitor to a Shopify cart permalink:

```
https://peaceispossiblerecovery.com/cart/<variant id>:<quantity>,<variant id>:<quantity>
```

Shopify builds a cart from those lines and opens its own checkout. Payment, tax, shipping, and order emails all stay in Shopify. The cart code is in `src/lib/cart.ts`.

## Check the site before you ship

`scripts/qa.mjs` runs end-to-end checks against a production build:

```sh
pnpm build
node scripts/qa.mjs
```

It uses the server on port 3100, or starts one. It crawls every page from the home page and prints a pass or fail line for each check:

- Every page returns 200 with a unique title and description, and logs no errors.
- No page scrolls sideways at five screen sizes from 360 to 1440 pixels wide.
- The app demo video fits on screen at each size.
- Booking, the mobile menu, the podcast embed, and the cart work.
- The contact form targets Shopify with the right field names.
- Redirects and `sitemap.xml` are correct.
- axe finds no serious or critical accessibility problems.

The script never submits the contact form and never opens checkout. Add `--shots <folder>` to save a full-page screenshot of every page on desktop and mobile.

Also run `npx tsc --noEmit` and `npx eslint .` before you ship.

## Environment variables

| Variable | Effect |
| --- | --- |
| `SITE_INDEXABLE` | Set to `true` to let search engines index the site. Any other value, or no value, adds `noindex` to every page and makes `robots.txt` disallow everything. The build reads it, so redeploy after you change it. |
| `VERCEL_PROJECT_PRODUCTION_URL` | Vercel sets this. Link previews use it to load the share image. |

Leave `SITE_INDEXABLE` unset on preview deployments. Canonical links always point at peaceispossiblerecovery.com.

## Move the domain from Shopify to this site

Shopify stays the store. Only the domain moves. Do these steps in order:

1. In Shopify admin, open **Settings > Domains**. Connect a subdomain for the store, such as `shop.peaceispossiblerecovery.com`, and make it the primary domain.
2. In `src/content/site.ts`, set `site.store` to that subdomain. Checkout, the contact form, policy links, and product links all use this value.
3. Run `node scripts/sync-products.mjs` and commit the result.
4. In Vercel, add `peaceispossiblerecovery.com` and `www.peaceispossiblerecovery.com` to the project and set `SITE_INDEXABLE=true` for production.
5. Point the domain's DNS records at Vercel, as the Vercel domain settings describe.
6. Deploy. Then place a test order through the bag, and send a test message through the contact form.
7. In Google Search Console, submit `https://peaceispossiblerecovery.com/sitemap.xml`.

`next.config.ts` already redirects retired Shopify pages and the old prototype links. Once `site.store` is a different domain, it also sends old `/products/`, `/cart/`, `/policies/`, and `/account/` links to the store.

## Known limits

- The contact form posts to Shopify's `/contact` endpoint. Shopify sends the message to the store inbox and may show its own spam check page first. The form has not been submitted from this site during testing, because each test emails Ronnie. Send one real message after launch.
- The app demo video has no captions file.
- The bag shows one photo per product, whichever color or size is chosen.
- The nature photos in `public/canopy/` are CC0 or public domain, from [Openverse](https://openverse.org).
