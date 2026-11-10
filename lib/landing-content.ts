import { withLocale } from './i18n';

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type Landing = {
  hero: { note: string; title: string; subtitle: string; primaryCta: string; githubCta: string; telegramCta: string };
  featuresHeading: string;
  featuresMore: string;
  features: Feature[];
  quickStart: {
    title: string;
    description: string;
    docsCta: string;
    steps: { title: string; hint?: string; code?: string }[];
  };
};

const ru: Landing = {
  hero: {
    note: 'Бесплатно · открытый код · MIT',
    title: 'Готовая платформа для продажи VPN-подписок',
    subtitle:
      'Принимайте платежи, выдавайте VPN-доступ и управляйте клиентами автоматически. Telegram-бот и веб-кабинет для клиентов, панель управления для вас.',
    primaryCta: 'Документация',
    githubCta: 'GitHub',
    telegramCta: 'Telegram',
  },
  featuresHeading: 'Всё, что нужно для продажи подписок',
  featuresMore: 'Все возможности',
  features: [
    {
      icon: 'ChartColumn',
      title: 'Аналитика и мониторинг',
      description: 'Отчёты с когортами и сравнением периодов. Ключевые метрики, состояние нод и нагрузка на сервер.',
    },
    {
      icon: 'CreditCard',
      title: '23 платёжных шлюза',
      description: 'Telegram Stars, YooKassa, CryptoPay, Cryptomus, Heleket, Valutix и другие. Гибкая система ценообразования.',
    },
    {
      icon: 'Network',
      title: 'Интеграция с Remnawave',
      description: 'Двусторонняя синхронизация с панелью Remnawave. Выдача, продление, устройства и сброс трафика прямо из панели управления.',
    },
    {
      icon: 'Package',
      title: 'Планы и триалы',
      description: 'Конфигуратор планов с лимитами по трафику и устройствам, любой длительностью и сквадами. Бесплатный или платный пробный период.',
    },
    {
      icon: 'Ticket',
      title: 'Скидки и промокоды',
      description: 'Персональная скидка, разовая скидка на покупку и уровни лояльности. Промокоды на дни, трафик, устройства, подписку или скидку.',
    },
    {
      icon: 'Share2',
      title: 'Рефералы и реклама',
      description: 'Трёхуровневая программа с бонусными днями или баллами и наградой приглашённому. Рекламные ссылки с аналитикой.',
    },
    {
      icon: 'Megaphone',
      title: 'Рассылки и уведомления',
      description: 'Рассылки по сегментам аудитории с медиа и кнопками. Уведомления администраторам в панели, веб-пушем и в Telegram.',
    },
    {
      icon: 'MessagesSquare',
      title: 'Редактор бота',
      description: 'Визуальный конструктор сообщений и кнопок бота с переменными и премиум эмодзи.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Доступ и безопасность',
      description: 'Три режима доступа, правила и подписка на канал, чёрный список. Авторизация через OAuth.',
    },
    {
      icon: 'Palette',
      title: 'Свой бренд',
      description: 'Название, логотип, фавикон и акцентный цвет. Фоновый шейдер под ваш стиль.',
    },
    {
      icon: 'KeyRound',
      title: 'API-токены',
      description: 'Подключайте свои сервисы через API: токены с нужными правами и сроком действия.',
    },
    {
      icon: 'MonitorSmartphone',
      title: 'Веб-кабинет',
      description:
        'Покупка и продление подписки, устройства и история платежей. Открывается в браузере или как Mini App в Telegram.',
    },
  ],
  quickStart: {
    title: 'Быстрый старт',
    description: 'Три шага до развёртывания на вашем сервере.',
    docsCta: 'Полная инструкция по установке',
    steps: [
      {
        title: 'Скачать конфигурацию',
        code: `mkdir -p /opt/remnashop && cd /opt/remnashop
curl -o .env https://raw.githubusercontent.com/remnashop/remnashop/refs/heads/main/.env.example
curl -o docker-compose.yml https://raw.githubusercontent.com/remnashop/remnashop/refs/heads/main/docker-compose.prod.internal.yml`,
      },
      {
        title: 'Заполнить .env',
        hint: 'Затем укажите домен и доступ к панели Remnawave: API-токен и секрет вебхука. Сохраните APP_CRYPT_KEY в надёжном месте: его нельзя менять после первого запуска.',
        code: `sed -i "s|^APP_CRYPT_KEY=change_me$|APP_CRYPT_KEY=$(openssl rand -base64 32)|; s|^APP_JWT_SECRET=change_me$|APP_JWT_SECRET=$(openssl rand -base64 48 | tr -d '\\n')|; s|^DATABASE_PASSWORD=change_me$|DATABASE_PASSWORD=$(openssl rand -hex 24)|; s|^# REDIS_PASSWORD=.*|REDIS_PASSWORD=$(openssl rand -hex 24)|" .env`,
      },
      {
        title: 'Запустить',
        hint: 'Затем откройте ваш домен в браузере и создайте аккаунт владельца.',
        code: 'docker compose up -d && docker compose logs -f -t',
      },
    ],
  },
};

