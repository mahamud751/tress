# Mad About Trees

A responsive Next.js recreation of the supplied website reference, with real HTML text, responsive navigation, a draggable garden comparison and a quote form.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` then `npm start`.

## Verification

`npm run build` checks the production bundle and TypeScript. Browser tests cover navigation, quote preparation, file validation, the comparison control and responsive overflow from 320px to 1440px.

With the development server running, run `npx playwright install chromium`, then `TEST_BASE_URL=http://localhost:3000 npm test` (adjust the port if needed).

## Quote requests

The form validates required fields and optional JPG/PNG/HEIC photos up to 10 MB. Submitting prepares a text message to the phone number in the reference; the visitor reviews and sends it using their messaging app. Photos must be attached in that app. No request is automatically sent, and there is no server-side storage or email service configured.

## Design assets

`public/images/design-reference.jpeg` is the original supplied design. Its logo and supporting photos are displayed through SVG viewports to retain the source artwork. These can be replaced with original standalone brand assets when available.

`public/images/stump-removal-hero.png` was reconstructed using the built-in imagegen tool. Prompt: extract the reference's wide hero photograph, remove all overlaid text and interface elements, preserve the gardener, orange helmet, yellow Vermeer grinder, garden, lighting and composition, and inpaint the dark garden behind the removed text. This reconstruction is visually close, but is not the original source photograph.

Typography uses Bricolage Grotesque (headings) and Inter (body), self-hosted via `next/font/google` in `app/layout.tsx`.
