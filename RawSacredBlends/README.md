# RawSacredBlends – E‑commerce Template (Hapé)

A respectful, South American–inspired ecommerce template for offering ceremonial hapé blends. Includes homepage sections, a simple cart counter, and cultural/health disclaimers.

## Features
- Hero with rainforest imagery and blessing-driven mission statement
- Sections: About Hapé, Benefits (ceremonial context), Mission & Blessing, Shop, Contact
- Placeholder products and localStorage cart count
- South American visual motifs (earth tones, Chakana-inspired symbol)
- Disclaimers: tobacco content, nicotine warning, adult-only use
- Age verification modal (21+) on first visit
- Stripe checkout stub ready for backend wiring

## Run Locally
This is a static site.

- Open `RawSacredBlends/index.html` in your browser, or use a local server:

```bash
# Option 1: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Option 2: Node quick server
npx http-server RawSacredBlends -p 8080
# Visit http://localhost:8080
```

## Integration Notes
- Replace placeholder images with your own licensed assets.
- Hook up real checkout (Stripe, PayPal) in `script.js` where indicated.
- Add Terms/Privacy/Age verification pages as needed.
- Ensure compliance with all applicable laws; consult with cultural stewards and uphold consent/reciprocity for any traditional offerings.

### Age Gate
The modal shows unless `localStorage['rsb_age_verified_v1'] === 'true'`. Buttons:
- "I am 21+" sets the flag and closes the modal.
- "Exit" keeps the overlay with an access restricted message.

### Stripe Checkout Stub
- Add your publishable key in a global: `window.STRIPE_PUBLIC_KEY = 'pk_live_xxx'` (prefer via a `<script>` tag or configuration script).
- Implement a backend endpoint `POST /create-checkout-session` returning `{ id: 'cs_test_...' }`.
- The client calls `stripe.redirectToCheckout({ sessionId })`.
- For development, you can run a simple Node server using Stripe docs examples.

## Disclaimers
- Contains tobacco; nicotine is addictive. For adults only (21+ where applicable).
- Not a medical product; no claims are made. Avoid use during pregnancy or if sensitive to tobacco or smoke.
- Use only where legal and culturally appropriate; respect local laws and traditions.
