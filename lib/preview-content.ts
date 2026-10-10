// Illustrative figures for the dashboard mock under the hero, not live data. Labels follow
// the dashboard's own locales (remnashop frontend, shared/i18n/locales); the people in it
// are the project's donors, by their own nicknames.

export type PreviewScreen = 'overview' | 'analytics' | 'users' | 'transactions' | 'plans' | 'events';

export type Tone = 'success' | 'warning' | 'error' | 'neutral' | 'accent' | 'violet';

type Kpi = { label: string; value: string; hint?: string; trend?: { text: string; hint: string } };
type Filter = { label: string; value: string };

type UserRow = {
  initials: string;
  name: string;
  handle: string;
  channels: ('telegram' | 'email' | 'login')[];
  subscriptions: { tone: Tone; count: number }[];
  date: string;
  relative: string;
};

type EventRow = {
  kind: 'purchase' | 'renew' | 'promocode' | 'login' | 'register' | 'plan';
  event: string;
  time: string;
  actor: string;
  ip: string;
};

export type Preview = {
  titles: Record<PreviewScreen, string>;
  header: { search: string; login: string; role: string; language: string };
  periods: string[];
  overview: {
    updatedAt: string;
    kpis: Kpi[];
    attention: { title: string; description: string; rows: { title: string; sub: string }[] };
    revenue: { title: string; description: string; total: string; orders: string };
    subscriptions: {
      title: string;
      description: string;
      total: string;
      totalLabel: string;
      rows: { label: string; value: string; tone: Tone }[];
    };
  };
  analytics: { tabs: string[]; section: string; kpis: Kpi[] };
  users: {
    kpis: Kpi[];
    search: Filter;
    filters: Filter[];
    columns: { user: string; channels: string; subscriptions: string; registered: string };
    rows: UserRow[];
  };
  transactions: {
    kpis: Kpi[];
    filters: Filter[];
    period: string;
    columns: { order: string; amount: string; created: string; status: string };
    group: { label: string; count: number };
    rows: {
      symbol: string;
      plan: string;
      type: string;
      meta: string;
      amount: string;
      time: string;
      status: string;
      tone: Tone;
    }[];
  };
  plans: {
    description: string;
    count: string;
    filters: string[];
    create: string;
    priceFrom: string;
    items: {
      name: string;
      code: string;
      badges: { label: string; tone: Tone }[];
      price: string;
      per: string;
      traffic: string;
      strategy?: string;
      devices: string;
      durations: string[];
      availability: string;
      restricted?: boolean;
    }[];
  };
  events: {
    search: Filter;
    filters: Filter[];
    columns: { event: string; time: string; actor: string; ip: string };
    group: { label: string; count: number };
    rows: EventRow[];
  };
};

// Shared by both locales: only the dates are localised. Donors go in their own order of
// priority, so the first ones get the rows a visitor actually sees.
const userRows = (dates: string[], relative: string[]): UserRow[] => [
  { initials: 'RF', name: 'red flag', handle: '@redflag', channels: ['telegram', 'email'], subscriptions: [{ tone: 'success', count: 1 }], date: dates[0], relative: relative[0] },
  { initials: 'ME', name: 'My event Horizon', handle: '@eventhorizon', channels: ['telegram'], subscriptions: [{ tone: 'success', count: 2 }], date: dates[1], relative: relative[1] },
  { initials: 'DI', name: 'DIZZABLE', handle: '@dizzable', channels: ['telegram', 'login'], subscriptions: [{ tone: 'warning', count: 1 }], date: dates[2], relative: relative[2] },
  { initials: 'AN', name: 'Andrey', handle: '@andrey', channels: ['telegram'], subscriptions: [{ tone: 'success', count: 1 }], date: dates[3], relative: relative[3] },
  { initials: 'FI', name: 'Finskiy', handle: '—', channels: ['email'], subscriptions: [{ tone: 'error', count: 1 }], date: dates[4], relative: relative[4] },
  { initials: 'ДЕ', name: 'Демьяша', handle: '@demyasha', channels: ['telegram', 'email'], subscriptions: [{ tone: 'success', count: 1 }], date: dates[5], relative: relative[5] },
];