const en: Landing = {
  hero: {
    note: 'Free · Open source · MIT',
    title: 'A ready-made platform for selling VPN subscriptions',
    subtitle:
      'Take payments, issue VPN access and manage customers automatically. A Telegram bot and a web cabinet for customers, a dashboard for you.',
    primaryCta: 'Documentation',
    githubCta: 'GitHub',
    telegramCta: 'Telegram',
  },
  featuresHeading: 'Everything you need to sell subscriptions',
  featuresMore: 'All features',
  features: [
    {
      icon: 'ChartColumn',
      title: 'Analytics and monitoring',
      description: 'Reports with cohorts and period comparison. Key metrics, node status and server load.',
    },
    {
      icon: 'CreditCard',
      title: '23 payment gateways',
      description: 'Telegram Stars, YooKassa, CryptoPay, Cryptomus, Heleket, Valutix and more. A flexible pricing system.',
    },
    {
      icon: 'Network',
      title: 'Remnawave integration',
      description: 'Two-way sync with the panel. Grant, extend, manage devices and reset traffic right from the dashboard.',
    },
    {
      icon: 'Package',
      title: 'Plans and trials',
      description: 'A plan configurator with traffic and device limits, any duration and squads. A free or paid trial period.',
    },
    {
      icon: 'Ticket',
      title: 'Discounts and promo codes',
      description: 'Personal discounts, one-time purchase discounts and loyalty tiers. Promo codes for days, traffic, devices, a subscription or a discount.',
    },
    {
      icon: 'Share2',
      title: 'Referrals and ads',
      description: 'A three-level program with bonus days or points and an invitee reward. Ad links with analytics.',
    },
    {
      icon: 'Megaphone',
      title: 'Broadcasts and notifications',
      description: 'Segmented broadcasts with media and buttons. Admin notifications in the dashboard, by web push and in Telegram.',
    },
    {
      icon: 'MessagesSquare',
      title: 'Bot editor',
      description: 'A visual editor for bot messages and buttons with variables and premium emoji.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Access and security',
      description: 'Three access modes, rules and a channel requirement, a blacklist. Sign-in through OAuth.',
    },
    {
      icon: 'Palette',
      title: 'Your own brand',
      description: 'Name, logo, favicon and accent color. A background shader to match your style.',
    },
    {
      icon: 'KeyRound',
      title: 'API tokens',
      description: 'Connect your own services through the API: tokens with the permissions and lifetime you choose.',
    },
    {
      icon: 'MonitorSmartphone',
      title: 'Web cabinet',
      description:
        'Buy and renew a subscription, manage devices and see payments. Opens in a browser or as a Telegram Mini App.',
    },
  ],
  quickStart: {
    title: 'Quick start',
    description: 'Three steps to deploy on your server.',
    docsCta: 'Full installation guide',
    steps: [
      {
        title: 'Download the configuration',
        code: `mkdir -p /opt/remnashop && cd /opt/remnashop
curl -o .env https://raw.githubusercontent.com/remnashop/remnashop/refs/heads/main/.env.example
curl -o docker-compose.yml https://raw.githubusercontent.com/remnashop/remnashop/refs/heads/main/docker-compose.prod.internal.yml`,
      },
      {
        title: 'Fill in .env',
        hint: 'Then set the domain and access to the Remnawave panel: the API token and the webhook secret. Keep APP_CRYPT_KEY somewhere safe: it must never change after the first start.',
        code: `sed -i "s|^APP_CRYPT_KEY=change_me$|APP_CRYPT_KEY=$(openssl rand -base64 32)|; s|^APP_JWT_SECRET=change_me$|APP_JWT_SECRET=$(openssl rand -base64 48 | tr -d '\\n')|; s|^DATABASE_PASSWORD=change_me$|DATABASE_PASSWORD=$(openssl rand -hex 24)|; s|^# REDIS_PASSWORD=.*|REDIS_PASSWORD=$(openssl rand -hex 24)|" .env`,
      },
      {
        title: 'Start it',
        hint: 'Then open your domain in a browser and create the owner account.',
        code: 'docker compose up -d && docker compose logs -f -t',
      },
    ],
  },
};

export function getLanding(lang: string) {
  return lang === 'en' ? en : ru;
}

// The docs entry point is the introduction, not the bare /docs index.
export function getDocsHref(lang: string) {
  return withLocale(lang, '/docs/overview/introduction');
}

export function getInstallHref(lang: string) {
  return withLocale(lang, '/docs/getting-started/installation');
}
