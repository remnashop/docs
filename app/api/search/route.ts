import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Locales come from the loader's i18n config; the default tokenizer is multilingual,
// so no explicit `language` option is needed.
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source);
