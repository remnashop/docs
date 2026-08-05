import { withLocale } from './i18n';

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type Landing = {
  hero: { title: string; subtitle: string; primaryCta: string; githubCta: string; telegramCta: string };
  featuresTitle: string;
  features: Feature[];
  quickStart: {
    title: string;
    description: string;
    docsCta: string;
    steps: { title: string; hint?: string; code?: string }[];
  };
  screenshotsTitle: string;
  footer: { github: string; telegram: string; note: string };
};

const ru: Landing = {
  hero: {
    title: 'Готовая платформа для продажи VPN-подписок',
    subtitle:
      'Автоматизируйте приём платежей, выдачу VPN-доступа и управление клиентами через веб-приложение или Telegram-бота.',
    primaryCta: 'Документация',
    githubCta: 'GitHub',
    telegramCta: 'Telegram',
  },
  featuresTitle: 'Возможности',
  features: [
    {
      icon: 'Network',
      title: 'Интеграция с Remnawave',
      description: 'Любые изменения автоматически синхронизируются с панелью Remnawave в обе стороны.',
    },
    {
      icon: 'CreditCard',
      title: '13 платёжных шлюзов',
      description: 'Telegram Stars, YooKassa, Cryptomus, CryptoPay и другие — доступны из коробки.',
    },
    {
      icon: 'CalendarClock',
      title: 'Подписки и триалы',
      description: 'Пробный период, продление и льготный период после окончания подписки.',
    },
    {
      icon: 'Users',
      title: 'Реферальная программа',
      description: 'Вознаграждения за приглашённых пользователей, учёт начислений и аналитика.',
    },
    {
      icon: 'LayoutDashboard',
      title: 'Веб-кабинет',
      description: 'Личный кабинет с информацией о подписке, устройствах и истории платежей.',
    },
    {
      icon: 'Languages',
      title: 'Мультиязычность',
      description: 'Простое редактирование переводов и поддержка нескольких языков.',
    },
  ],
  quickStart: {
    title: 'Быстрый старт',
    description: 'Всего три шага до развёртывания на вашем сервере.',
    docsCta: 'Полная инструкция по установке',
    steps: [
      {
        title: 'Скачать конфигурацию',
        code: `mkdir -p /opt/remnashop && cd /opt/remnashop
curl -o .env https://raw.githubusercontent.com/snoups/remnashop/refs/heads/main/.env.example
curl -o docker-compose.yml https://raw.githubusercontent.com/snoups/remnashop/refs/heads/main/docker-compose.prod.internal.yml`,
      },
      {
        title: 'Заполнить .env',
        hint: 'Домен, токен бота из BotFather, ID владельца и доступ к панели Remnawave.',
      },
      {
        title: 'Запустить',
        code: 'docker compose up -d && docker compose logs -f -t',
      },
    ],
  },
  screenshotsTitle: 'Как это выглядит',
  footer: {
    github: 'GitHub',
    telegram: 'Telegram',
    note: 'Открытый исходный код, лицензия MIT',
  },
};

const en: Landing = {
  hero: {
    title: 'A ready-made platform for selling VPN subscriptions',
    subtitle:
      'Automate payments, VPN access and customer management through a web app or a Telegram bot.',
    primaryCta: 'Documentation',
    githubCta: 'GitHub',
    telegramCta: 'Telegram',
  },
  featuresTitle: 'Features',
  features: [
    {
      icon: 'Network',
      title: 'Remnawave integration',
      description: 'Any change syncs with the Remnawave panel automatically, in both directions.',
    },
    {
      icon: 'CreditCard',
      title: '13 payment gateways',
      description: 'Telegram Stars, YooKassa, Cryptomus, CryptoPay and more — available out of the box.',
    },
    {
      icon: 'CalendarClock',
      title: 'Subscriptions and trials',
      description: 'Trial period, renewals and a grace period after the subscription ends.',
    },
    {
      icon: 'Users',
      title: 'Referral program',
      description: 'Rewards for invited users, payout tracking and analytics.',
    },
    {
      icon: 'LayoutDashboard',
      title: 'Web cabinet',
      description: 'A personal dashboard with subscription details, devices and payment history.',
    },
    {
      icon: 'Languages',
      title: 'Multilingual',
      description: 'Straightforward translation editing and support for several languages.',
    },
  ],
  quickStart: {
    title: 'Quick start',
    description: 'Just three steps to deploy on your server.',
    docsCta: 'Full installation guide',
    steps: [
      {
        title: 'Download the configuration',
        code: `mkdir -p /opt/remnashop && cd /opt/remnashop
curl -o .env https://raw.githubusercontent.com/snoups/remnashop/refs/heads/main/.env.example
curl -o docker-compose.yml https://raw.githubusercontent.com/snoups/remnashop/refs/heads/main/docker-compose.prod.internal.yml`,
      },
      {
        title: 'Fill in .env',
        hint: 'Domain, the bot token from BotFather, the owner ID and access to the Remnawave panel.',
      },
      {
        title: 'Start it',
        code: 'docker compose up -d && docker compose logs -f -t',
      },
    ],
  },
  screenshotsTitle: 'What it looks like',
  footer: {
    github: 'GitHub',
    telegram: 'Telegram',
    note: 'Open source, MIT licensed',
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
