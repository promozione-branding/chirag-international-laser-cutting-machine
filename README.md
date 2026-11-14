# Ci Laser – Home Page

Next.js 14 (App Router, JavaScript) · Tailwind CSS · Framer Motion · Swiper.js

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/                 layout, globals.css, page.jsx (home)
components/
  Header, Hero, Categories, About, Features,
  FeaturedMachines, Story, Testimonials, FAQ, CTA
  art/               SVG illustrations (laser head, machines, building, logo, avatars)
  ui/                SectionHeading, Magnetic (magnetic hover), Tilt (3D tilt)
lib/seed.js          deterministic pseudo-random (SSR-safe spark positions)
```

## Animations per section

| Section | Implementation |
| --- | --- |
| Hero | 3-layer mouse parallax, looping dashed laser paths / drawn shapes, per-letter magnetic text reveal, animated gradient waves (`d` morph) |
| Categories | Swiper `EffectCoverflow` + autoplay inertia, active card lift/glow/scale, elliptical track |
| About | Mouse-driven 3D layered parallax, diagonal `clip-path` slide-in, ripple play button, odometer count-up |
| Features | Icons float on a motion path, centre card auto-focus (scale + glow), ripple waves, 3D hover tilt |
| Featured | Sticky pin + scroll-scrubbed `rotateY`, hover 360° spin, floating blueprint layers, spotlight platform, Swiper fade |
| Story | Scroll-drawn timeline, alternating step cards, parallax building, background path drawn on scroll |
| Testimonials | Swiper coverflow carousel, centre card highlight, floating shadows, arrows + dots |
| FAQ | Continuously rotating extruded 3D "?", animated accordion height, icon morph, staggered reveal |
| CTA | Laser spark trail to button, wave/particle background, magnetic button + glow pulse, parallax depth |

`prefers-reduced-motion` is respected via `MotionConfig reducedMotion="user"`.
