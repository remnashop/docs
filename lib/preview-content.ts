// Illustrative figures for the dashboard mock, not live data; the people in it are the
// project's donors, by their own nicknames.

export type PreviewScreen = 'overview' | 'analytics' | 'users' | 'transactions' | 'plans' | 'events';

export type Tone = 'success' | 'warning' | 'error' | 'neutral' | 'accent' | 'violet';

// lead: the hint's green opening figure ("+184 today"); down: a fall that is good news (churn);
// info: a help mark after the label
type Kpi = {
  label: string;
  info?: boolean;
  value: string;
  hint?: string;
  lead?: string;
  trend?: { text: string; hint: string; down?: boolean };
};

type UserRow = {
  initials: string;
  name: string;
  id: number;
  contacts: string;
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
  actorId: number;
  ip: string;
};

export type Preview = {
  titles: Record<PreviewScreen, string>;
  header: { login: string; role: string };
  periods: string[];
  overview: {
    updatedAt: string;
    kpis: Kpi[];
    attention: { title: string; description: string; status: string; rows: { title: string; sub: string }[] };
    // chart: the selected 7 days, today last and still running; ticks top to bottom, as recharts prints them
    revenue: {
      title: string;
      description: string;
      total: string;
      orders: string;
      chart: { days: string[]; values: number[]; ticks: string[] };
    };
    subscriptions: {
      title: string;
      description: string;
      total: string;
      totalLabel: string;
      rows: { label: string; value: string; tone: Tone; divided?: boolean }[];
    };
  };
  analytics: { tabs: string[]; section: string; kpis: Kpi[]; nowSection: string; now: Kpi[] };
  users: {
    kpis: Kpi[];
    search: string;
    filters: string[];
    columns: { user: string; channels: string; subscriptions: string; registered: string };
    rows: UserRow[];
  };
  transactions: {
    kpis: Kpi[];
    filters: string[];
    columns: { order: string; type: string; amount: string; created: string; status: string };
    group: { label: string; count: number };
    rows: {
      symbol: string;
      plan: string;
      id: number;
      user: string;
      userId: number;
      gateway: string;
      type: string;
      amount: string;
      time: string;
      status: string;
      tone: Tone;
    }[];
  };
  plans: {
    filters: string[];
    create: string;
    priceFrom: string;
    items: {
      name: string;
      trial?: boolean;
      // switched off: the card's text is muted
      inactive?: boolean;
      badges: { label: string; tone: Tone }[];
      price: string;
      per: string;
      traffic: string;
      devices: string;
      durations: string[];
    }[];
  };
  events: {
    search: string;
    filters: string[];
    columns: { event: string; time: string; actor: string; ip: string };
    group: { label: string; count: number };
    rows: EventRow[];
  };
};

// One shop behind every screen, so the figures agree across them. "Now" is Oct 8, 2026, 14:32:
// 12,480 users (+41 today, +1,120 in 30 days); 3,969 paid subscriptions (3,912 active and 57 at
// their traffic limit) held by 3,840 customers, plus 418 trials; plans cost 199–449 ₽ a month,
// so MRR is about 290 ₽ a subscription; the last 30 days took 1,284,600 ₽ from 1,204 payments.
// The newest transactions and events are the same purchases seen from both pages. Donors go in
// their own order of priority, so the first ones get the rows a visitor actually sees.
const userRows = (dates: string[], relative: string[]): UserRow[] => [
  { initials: 'RF', name: 'red flag', id: 412, contacts: 'TG: 6815203947', channels: ['telegram'], subscriptions: [{ tone: 'success', count: 1 }], date: dates[0], relative: relative[0] },
  { initials: 'ME', name: 'My event Horizon', id: 398, contacts: 'TG: 5294718360', channels: ['telegram'], subscriptions: [{ tone: 'success', count: 2 }], date: dates[1], relative: relative[1] },
  { initials: 'DI', name: 'DIZZABLE', id: 377, contacts: 'TG: 1048276593', channels: ['telegram', 'login'], subscriptions: [{ tone: 'warning', count: 1 }], date: dates[2], relative: relative[2] },
  { initials: 'AN', name: 'Andrey', id: 301, contacts: 'TG: 843915627', channels: ['telegram'], subscriptions: [{ tone: 'success', count: 1 }], date: dates[3], relative: relative[3] },
  { initials: 'FI', name: 'Finskiy', id: 255, contacts: '—', channels: ['email'], subscriptions: [{ tone: 'error', count: 1 }], date: dates[4], relative: relative[4] },
  { initials: 'ДЕ', name: 'Демьяша', id: 190, contacts: 'TG: 7392058146 · Email: demyasha@mail.ru', channels: ['telegram', 'email'], subscriptions: [{ tone: 'success', count: 1 }], date: dates[5], relative: relative[5] },
];

