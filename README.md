# ✦ New Look Beauty Parlour — Website

> Premium, mobile-first beauty salon website for **New Look Beauty Parlour**, Gandhi Maidan Road, Siwan, Bihar, India.

---

## 🎯 Project Overview

**Business Name:** New Look Beauty Parlour  
**Business Type:** Beauty Parlour / Salon  
**Location:** Gandhi Maidan Road, Siwan, Bihar 841226, India  
**Contact:** +91 8409403370  
**Goal:** High-end, conversion-focused website to attract local customers and convert visitors into booked appointments.

---

## ✅ Completed Features

### Design & UI
- [x] **Mobile-first luxury design** — Soft Pink, Peach, Gold & White palette
- [x] **Playfair Display + Poppins + Dancing Script** typography stack
- [x] **Loading screen** with branded animation
- [x] **Sticky top navigation bar** with scroll state
- [x] **Mobile hamburger menu** with animated toggle
- [x] **Active link highlighting** on scroll
- [x] **Smooth scrolling** for all anchor links
- [x] **Scroll animations** (fade-up, fade-left, fade-right) via Intersection Observer
- [x] **Scroll-to-top button** (appears after 400px scroll)

### Sections
- [x] **Hero Section** — Full-screen with bridal image background, overlay, animated badge, stats counter, dual CTA buttons
- [x] **Marquee Strip** — Animated service tags with gold background
- [x] **Services Section** — 5 services with images, icons, hover animations; Bridal Makeup highlighted as Premium
- [x] **About Us Section** — Trust-building content, feature badges, image frame with gold border
- [x] **Gallery Section** — 8 images in responsive grid, filter buttons (All/Bridal/Makeup/Hair & Skin), hover zoom overlay
- [x] **Testimonials Section** — Auto-sliding carousel (4.5s interval), swipe support, 5 realistic Indian client reviews
- [x] **Appointment Booking Section** — Form with validation, saves to REST API table, redirects to WhatsApp with pre-filled message
- [x] **Contact Section** — Contact card, Google Maps embed (Gandhi Maidan Road, Siwan), direct call/WhatsApp buttons
- [x] **Footer** — Brand info, quick links, services list, social icons (Instagram, Facebook, WhatsApp), SEO text

### Conversion Features
- [x] **Sticky Bottom Navigation Bar** (mobile only) — 📞 Call Now | 💬 WhatsApp | 📅 Book Now
- [x] **Floating WhatsApp button** (desktop) with pulse animation
- [x] **Floating Call button** (desktop)
- [x] **WhatsApp pre-filled message** booking redirect after form submission
- [x] **Hero counter animation** — 500+ brides, 5★ rating, 10+ years

### Performance & SEO
- [x] **Image lazy loading** (native + fallback IntersectionObserver)
- [x] **Local Business JSON-LD schema** markup
- [x] **SEO meta tags** optimized for: "Beauty Parlour in Siwan", "Best Bridal Makeup in Siwan", "Salon near Gandhi Maidan Siwan"
- [x] **Open Graph meta tags** for social sharing
- [x] **Responsive** — Mobile, Tablet (768px+), Desktop (1024px+)
- [x] **Accessibility** — ARIA labels, semantic HTML5, focus-visible styles, reduced-motion support

### Data
- [x] **Appointments table** (REST API) — stores name, phone, service, preferred date, message, status, timestamp

---

## 📁 File Structure

```
/
├── index.html              # Main website (all sections)
├── css/
│   └── style.css           # Complete mobile-first stylesheet
├── js/
│   └── main.js             # Interactions, animations, form handling
└── README.md               # This file
```

---

## 🔗 Functional Entry Points

| Section | URL Anchor | Description |
|---------|-----------|-------------|
| Home/Hero | `/#home` | Hero with CTA buttons |
| Services | `/#services` | 5 beauty services |
| About | `/#about` | About Us section |
| Gallery | `/#gallery` | Photo gallery with filters |
| Testimonials | `/#testimonials` | Customer reviews carousel |
| Booking Form | `/#booking` | Appointment booking form |
| Contact | `/#contact` | Address, map, contact |

---

## 📊 Data Models

### `appointments` Table

| Field | Type | Description |
|-------|------|-------------|
| `id` | text | Auto-generated UUID |
| `name` | text | Customer full name |
| `phone` | text | Customer phone number |
| `service` | text | Selected service (enum) |
| `preferred_date` | text | Date in YYYY-MM-DD format |
| `message` | rich_text | Optional customer message |
| `status` | text | pending / confirmed / completed / cancelled |
| `created_at_label` | text | IST timestamp label |

**API Endpoint:** `tables/appointments`  
**Operations:** POST (create), GET (list), PATCH (update status)

---

## 🎨 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Soft Pink | `#f8c8dc` | Backgrounds, badges, accents |
| Nude Peach | `#f5e1da` | Section backgrounds |
| Gold | `#d4af37` | Buttons, accents, borders |
| Gold Dark | `#b8941e` | Hover states, text |
| Dark Maroon | `#2c1a1a` | Hero, footer backgrounds |
| White | `#ffffff` | Cards, forms |

---

## 📱 Contact & Business Links

- **Phone / Click-to-Call:** `tel:+918409403370`
- **WhatsApp Chat:** `https://wa.me/918409403370?text=Hello%2C%20I%20want%20to%20book%20an%20appointment%20at%20New%20Look%20Beauty%20Parlour`
- **Google Maps:** Gandhi Maidan Road, Siwan, Bihar 841226

---

## 🚀 Deployment

To make this website live, go to the **Publish tab** and click Publish. Your website will be accessible online with a shareable URL.

---

## 💡 Recommended Next Steps

1. **Add real business photos** — Replace stock images with actual salon/bridal photos for authenticity
2. **Instagram feed integration** — Embed real Instagram posts from the business account
3. **Service pricing page** — Add a detailed pricing section/page
4. **Google Reviews integration** — Fetch real Google reviews via Google Places API
5. **WhatsApp Business catalog** — Link to WhatsApp Business for service catalog browsing
6. **Booking admin panel** — Create a `/admin` page to view/manage appointments from the `appointments` table
7. **Custom domain** — Connect a custom domain (e.g., newlookbeautyparlour.in)

---

*© 2025 New Look Beauty Parlour. Gandhi Maidan Road, Siwan, Bihar, India.*
