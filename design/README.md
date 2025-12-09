# SelectAI Premium Design System

A premium, modern black-and-white design system inspired by 21st.dev, built with Tailwind CSS.

## Overview

This design system provides a clean, minimal, and professional aesthetic with a monochrome color palette. It emphasizes readability, consistency, and modern premium aesthetics.

## Design Principles

1. **Pitch Black Foundation** - Pure black backgrounds (#0A0A0A) with no visual noise
2. **Monochrome Hierarchy** - All UI elements use grayscale except soft pastel badges
3. **Subtle Glass Effects** - Cards use subtle glass morphism with minimal backdrop blur
4. **Minimal Animations** - Only subtle hover shadows, scale (1.01), and fade transitions (≤200ms)
5. **Clean Typography** - White text on dark surfaces with proper hierarchy

## Color System

### Core Colors

| Token            | Value                    | Usage                              |
| ---------------- | ------------------------ | ---------------------------------- |
| `background`     | `#0A0A0A`                | Page background                    |
| `surface`        | `#111111`                | Cards, sidebars, elevated surfaces |
| `border`         | `rgba(255,255,255,0.05)` | Subtle borders                     |
| `text-primary`   | `#FFFFFF`                | Primary text                       |
| `text-secondary` | `#E5E5E5`                | Secondary text                     |
| `text-muted`     | `#A1A1A1`                | Muted/placeholder text             |

### Badge Colors (Soft Pastel)

| Type       | Background                  | Text      |
| ---------- | --------------------------- | --------- |
| Free       | `rgba(52, 211, 153, 0.15)`  | `#34D399` |
| Paid       | `rgba(239, 68, 68, 0.15)`   | `#EF4444` |
| Featured   | `rgba(251, 191, 36, 0.15)`  | `#FBBF24` |
| Verified   | `rgba(59, 130, 246, 0.15)`  | `#3B82F6` |
| Category   | `rgba(255, 255, 255, 0.06)` | `#FFFFFF` |
| Freemium   | `rgba(99, 102, 241, 0.15)`  | `#818CF8` |
| Enterprise | `rgba(168, 85, 247, 0.15)`  | `#A855F7` |

## Card System

### Standard Card

```css
.card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
}

.card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}
```

### Tailwind Classes

```html
<div
  class="rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] shadow-[0_4px_14px_rgba(0,0,0,0.35)] backdrop-blur-[6px] transition-all duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
>
  <!-- Card content -->
</div>
```

## Typography

### Headings

- Font: Inter (system fallback)
- Weight: `font-semibold` (600)
- Color: `text-white`
- Letter spacing: `tracking-tight`

### Body Text

- Primary: `text-white` or `text-[#FFFFFF]`
- Secondary: `text-[#E5E5E5]`
- Muted: `text-[#A1A1A1]`

## Shadows

| Name        | Value                             | Usage                    |
| ----------- | --------------------------------- | ------------------------ |
| Subtle Glow | `0 0 40px rgba(255,255,255,0.02)` | Very subtle ambient glow |
| Card        | `0 4px 14px rgba(0,0,0,0.35)`     | Default card shadow      |
| Card Hover  | `0 10px 30px rgba(0,0,0,0.45)`    | Card hover state         |
| Elevated    | `0 8px 24px rgba(0,0,0,0.40)`     | Popover, dropdown        |

## Border Radius

| Size   | Value  | Usage                 |
| ------ | ------ | --------------------- |
| `sm`   | 6px    | Small buttons, inputs |
| `md`   | 8px    | Medium elements       |
| `lg`   | 12px   | Large buttons         |
| `xl`   | 16px   | Cards (primary)       |
| `2xl`  | 20px   | Large cards           |
| `full` | 9999px | Pills, avatars        |

## Animations

### Allowed Animations

1. **Hover Shadow** - Card shadow transition on hover
2. **Subtle Scale** - `scale-[1.01]` on hover for cards
3. **Fade Transitions** - Opacity changes ≤200ms

### Forbidden

- Background animations (waves, gradients, particles)
- Moving decorative layers
- Color transitions outside grayscale
- Heavy transform animations

## Component Guidelines

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #ffffff;
  color: #0a0a0a;
}

/* Secondary/Ghost Button */
.btn-secondary {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}
```

### Inputs

```css
.input {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.input:focus {
  border-color: rgba(255, 255, 255, 0.15);
}
```

### Tables

- Header: `bg-[#111111]`
- Rows: Transparent background
- Hover: `bg-[rgba(255,255,255,0.05)]`
- Borders: `rgba(255, 255, 255, 0.05)`

### Sidebar

- Background: `#0A0A0A`
- Item hover: `rgba(255, 255, 255, 0.05)`
- Active indicator: Left border accent or slightly lighter surface
- Icons: Gray (`#6B6B6B`) default, white on active

## Accessibility

- Contrast ratios meet WCAG AA minimum
- Focus states use visible outline/ring
- Interactive elements have clear hover states
- Text sizes follow readable scales

## File Structure

```
design/
├── tokens.json      # Design tokens in JSON format
└── README.md        # This documentation
```

## Usage with Tailwind

The design tokens are applied through CSS custom properties in `globals.css` and extended in the Tailwind theme configuration.

### CSS Variables

```css
:root {
  --background: #0a0a0a;
  --surface: #111111;
  --border: rgba(255, 255, 255, 0.05);
  --text-primary: #ffffff;
  --text-secondary: #e5e5e5;
  --text-muted: #a1a1a1;
}
```

## Migration Notes

When migrating from the previous theme:

1. Remove all violet/purple color references
2. Remove all gradient backgrounds
3. Remove all wave/particle animations
4. Replace colored hover states with grayscale
5. Update badge colors to soft pastels
6. Simplify card styles to glass effect
7. Update sidebar to flat monochrome

---

Version: 2.0.0
Updated: December 2024
