# SelectAI

> A modern, high-performance AI tools directory built with Next.js 15, featuring full internationalization, premium dark theme, and advanced data visualization.

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

## 🌟 Features

### Design & UX

- **Premium Black Theme** – Monochrome design system with subtle glass morphism effects and pitch-black backgrounds
- **Fully Responsive** – Optimized layouts from mobile to 4K displays
- **Micro-interactions** – Polished hover states, smooth transitions, and delightful animations
- **Dark/Light Mode** – System-aware theme switching with `next-themes`
- **Accessible UI** – Built with Radix UI primitives for WCAG compliance

### Internationalization (i18n)

- **Multi-language Support** – English and Arabic locales with `next-intl`
- **RTL Layout** – Automatic right-to-left support for Arabic
- **Type-safe Translations** – Fully typed translation keys
- **SEO-optimized Routes** – Locale-based routing with proper hreflang tags

### Performance & SEO

- **App Router** – Leveraging Next.js 15 server components and streaming
- **Turbopack** – Lightning-fast development with Turbopack bundler
- **Image Optimization** – Automatic image optimization with `next/image`
- **Error Tracking** – Production-ready error monitoring with Sentry
- **Route Redirects** – SEO-friendly 301 redirects for legacy routes

### Developer Experience

- **TypeScript** – End-to-end type safety
- **ESLint + Prettier** – Automated code formatting and linting
- **Husky + Lint-staged** – Pre-commit hooks for code quality
- **Command Palette** – Built-in kbar command menu
- **React Query** – Server state management with TanStack Query
- **Form Validation** – React Hook Form + Zod schemas

## 📱 Sections

- **Hero Section** – Eye-catching landing area with CTA
- **Features Showcase** – Highlight key capabilities with animations
- **AI Tools Directory** – Browse, filter, and search 200+ AI tools
- **Testimonials** – Social proof with animated testimonial cards
- **Dashboard** – Overview with analytics and data visualizations
- **Kanban Board** – Drag-and-drop task management with `@dnd-kit`
- **Product Catalog** – Data table with advanced filtering and sorting
- **User Profile** – Account management and settings
- **Admin Panel** – Administrative controls and content management

## 🚀 Tech Stack

| Category                 | Technologies                                    |
| ------------------------ | ----------------------------------------------- |
| **Framework**            | Next.js 15.4, React 19                          |
| **Language**             | TypeScript 5.7                                  |
| **Styling**              | Tailwind CSS 4.1, PostCSS, CVA                  |
| **UI Components**        | Radix UI, shadcn/ui, Lucide Icons, Tabler Icons |
| **Animations**           | Framer Motion, GSAP, Motion One                 |
| **State Management**     | Zustand, TanStack Query, nuqs                   |
| **Forms**                | React Hook Form, Zod                            |
| **Data Tables**          | TanStack Table, React Resizable Panels          |
| **Drag & Drop**          | dnd-kit                                         |
| **Internationalization** | next-intl                                       |
| **Theming**              | next-themes                                     |
| **Charts**               | Recharts                                        |
| **Monitoring**           | Sentry                                          |
| **Dev Tools**            | ESLint, Prettier, Husky, Lint-staged            |

## 📦 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rebestx/select-ai.git
   cd select-ai
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy the example env file
   cp env.example.txt .env
   ```

4. **Configure Sentry (optional)**

   For error tracking, add your Sentry credentials to `.env`:

   ```env
   NEXT_PUBLIC_SENTRY_DSN=https://****@****.ingest.sentry.io/****
   NEXT_PUBLIC_SENTRY_ORG=your-org-name
   NEXT_PUBLIC_SENTRY_PROJECT=select-ai
   SENTRY_AUTH_TOKEN=sntrys_****
   NEXT_PUBLIC_SENTRY_DISABLED=false
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Available Scripts

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Start development server with Turbopack    |
| `pnpm build`        | Build production bundle                    |
| `pnpm start`        | Start production server                    |
| `pnpm lint`         | Run ESLint                                 |
| `pnpm lint:fix`     | Fix ESLint errors and format with Prettier |
| `pnpm lint:strict`  | ESLint with zero warnings tolerance        |
| `pnpm format`       | Format all files with Prettier             |
| `pnpm format:check` | Check code formatting                      |

## 📁 Project Structure

