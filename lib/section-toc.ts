import type { TOCItemType } from 'fumadocs-core/toc';

// A <Section> (or a titled <Accordions>) carries its title as a prop, so the MDX pipeline,
// which builds the table of contents from markdown headings, never sees it. These put it
// back: the card takes an id from its title, and the page's toc gets an entry for it at
// its place among the real headings.

export function sectionId(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

const titledCard = /^<(?:Section|Accordions)\b[^>]*\btitle="([^"]+)"/;
const heading = /^#{1,6}\s/;
const fence = /^(```|~~~)/;

/**
 * Walks the raw MDX in document order: each markdown heading takes the next entry of the
 * pipeline's toc, each titled card adds one of its own, so the merged list keeps the page
 * order. Headings inside code fences aren't headings, and the pipeline skips them too.
 */
export function withSectionHeadings(raw: string, toc: TOCItemType[]): TOCItemType[] {
  const merged: TOCItemType[] = [];
  let next = 0;
  let inFence = false;

  for (const line of raw.split('\n')) {
    const text = line.trimStart();
    if (fence.test(text)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const card = titledCard.exec(text);
    if (card) {
      merged.push({ title: card[1], url: `#${sectionId(card[1])}`, depth: 2 });
    } else if (heading.test(text) && next < toc.length) {
      merged.push(toc[next++]);
    }
  }

  // anything the walk couldn't place keeps its spot at the end rather than going missing
  return merged.concat(toc.slice(next));
}