const eventRows = (labels: Record<EventRow['kind'], string>): EventRow[] => [
  { kind: 'purchase', event: labels.purchase, time: '14:28', actor: 'Arcadiy', ip: '—' },
  { kind: 'promocode', event: labels.promocode, time: '14:15', actor: 'Дмитрий Титов', ip: '—' },
  { kind: 'renew', event: labels.renew, time: '14:02', actor: 'Fedor', ip: '—' },
  { kind: 'login', event: labels.login, time: '13:49', actor: 'snoups', ip: '127.0.0.1' },
  { kind: 'register', event: labels.register, time: '13:31', actor: 'Miyano', ip: '—' },
  { kind: 'purchase', event: labels.purchase, time: '13:12', actor: 'Petr Sergeevich', ip: '—' },
];

const ru: Preview = {
  titles: {
    overview: 'Обзор',
    analytics: 'Аналитика',
    users: 'Пользователи',
    transactions: 'Транзакции',
    plans: 'Планы',
    events: 'Журнал событий',
  },
  header: { search: 'Поиск', login: 'snoups', role: 'Владелец', language: 'RU' },
  periods: ['7 дн.', '30 дн.', '90 дн.', 'Всё время'],
  overview: {
    updatedAt: 'обновлено в 14:32',
    kpis: [
      { label: 'Пользователи', value: '12 480', hint: '+184 сегодня' },
      { label: 'Активные платные', value: '3 912', hint: 'и 418 пробных' },
      { label: 'Онлайн', value: '1 207', hint: 'на 6 из 6 нод' },
      { label: 'Выручка сегодня', value: '84 300 ₽', trend: { text: '12,4%', hint: 'ко вчера в это же время' } },
    ],
    attention: {
      title: 'Требует внимания',
      description: 'Срочное сверху; пункт пропадает, когда проблема решена',
      rows: [{ title: 'Нода Германия-2 не на связи', sub: 'с 13:40' }],
    },
    revenue: { title: 'Выручка', description: 'Выручка за выбранный период', total: '1 942 600 ₽', orders: '642 оплаты' },
    subscriptions: {
      title: 'Подписки',
      description: 'Состояние сейчас',
      total: '5 591',
      totalLabel: 'всего',
      rows: [
        { label: 'Активные платные', value: '3 912', tone: 'success' },
        { label: 'Пробные', value: '418', tone: 'accent' },
        { label: 'На лимите трафика', value: '57', tone: 'warning' },
        { label: 'Истёкшие', value: '1 204', tone: 'error' },
      ],
    },
  },
  analytics: {
    tabs: ['Метрики', 'Выручка', 'Воронка', 'Пробный период', 'Удержание', 'LTV', 'Источники', 'Промокоды'],
    section: 'За период · сравнение с 8 авг. – 7 сент.',
    kpis: [
      { label: 'Выручка', value: '1 942 600 ₽', trend: { text: '12,4%', hint: 'к 1 728 300 ₽' } },
      { label: 'Доход на платящего', value: '2 840 ₽', hint: '684 плательщика', trend: { text: '4,1%', hint: 'к 2 728 ₽' } },
      { label: 'Новые плательщики', value: '642', trend: { text: '38', hint: 'к прошлому периоду' } },
      { label: 'Оплатили за 7 дней', value: '25,9%', trend: { text: '2,1 п.п.', hint: 'к прошлому периоду' } },
      { label: 'Отток платных', value: '6,8%', hint: '57 из 842 не продлили' },
    ],
  },
  users: {
    kpis: [
      { label: 'Всего', value: '12 480', trend: { text: '1 120', hint: 'за 30 дней' } },
      { label: 'Новые', value: '184', trend: { text: '23', hint: 'к прошлым 7 дн.' } },
      { label: 'С подпиской', value: '4 330', hint: 'Доля 34,7%' },
      { label: 'Заблокированы', value: '37', hint: 'Доля 0,3%' },
    ],
    search: { label: 'Поиск', value: 'Имя, @username, ID или email' },
    filters: [
      { label: 'Блокировка', value: 'Все' },
      { label: 'Подписка', value: 'Все' },
      { label: 'Триал', value: 'Все' },
    ],
    columns: { user: 'Пользователь', channels: 'Каналы', subscriptions: 'Подписки', registered: 'Регистрация' },
    rows: userRows(
      ['8 окт. 2026', '7 окт. 2026', '5 окт. 2026', '28 сент. 2026', '21 сент. 2026', '14 сент. 2026'],
      ['12 минут назад', 'вчера', '3 дня назад', '10 дней назад', '17 дней назад', '24 дня назад'],
    ),
  },
  transactions: {
    kpis: [
      { label: 'Транзакции', value: '1 386', hint: 'В ожидании: 12', trend: { text: '9%', hint: 'к прошлым 30 дн.' } },
      { label: 'Оплачено', value: '1 204', hint: 'Доля оплат 86,9%', trend: { text: '11%', hint: 'к прошлым 30 дн.' } },
      { label: 'Средний чек', value: '612 ₽', hint: 'Средняя скидка 8%' },
      { label: 'Выручка', value: '736 400 ₽', trend: { text: '14%', hint: 'к прошлым 30 дн.' } },
    ],
    filters: [
      { label: 'Статус', value: 'Все статусы' },
      { label: 'Шлюз', value: 'Все шлюзы' },
      { label: 'Тип покупки', value: 'Все типы' },
    ],
    period: 'Период',
    columns: { order: 'Транзакция', amount: 'Сумма', created: 'Создан', status: 'Статус' },
    group: { label: 'Сегодня', count: 24 },
    rows: [
      { symbol: '₽', plan: 'Премиум · 90d', type: 'Продление', meta: '#10482 · YooKassa', amount: '899 ₽', time: '14:28', status: 'Оплачен', tone: 'success' },
      { symbol: '★', plan: 'Стандарт · 30d', type: 'Новая покупка', meta: '#10481 · Telegram Stars', amount: '150 ★', time: '14:11', status: 'Оплачен', tone: 'success' },
      { symbol: '₽', plan: 'Премиум · 365d', type: 'Новая покупка', meta: '#10480 · CryptoPay', amount: '2 990 ₽', time: '13:57', status: 'Ожидает', tone: 'warning' },
      { symbol: '₽', plan: 'Старт · 30d', type: 'Смена плана', meta: '#10479 · Heleket', amount: '199 ₽', time: '13:40', status: 'Ошибка', tone: 'error' },
    ],
  },
  plans: {
    description: 'Клиенты видят планы в этом порядке. Перетащите карточку за ручку, чтобы изменить его.',
    count: '4 · активных: 4',
    filters: ['Все', 'Активные', 'Скрытые'],
    create: 'Новый план',
    priceFrom: 'от',
    items: [
      { name: 'Пробный', code: 'trial · Трафик и устройства', badges: [{ label: 'Пробный план', tone: 'warning' }], price: '0 ₽', per: '/ 3 дня', traffic: '10 GB', strategy: 'Без сброса', devices: '1 устройство', durations: ['3 дн.'], availability: 'Новые пользователи', restricted: true },
      { name: 'Старт', code: 'start · Трафик и устройства', badges: [], price: '199 ₽', per: '/ 30 дней', traffic: '100 GB', strategy: 'Ежемесячно', devices: '2 устройства', durations: ['30 дн.', '90 дн.', '180 дн.'], availability: 'Все' },
      { name: 'Стандарт', code: 'standard · Устройства', badges: [{ label: 'Хит', tone: 'accent' }], price: '299 ₽', per: '/ 30 дней', traffic: 'Без ограничений', devices: '3 устройства', durations: ['30 дн.', '90 дн.', '365 дн.'], availability: 'Все' },
      { name: 'Премиум', code: 'premium · Устройства', badges: [], price: '449 ₽', per: '/ 30 дней', traffic: 'Без ограничений', devices: '5 устройств', durations: ['30 дн.', '90 дн.', '365 дн.'], availability: 'Все' },
    ],
  },
  events: {
    search: { label: 'Инициатор', value: 'Имя, @username, ID или email' },
    filters: [
      { label: 'Тип', value: 'Все категории' },
      { label: 'С', value: 'С' },
      { label: 'По', value: 'По' },
    ],
    columns: { event: 'Событие', time: 'Время', actor: 'Инициатор', ip: 'IP-адрес' },
    group: { label: 'Сегодня', count: 128 },
    rows: eventRows({
      purchase: 'Подписка куплена',
      renew: 'Подписка продлена',
      promocode: 'Промокод активирован',
      login: 'Авторизация Passkey',
      register: 'Регистрация через Telegram',
      plan: 'План изменён',
    }),
  },
};

