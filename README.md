# Sakshaat Raut · Portfolio

React + Vite site with page-curtain transitions, a multilingual "Hello" preloader,
magnetic buttons, hover-image project lists and Lenis smooth scrolling.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
```

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. At vercel.com/new, import it. Vercel detects Vite (build `npm run build`, output `dist`).
   `vercel.json` already sends /work, /about and /contact to the app.

## Where things live
- `src/data/site.js`: name, contact details, links, experience, education, skills.
- `src/data/projects.js`: projects and the Work page filters.
- `src/data/research.js`: your papers for the Research page (fields marked TODO).
- `src/data/life.js`: hobbies and photo lists for the Life Beyond page. Photos go in `public/assets/life/`.
- `public/assets/`: project images (`work-*.svg`), the favicon, fonts and the resume PDF.
- `src/pages/`: Home, Work, About, Research, Life Beyond, Contact. `src/components/`: navbar, menu, loader, footer.

## Contact form
Messages go to your email through FormSubmit (formsubmit.co), with no account or key needed.
The very first message sent from the live site triggers a one-time "Activate form" email
to sash.raut10@gmail.com. Click the link in it, and every message after that arrives in your inbox.
Visitors' emails are set as reply-to, so you can just hit Reply.

Optional: to use Formspree or Web3Forms instead, put `VITE_FORMSPREE_ID=...` or
`VITE_WEB3FORMS_KEY=...` in a `.env` file (or in Vercel's environment variables).

## Photo
The hero shows an "SR" monogram. To use a photo instead, add a transparent PNG cutout to
`public/assets/` and set `photo: '/assets/your-file.png'` in `src/data/site.js`.
