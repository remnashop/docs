import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Индекс собирается на этапе сборки и отдаётся статикой; локали берутся из i18n-конфига
// загрузчика, отдельный language не нужен — токенизатор по умолчанию мультиязычный.
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source);