```
select-ai/
├── public/                    # Static assets (images, fonts)
│   └── assets/               # Public asset files
├── messages/                  # i18n translation files
│   ├── en.json               # English translations
│   └── ar.json               # Arabic translations
├── design/                    # Design system documentation
│   ├── README.md             # Design system guide
│   └── tokens.json           # Design tokens
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/         # Internationalized routes
│   │   │   ├── (dashboard)/  # Dashboard layout group
│   │   │   │   └── home/     # Landing page
│   │   │   ├── admin/        # Admin routes
│   │   │   ├── auth/         # Authentication pages
│   │   │   ├── layout.tsx    # Locale layout wrapper
│   │   │   ├── page.tsx      # Locale root redirect
│   │   │   ├── globals.css   # Global styles
│   │   │   └── theme.css     # Theme variables
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Root page (redirects to locale)
│   ├── components/           # React components
│   │   ├── ai/               # AI tools components
│   │   ├── animation/        # Animation components
│   │   ├── auth/             # Auth components
│   │   ├── categories/       # Category components
│   │   ├── kbar/             # Command palette
│   │   ├── layout/           # Layout components
│   │   ├── modal/            # Modal components
│   │   ├── ui/               # shadcn/ui components
│   │   └── *.tsx             # Shared components
│   ├── features/             # Feature modules
│   │   ├── ai-tools/         # AI tools feature
│   │   ├── auth/             # Authentication
│   │   ├── chat/             # Chat interface
│   │   ├── kanban/           # Kanban board
│   │   ├── overview/         # Dashboard overview
│   │   ├── products/         # Product catalog
│   │   └── profile/          # User profile
│   ├── contexts/             # React contexts
│   │   ├── app-ready-context.tsx
│   │   ├── auth-context.tsx
│   │   └── tenant-context.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── use-data-table.ts
│   │   ├── use-debounce.tsx
│   │   ├── use-mobile.tsx
│   │   └── ...
│   ├── lib/                  # Utility functions
│   │   ├── utils.ts          # General utilities
│   │   ├── data-table.ts     # Table utilities
│   │   ├── arabic.ts         # Arabic text helpers
│   │   └── animations/       # Animation utilities
│   ├── data/                 # Static data
│   │   └── ai-tools.ts       # AI tools dataset
│   ├── constants/            # App constants
│   │   ├── categories.ts
│   │   ├── data.ts
│   │   └── mock-api.ts
│   ├── types/                # TypeScript types
│   │   ├── data-table.ts
│   │   └── react-table.d.ts
│   ├── i18n/                 # i18n configuration
│   │   ├── routing.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   └── fonts/                # Custom fonts
├── components.json            # shadcn/ui config
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🌐 Internationalization

### Supported Languages

- **English** (`en`) – Default locale
- **Arabic** (`ar`) – Full RTL support

### RTL Support

The application automatically detects Arabic locale and applies RTL layout:

- Mirrored navigation and UI elements
- Right-aligned text
- Reversed flexbox and grid layouts

### Adding a New Language

1. **Create translation file**

   ```bash
   cp messages/en.json messages/fr.json
   ```

2. **Translate the content**
   Update all translation keys in the new file.

3. **Update i18n config**
   Add the locale to `src/i18n/routing.ts`:

   ```typescript
   export const routing = {
     locales: ['en', 'ar', 'fr'],
     defaultLocale: 'en'
   };
   ```

4. **Build and test**
   ```bash
   pnpm build
   pnpm start
   ```

## 🎨 Customization

### Theme & Colors

The design system uses CSS variables defined in [src/app/[locale]/theme.css](src/app/[locale]/theme.css):

```css
:root {
  --background: 10 10% 4%; /* Pitch black */
  --foreground: 0 0% 98%; /* White text */
  --primary: 0 0% 98%;
  --border: 0 0% 15%;
  /* ... */
}
```

Modify these variables to customize the color scheme globally.

### Design Tokens

Full design system documentation is available in [design/README.md](design/README.md), including:

- Color palette
- Typography scale
- Spacing system
- Component patterns

### Content Editing

- **AI Tools Data** – Edit [src/data/ai-tools.ts](src/data/ai-tools.ts)
- **Translations** – Update JSON files in `messages/`
- **Static Content** – Modify component files in `src/components/`

### Assets

Replace assets in `public/assets/` while maintaining the same file names, or update import paths in components.

## 🚢 Deployment

### Recommended: Vercel

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Import to Vercel**

   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel auto-detects Next.js configuration

3. **Add Environment Variables**

   - Navigate to Project Settings → Environment Variables
   - Add Sentry credentials (optional)

4. **Deploy**
   - Vercel deploys automatically on push
   - Production URL: `https://your-project.vercel.app`

### Other Platforms

The project is compatible with any platform supporting Next.js:

- **Netlify** – Add `next.config.ts` and deploy
- **Railway** – Connect repo and deploy
- **AWS Amplify** – Import and configure
- **Self-hosted** – Run `pnpm build && pnpm start`

### Build Output

```bash
pnpm build
```

Generates an optimized production build in `.next/` directory.

## 🔧 Environment Variables

| Variable                      | Description                                           | Required |
| ----------------------------- | ----------------------------------------------------- | -------- |
| `NEXT_PUBLIC_SENTRY_DSN`      | Sentry Data Source Name for error tracking            | No       |
| `NEXT_PUBLIC_SENTRY_ORG`      | Sentry organization slug                              | No       |
| `NEXT_PUBLIC_SENTRY_PROJECT`  | Sentry project name                                   | No       |
| `SENTRY_AUTH_TOKEN`           | Sentry authentication token for source maps           | No       |
| `NEXT_PUBLIC_SENTRY_DISABLED` | Disable Sentry in development (`"true"` or `"false"`) | No       |

> **Note:** Authentication (Clerk) has been temporarily disabled during Laravel migration. Auth variables are not currently required.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork the repository**

   ```bash
   git clone https://github.com/yourusername/select-ai.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**

   - Follow existing code style
   - Add tests if applicable
   - Update documentation

4. **Commit your changes**

   ```bash
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide a clear description
   - Reference related issues

## 📝 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

## 👨‍💻 Author

**Ayman Ismail**

- Website: [https://www.rebestx.dev/en](https://www.rebestx.dev/en)
- GitHub: [@rebestx](https://github.com/rebestx)

## 🙏 Acknowledgments

- **shadcn/ui** – For the exceptional component library
- **Vercel** – For Next.js and deployment platform
- **Radix UI** – For accessible component primitives
- **21st.dev** – Design inspiration for the premium aesthetic

---

<div align="center">

**[⬆ back to top](#selectai)**

Made with ❤️ using Next.js

</div>
