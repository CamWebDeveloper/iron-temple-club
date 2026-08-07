# 🏋️ Iron Temple Club

Premium landing page for a high-performance gym. Portfolio project built with **plain HTML, CSS and JavaScript** (no frameworks), focused on a dark, aggressive, luxury design.

> ⚠️ **Fictional project.** All data (users, payments, products, trainers, transformations, prices) is simulated for demonstration purposes only. It does not represent a real business.

---

## 🔗 Demo

Open `index.html` directly in your browser — no installation or build step required.

---

## ✨ Features

- **Impactful hero section** with a large image, animated stats and clear calls to action.
- **Membership system** (Basic / Pro / Elite Black) with a benefits modal and expiration date.
- **5 trainers** with specialty, experience and social media links.
- **Class booking system** for 10 classes with time-slot selection.
- **Gallery** of the facility (7 photos) with interactive hover effects.
- **Before/after transformations** from real clients.
- **Functional store**: search, category filters, favorites and a cart with simulated checkout.
- **User dashboard**: workout routine, event calendar (Elite Black exclusive), calorie counter, payment history, downloadable diet plan (`.txt`) and notifications.
- **Interactive event calendar** with month navigation.
- **Support chat** with simulated automatic responses.
- **Fitness blog**, **video testimonials** (simulated) and **promotions**.
- **Floating WhatsApp button** and social media links.
- On-scroll animations, animated member counter, mobile menu, fully responsive design.
- Basic SEO: meta tags, Open Graph, Twitter Cards, structured data (JSON-LD) and favicon.

---

## 🛠️ Stack

- **HTML5** semantic markup
- **CSS3** pure (custom variables, Grid, Flexbox, animations)
- **JavaScript ES6+** pure (no frameworks or external UI libraries)
- Icons: [Font Awesome 6](https://fontawesome.com/)
- Fonts: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue), [Inter](https://fonts.google.com/specimen/Inter), [Space Mono](https://fonts.google.com/specimen/Space+Mono) (Google Fonts)

---

## 📁 Project structure

```
iron-temple-club/
├── index.html              # Full page structure (18 sections)
├── css/
│   └── style.css           # Styles (variables, components, responsive)
├── js/
│   ├── data.js              # Simulated data (memberships, trainers, store, etc.)
│   ├── main.js               # Core: header, menu, scroll, modals, toasts, general renders
│   ├── store.js               # Store: search, filters, favorites, cart
│   ├── dashboard.js            # User dashboard
│   ├── booking.js               # Class booking system
│   ├── calendar.js               # Interactive event calendar
│   ├── membership.js              # Membership modal and simulated purchase
│   └── chat.js                     # Support chat
└── assets/
    └── img/                 # Project images
```

---

## ▶️ How to use it

1. Download or clone the full folder (keeping the `css/`, `js/` and `assets/` structure).
2. Open `index.html` in your browser. No server or dependency installation needed.
3. To edit content (text, prices, trainers, products, etc.), modify `js/data.js` — all dynamic content is fed from there.

---

## 🖼️ Image credits

Some photos are stock images (Unsplash), used solely for visual demonstration purposes in this portfolio piece.

---

## 📌 Notes / Roadmap (v2)

- Real data persistence (currently everything lives in session memory).
- Carousel for transformations and testimonials.
- More robust form validation.
- Real `canonical` tag and `sitemap.xml` (require a final domain).
- Integration with a real payment gateway and backend.

---

## 📄 License

Portfolio project, free to use for learning and demonstration purposes.
