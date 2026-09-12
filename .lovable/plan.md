# SunClick branded, print-safe quotation

## What will change
- Add the supplied SunClick logo and company identity to the quotation header and footer.
- Replace the current generic colors with a restrained SunClick red, yellow, white, and charcoal treatment.
- Split the quotation into deliberate print groups so headings, cards, totals, and terms do not break across PDF pages.
- Keep the long product table printable by repeating its header and preventing individual rows from splitting.
- Add A4 print sizing, reliable margins, exact background printing, and print-only branding/footer details.
- Keep the existing browser button for opening the system Print / Save as PDF dialog.

## Validation
- Print the page to PDF in Chromium.
- Render every PDF page to images and inspect all pages for clipping, overlap, blank pages, broken rows, and missing branding.
- Adjust the page breaks until the PDF is clean on every page.

## Technical details
- Store the uploaded logo through the project asset flow and import its URL into the page.
- Use CSS paged-media rules (`@page`, `break-inside`, `break-before`, repeated table headers) rather than generating a separate document, so the displayed quotation and saved PDF stay identical.