const en: Preview = {
  titles: {
    overview: 'Overview',
    analytics: 'Analytics',
    users: 'Users',
    transactions: 'Transactions',
    plans: 'Plans',
    events: 'Event log',
  },
  header: { search: 'Search', login: 'snoups', role: 'Owner', language: 'EN' },
  periods: ['7d', '30d', '90d', 'All time'],
  overview: {
    updatedAt: 'updated at 14:32',
    kpis: [
      { label: 'Users', value: '12,480', hint: '+184 today' },
      { label: 'Active paid', value: '3,912', hint: 'and 418 trials' },
      { label: 'Online', value: '1,207', hint: 'on 6 of 6 nodes' },
      { label: 'Revenue today', value: '$1,084', trend: { text: '12.4%', hint: 'vs yesterday at this time' } },
    ],
    attention: {
      title: 'Needs attention',
      description: 'Urgent first; an item disappears once the problem is resolved',
      rows: [{ title: 'Node Germany-2 is offline', sub: 'since 13:40' }],
    },
    revenue: { title: 'Revenue', description: 'Revenue for the selected period', total: '$24,960', orders: '642 payments' },
    subscriptions: {
      title: 'Subscriptions',
      description: 'Current state',
      total: '5,591',
      totalLabel: 'total',
      rows: [
        { label: 'Active paid', value: '3,912', tone: 'success' },
        { label: 'Trials', value: '418', tone: 'accent' },
        { label: 'Traffic limit reached', value: '57', tone: 'warning' },
        { label: 'Expired', value: '1,204', tone: 'error' },
      ],
    },
  },
  analytics: {
    tabs: ['Metrics', 'Revenue', 'Funnel', 'Trial', 'Retention', 'LTV', 'Sources', 'Promocodes'],
    section: 'For the period · compared with Aug 8 – Sep 7',
    kpis: [
      { label: 'Revenue', value: '$24,960', trend: { text: '12.4%', hint: 'vs $22,208' } },
      { label: 'Revenue per payer', value: '$36.49', hint: '684 payers', trend: { text: '4.1%', hint: 'vs $35.05' } },
      { label: 'New payers', value: '642', trend: { text: '38', hint: 'vs previous period' } },
      { label: 'Paid within 7 days', value: '25.9%', trend: { text: '2.1 pp', hint: 'vs previous period' } },
      { label: 'Paid churn', value: '6.8%', hint: '57 of 842 did not renew' },
    ],
  },
  users: {
    kpis: [
      { label: 'Total', value: '12,480', trend: { text: '1,120', hint: 'last 30 days' } },
      { label: 'New', value: '184', trend: { text: '23', hint: 'vs. prior 7 days' } },
      { label: 'Subscribed', value: '4,330', hint: 'Share 34.7%' },
      { label: 'Blocked', value: '37', hint: 'Share 0.3%' },
    ],
    search: { label: 'Search', value: 'Name, @username, ID or email' },
    filters: [
      { label: 'Blocked', value: 'All' },
      { label: 'Subscription', value: 'All' },
      { label: 'Trial', value: 'All' },
    ],
    columns: { user: 'User', channels: 'Channels', subscriptions: 'Subscriptions', registered: 'Registered' },
    rows: userRows(
      ['Oct 8, 2026', 'Oct 7, 2026', 'Oct 5, 2026', 'Sep 28, 2026', 'Sep 21, 2026', 'Sep 14, 2026'],
      ['12 minutes ago', 'yesterday', '3 days ago', '10 days ago', '17 days ago', '24 days ago'],
    ),
  },
  transactions: {
    kpis: [
      { label: 'Transactions', value: '1,386', hint: 'Pending: 12', trend: { text: '9%', hint: 'vs. prior 30 days' } },
      { label: 'Paid', value: '1,204', hint: 'Paid share 86.9%', trend: { text: '11%', hint: 'vs. prior 30 days' } },
      { label: 'Average check', value: '$7.65', hint: 'Average discount 8%' },
      { label: 'Revenue', value: '$9,210', trend: { text: '14%', hint: 'vs. prior 30 days' } },
    ],
    filters: [
      { label: 'Status', value: 'All statuses' },
      { label: 'Gateway', value: 'All gateways' },
      { label: 'Purchase type', value: 'All types' },
    ],
    period: 'Period',
    columns: { order: 'Transaction', amount: 'Amount', created: 'Created', status: 'Status' },
    group: { label: 'Today', count: 24 },
    rows: [
      { symbol: '$', plan: 'Premium · 90d', type: 'Renewal', meta: '#10482 · YooKassa', amount: '$11.99', time: '14:28', status: 'Paid', tone: 'success' },
      { symbol: '★', plan: 'Standard · 30d', type: 'New', meta: '#10481 · Telegram Stars', amount: '150 ★', time: '14:11', status: 'Paid', tone: 'success' },
      { symbol: '$', plan: 'Premium · 365d', type: 'New', meta: '#10480 · CryptoPay', amount: '$39.99', time: '13:57', status: 'Pending', tone: 'warning' },
      { symbol: '$', plan: 'Starter · 30d', type: 'Change', meta: '#10479 · Heleket', amount: '$2.49', time: '13:40', status: 'Failed', tone: 'error' },
    ],
  },
  plans: {
    description: 'Plans are shown to customers in this order. Drag a card by its handle to reorder.',
    count: '4 · 4 active',
    filters: ['All', 'Active', 'Hidden'],
    create: 'New plan',
    priceFrom: 'from',
    items: [
      { name: 'Trial', code: 'trial · Both', badges: [{ label: 'Trial plan', tone: 'warning' }], price: '$0', per: '/ 3 days', traffic: '10 GB', strategy: 'No reset', devices: '1 device', durations: ['3d'], availability: 'New users', restricted: true },
      { name: 'Starter', code: 'start · Both', badges: [], price: '$2.49', per: '/ 30 days', traffic: '100 GB', strategy: 'Monthly', devices: '2 devices', durations: ['30d', '90d', '180d'], availability: 'Everyone' },
      { name: 'Standard', code: 'standard · Devices', badges: [{ label: 'Hit', tone: 'accent' }], price: '$3.99', per: '/ 30 days', traffic: 'Unlimited', devices: '3 devices', durations: ['30d', '90d', '365d'], availability: 'Everyone' },
      { name: 'Premium', code: 'premium · Devices', badges: [], price: '$5.99', per: '/ 30 days', traffic: 'Unlimited', devices: '5 devices', durations: ['30d', '90d', '365d'], availability: 'Everyone' },
    ],
  },
  events: {
    search: { label: 'Initiator', value: 'Name, @username, ID or email' },
    filters: [
      { label: 'Type', value: 'All categories' },
      { label: 'From', value: 'From' },
      { label: 'To', value: 'To' },
    ],
    columns: { event: 'Event', time: 'Time', actor: 'Initiator', ip: 'IP address' },
    group: { label: 'Today', count: 128 },
    rows: eventRows({
      purchase: 'Subscription purchased',
      renew: 'Subscription renewed',
      promocode: 'Promocode activated',
      login: 'Passkey login',
      register: 'Telegram sign-up',
      plan: 'Plan changed',
    }),
  },
};

export function getPreview(lang: string) {
  return lang === 'en' ? en : ru;
}