// red flag signs up at 14:20 and buys at 14:28, Andrey buys at 14:11: the transactions page's
// first rows. Purchases before 13:40 sit below the four transactions it shows.
const eventRows = (labels: Record<EventRow['kind'], string>, times: string[]): EventRow[] => [
  { kind: 'purchase', event: labels.purchase, time: times[0], actor: 'red flag', actorId: 412, ip: '—' },
  { kind: 'register', event: labels.register, time: times[1], actor: 'red flag', actorId: 412, ip: '—' },
  { kind: 'promocode', event: labels.promocode, time: times[2], actor: 'Дмитрий Титов', actorId: 214, ip: '—' },
  { kind: 'purchase', event: labels.purchase, time: times[3], actor: 'Andrey', actorId: 301, ip: '—' },
  { kind: 'login', event: labels.login, time: times[4], actor: 'snoups', actorId: 1, ip: '127.0.0.1' },
  { kind: 'renew', event: labels.renew, time: times[5], actor: 'Fedor', actorId: 87, ip: '—' },
  { kind: 'purchase', event: labels.purchase, time: times[6], actor: 'Arcadiy', actorId: 128, ip: '—' },
  { kind: 'promocode', event: labels.promocode, time: times[7], actor: 'Miyano', actorId: 342, ip: '—' },
  { kind: 'renew', event: labels.renew, time: times[8], actor: 'Petr Sergeevich', actorId: 56, ip: '—' },
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
  header: { login: 'snoups', role: 'Владелец' },
  periods: ['7 дн.', '30 дн.', '90 дн.', 'Всё время'],
  overview: {
    updatedAt: 'обновлено в 14:32',
    kpis: [
      { label: 'Пользователи', value: '12 480', lead: '+41', hint: 'сегодня' },
      { label: 'Активные подписки', value: '4 330', hint: 'Из них 418 пробных' },
      { label: 'Онлайн', value: '1 207', hint: 'На 5 из 6 узлов' },
      {
        label: 'Выручка сегодня',
        value: '41 300 ₽',
        hint: 'Вчера к этому времени: 36 700 ₽',
        trend: { text: '12,5%', hint: 'ко вчера в это же время' },
      },
    ],
    attention: {
      title: 'Требует внимания',
      description: 'Ошибки и предупреждения по работе магазина',
      status: 'Срочно · 1',
      rows: [{ title: 'Соединение с узлом «RU-1» потеряно', sub: 'Нет связи с 08.10.2026 13:40' }],
    },
    revenue: {
      title: 'Выручка',
      description: 'Сумма оплат за выбранный период',
      total: '304 700 ₽',
      orders: '286 транзакций',
      chart: {
        days: ['02.10', '03.10', '04.10', '05.10', '06.10', '07.10', '08.10'],
        values: [42100, 44600, 39800, 47200, 45900, 43800, 41300],
        ticks: ['60000', '45000', '30000', '15000', '0'],
      },
    },
    subscriptions: {
      title: 'Подписки',
      description: 'Количество подписок по статусам',
      total: '5 495',
      totalLabel: 'всего',
      rows: [
        { label: 'Активные', value: '3 912', tone: 'accent' },
        { label: 'Пробные', value: '418', tone: 'success' },
        { label: 'На лимите', value: '57', tone: 'warning', divided: true },
        { label: 'Истекают в ближайшие 7 дней', value: '96', tone: 'error' },
        { label: 'Истёкшие', value: '1 108', tone: 'neutral' },
      ],
    },
  },
  analytics: {
    tabs: ['Метрики', 'Выручка', 'Воронка', 'Пробный период', 'Удержание', 'LTV', 'Источники', 'Промокоды'],
    section: 'За период · сравнение с 10 авг. – 8 сент.',
    kpis: [
      { label: 'Выручка', value: '1 284 600 ₽', hint: 'Платили 1 142 · 1 125 ₽ на платящего', trend: { text: '12,4%', hint: 'к прошлому периоду' } },
      { label: 'Новые платящие', value: '642', trend: { text: '38', hint: 'к прошлому периоду' } },
      { label: 'Оплатили за 7 дней', value: '25,9%', hint: 'От зарегистрированных до 1 окт.', trend: { text: '2,1 п.п.', hint: 'к прошлому периоду' } },
      { label: 'Отток платных', value: '6,8%', hint: '57 из 842 не продлили', trend: { text: '0,8 п.п.', hint: 'к прошлому периоду', down: true } },
    ],
    nowSection: 'Сейчас',
    now: [
      { label: 'MRR', info: true, value: '1 151 000 ₽', hint: 'Платные подписки в месяц, с упёршимися в лимит' },
      { label: 'Доход на клиента', info: true, value: '300 ₽' },
      { label: 'Платящие клиенты', value: '3 840', hint: 'С живой платной подпиской' },
      { label: 'Платные подписки', value: '3 969', hint: 'Из них 57 на лимите трафика' },
      { label: 'Оплатили, не подключились', value: '23', hint: 'Платные подписки без единого подключения' },
      { label: 'Истекают за 7 дней', value: '96', hint: '27 800 ₽ MRR, если не продлят' },
      { label: 'Активные пробные', value: '418', hint: 'Из них 64 заканчиваются за 3 дня' },
      { label: 'На балансах клиентов', value: '12 450 баллов', hint: 'и 380 бонусных дней' },
    ],
  },
  users: {
    kpis: [
      { label: 'Всего', value: '12 480', hint: 'За всё время', trend: { text: '1 120', hint: 'за 30 дней' } },
      { label: 'С подпиской', value: '4 258', hint: 'Доля 34,1%' },
      { label: 'Отток', value: '2 140', hint: 'Доля 17,1%' },
      { label: 'Заблокированы', value: '37', hint: 'Доля 0,3%' },
    ],
    search: 'Имя, ID или email',
    filters: ['Блокировка: все', 'Подписка: все', 'Пробный: все'],
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
      { label: 'Средний чек', value: '1 067 ₽', hint: 'Средняя скидка 8%' },
      { label: 'Выручка', value: '1 284 600 ₽', trend: { text: '12,4%', hint: 'к прошлым 30 дн.' } },
    ],
    filters: ['Все статусы', 'Все шлюзы', 'Все типы'],
    columns: { order: 'Транзакция', type: 'Тип', amount: 'Сумма', created: 'Создана', status: 'Статус' },
    group: { label: 'Сегодня', count: 46 },
    rows: [
      { symbol: '₽', plan: 'Премиум · 90 дн.', id: 10482, user: 'red flag', userId: 412, gateway: 'YooKassa', type: 'Новая покупка', amount: '1 199 ₽', time: '14:28', status: 'Оплачена', tone: 'success' },
      { symbol: '★', plan: 'Стандарт · 30 дн.', id: 10481, user: 'Andrey', userId: 301, gateway: 'Telegram Stars', type: 'Новая покупка', amount: '150 ★', time: '14:11', status: 'Оплачена', tone: 'success' },
      { symbol: '₽', plan: 'Премиум · 365 дн.', id: 10480, user: 'DIZZABLE', userId: 377, gateway: 'CryptoPay', type: 'Новая покупка', amount: '4 290 ₽', time: '13:57', status: 'Ожидает', tone: 'warning' },
      { symbol: '₽', plan: 'Старт · 30 дн.', id: 10479, user: 'Демьяша', userId: 190, gateway: 'Heleket', type: 'Смена плана', amount: '199 ₽', time: '13:40', status: 'Ошибка', tone: 'error' },
    ],
  },
  plans: {
    filters: ['Все', 'Активные', 'Скрытые'],
    create: 'Новый план',
    priceFrom: 'от',
    items: [
      { name: 'Пробный', trial: true, badges: [{ label: 'Пробный', tone: 'warning' }], price: '0 ₽', per: '/ 3 дня', traffic: '10 ГБ', devices: '1 устройство', durations: ['3 дн.'] },
      { name: 'Старт', badges: [], price: '199 ₽', per: '/ 30 дней', traffic: '100 ГБ', devices: '2 устройства', durations: ['30 дн.', '90 дн.', '180 дн.'] },
      { name: 'Стандарт', badges: [{ label: 'Популярно', tone: 'accent' }], price: '299 ₽', per: '/ 30 дней', traffic: '∞', devices: '3 устройства', durations: ['30 дн.', '90 дн.', '365 дн.'] },
      { name: 'Премиум', badges: [], price: '449 ₽', per: '/ 30 дней', traffic: '∞', devices: '5 устройств', durations: ['30 дн.', '90 дн.', '365 дн.'] },
      { name: 'Семейный', inactive: true, badges: [{ label: 'Выгодно', tone: 'accent' }], price: '599 ₽', per: '/ 30 дней', traffic: '∞', devices: '8 устройств', durations: ['30 дн.', '365 дн.'] },
      { name: 'Летний', inactive: true, badges: [], price: '149 ₽', per: '/ 30 дней', traffic: '50 ГБ', devices: '1 устройство', durations: ['30 дн.'] },
    ],
  },
  events: {
    search: 'Имя, @username, ID или email',
    filters: ['Все категории', 'С', 'По'],
    columns: { event: 'Событие', time: 'Время', actor: 'Инициатор', ip: 'IP-адрес' },
    group: { label: 'Сегодня', count: 128 },
    rows: eventRows(
      {
        purchase: 'Подписка куплена',
        renew: 'Подписка продлена',
        promocode: 'Промокод активирован',
        login: 'Вход в панель управления (Passkey)',
        register: 'Регистрация в боте',
        plan: 'План изменён',
      },
      ['14:28', '14:20', '14:15', '14:11', '13:49', '13:31', '13:12', '12:54', '12:40'],
    ),
  },
};

// Same shop in dollars (about 80 ₽ to the dollar), times in the 12-hour clock the dashboard's
// en locale prints.
const en: Preview = {
  titles: {
    overview: 'Overview',
    analytics: 'Analytics',
    users: 'Users',
    transactions: 'Transactions',
    plans: 'Plans',
    events: 'Event log',
  },
  header: { login: 'snoups', role: 'Owner' },
  periods: ['7d', '30d', '90d', 'All time'],
  overview: {
    updatedAt: 'updated at 02:32 PM',
    kpis: [
      { label: 'Users', value: '12,480', lead: '+41', hint: 'today' },
      { label: 'Active subscriptions', value: '4,330', hint: 'Including 418 trials' },
      { label: 'Online', value: '1,207', hint: 'On 5 of 6 nodes' },
      {
        label: 'Revenue today',
        value: '$516',
        hint: 'Yesterday by now: $459',
        trend: { text: '12.4%', hint: 'vs yesterday at this time' },
      },
    ],
    attention: {
      title: 'Needs attention',
      description: 'Errors and warnings about the shop’s operation',
      status: 'Urgent · 1',
      rows: [{ title: 'Connection to node “RU-1” lost', sub: 'No connection since 10/08/2026 01:40 PM' }],
    },
    revenue: {
      title: 'Revenue',
      description: 'Paid total for the selected period',
      total: '$3,811',
      orders: '286 transactions',
      chart: {
        days: ['10/02', '10/03', '10/04', '10/05', '10/06', '10/07', '10/08'],
        values: [527, 558, 498, 590, 574, 548, 516],
        ticks: ['800', '600', '400', '200', '0'],
      },
    },
    subscriptions: {
      title: 'Subscriptions',
      description: 'Subscriptions by status',
      total: '5,495',
      totalLabel: 'total',
      rows: [
        { label: 'Active', value: '3,912', tone: 'accent' },
        { label: 'Trials', value: '418', tone: 'success' },
        { label: 'At limit', value: '57', tone: 'warning', divided: true },
        { label: 'Expiring within 7 days', value: '96', tone: 'error' },
        { label: 'Expired', value: '1,108', tone: 'neutral' },
      ],
    },
  },
  analytics: {
    tabs: ['Metrics', 'Revenue', 'Funnel', 'Trial', 'Retention', 'LTV', 'Sources', 'Promocodes'],
    section: 'For the period · compared with Aug 10 – Sep 8',
    kpis: [
      { label: 'Revenue', value: '$16,060', hint: '1,142 paid · $14.06 per payer', trend: { text: '12.4%', hint: 'vs previous period' } },
      { label: 'New payers', value: '642', trend: { text: '38', hint: 'vs previous period' } },
      { label: 'Paid within 7 days', value: '25.9%', hint: 'Of registered up to Oct 1', trend: { text: '2.1 pp', hint: 'vs previous period' } },
      { label: 'Paid churn', value: '6.8%', hint: '57 of 842 did not renew', trend: { text: '0.8 pp', hint: 'vs previous period', down: true } },
    ],
    nowSection: 'Right now',
    now: [
      { label: 'MRR', info: true, value: '$14,410', hint: 'Paid subscriptions per month, limited ones included' },
      { label: 'Income per customer', info: true, value: '$3.75' },
      { label: 'Paying customers', value: '3,840', hint: 'With a live paid subscription' },
      { label: 'Paid subscriptions', value: '3,969', hint: '57 of them at the traffic limit' },
      { label: 'Paid, never connected', value: '23', hint: 'Paid subscriptions with no connection yet' },
      { label: 'Expiring in 7 days', value: '96', hint: '$348 MRR unless renewed' },
      { label: 'Active trials', value: '418', hint: '64 of them end within 3 days' },
      { label: 'On customer balances', value: '12,450 points', hint: 'and 380 bonus days' },
    ],
  },
  users: {
    kpis: [
      { label: 'Total', value: '12,480', hint: 'All time', trend: { text: '1,120', hint: 'last 30 days' } },
      { label: 'Subscribed', value: '4,258', hint: 'Share 34.1%' },
      { label: 'Churned', value: '2,140', hint: 'Share 17.1%' },
      { label: 'Blocked', value: '37', hint: 'Share 0.3%' },
    ],
    search: 'Name, ID or email',
    filters: ['Blocked: all', 'Subscription: all', 'Trial: all'],
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
      { label: 'Average check', value: '$13.34', hint: 'Average discount 8%' },
      { label: 'Revenue', value: '$16,060', trend: { text: '12.4%', hint: 'vs. prior 30 days' } },
    ],
    filters: ['All statuses', 'All gateways', 'All types'],
    columns: { order: 'Transaction', type: 'Type', amount: 'Amount', created: 'Created', status: 'Status' },
    group: { label: 'Today', count: 46 },
    rows: [
      { symbol: '$', plan: 'Premium · 90d', id: 10482, user: 'red flag', userId: 412, gateway: 'YooKassa', type: 'New', amount: '$14.99', time: '02:28 PM', status: 'Paid', tone: 'success' },
      { symbol: '★', plan: 'Standard · 30d', id: 10481, user: 'Andrey', userId: 301, gateway: 'Telegram Stars', type: 'New', amount: '150 ★', time: '02:11 PM', status: 'Paid', tone: 'success' },
      { symbol: '$', plan: 'Premium · 365d', id: 10480, user: 'DIZZABLE', userId: 377, gateway: 'CryptoPay', type: 'New', amount: '$54.99', time: '01:57 PM', status: 'Pending', tone: 'warning' },
      { symbol: '$', plan: 'Starter · 30d', id: 10479, user: 'Демьяша', userId: 190, gateway: 'Heleket', type: 'Change', amount: '$2.49', time: '01:40 PM', status: 'Failed', tone: 'error' },
    ],
  },
  plans: {
    filters: ['All', 'Active', 'Hidden'],
    create: 'New plan',
    priceFrom: 'from',
    items: [
      { name: 'Trial', trial: true, badges: [{ label: 'Trial', tone: 'warning' }], price: '$0', per: '/ 3 days', traffic: '10 GB', devices: '1 device', durations: ['3d'] },
      { name: 'Starter', badges: [], price: '$2.49', per: '/ 30 days', traffic: '100 GB', devices: '2 devices', durations: ['30d', '90d', '180d'] },
      { name: 'Standard', badges: [{ label: 'Popular', tone: 'accent' }], price: '$3.99', per: '/ 30 days', traffic: '∞', devices: '3 devices', durations: ['30d', '90d', '365d'] },
      { name: 'Premium', badges: [], price: '$5.99', per: '/ 30 days', traffic: '∞', devices: '5 devices', durations: ['30d', '90d', '365d'] },
      { name: 'Family', inactive: true, badges: [{ label: 'Best value', tone: 'accent' }], price: '$7.99', per: '/ 30 days', traffic: '∞', devices: '8 devices', durations: ['30d', '365d'] },
      { name: 'Summer', inactive: true, badges: [], price: '$1.99', per: '/ 30 days', traffic: '50 GB', devices: '1 device', durations: ['30d'] },
    ],
  },
  events: {
    search: 'Name, @username, ID or email',
    filters: ['All categories', 'From', 'To'],
    columns: { event: 'Event', time: 'Time', actor: 'Initiator', ip: 'IP address' },
    group: { label: 'Today', count: 128 },
    rows: eventRows(
      {
        purchase: 'Subscription purchased',
        renew: 'Subscription renewed',
        promocode: 'Promocode activated',
        login: 'Dashboard sign-in (passkey)',
        register: 'Bot sign-up',
        plan: 'Plan changed',
      },
      ['02:28 PM', '02:20 PM', '02:15 PM', '02:11 PM', '01:49 PM', '01:31 PM', '01:12 PM', '12:54 PM', '12:40 PM'],
    ),
  },
};

export function getPreview(lang: string) {
  return lang === 'en' ? en : ru;
}
