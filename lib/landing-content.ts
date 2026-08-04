import { withLocale } from './i18n';

export type Feature = { icon: string; title: string; description: string };

export type Landing = {
  hero: { title: string; subtitle: string; primaryCta: string; githubCta: string; telegramCta: string };
  featuresTitle: string;
  features: Feature[];
  quickStart: { title: string; description: string; code: string };
  screenshotsTitle: string;
  footer: { docs: string; github: string; telegram: string; note: string };
};

const QUICK_START_CODE = `git clone https://github.com/snoups/remnashop.git
cd remnashop
cp .env.example .env
docker compose -f docker-compose.prod.internal.yml up -d`;

const ru: Landing = {
  hero: {
    title: 'Telegram-бот для продажи VPN-подписок',
    subtitle:
      'remnashop работает поверх Remnawave: принимает оплату, выдаёт доступ и ведёт клиента от первого запуска до продления.',
    primaryCta: 'Документация',
    githubCta: 'GitHub',
    telegramCta: 'Telegram',
  },
  featuresTitle: 'Возможности',
  features: [
    {
      icon: 'Network',
      title: 'Интеграция с Remnawave',
      description: 'Выдача и отзыв доступа синхронизированы с панелью Remnawave.',
    },
    {
      icon: 'CreditCard',
      title: '13 платёжных шлюзов',
      description: 'Telegram Stars, YooKassa, Cryptomus, CryptoPay и другие — из коробки.',
    },
    {
      icon: 'CalendarClock',
      title: 'Подписки и триалы',
      description: 'Пробный период, продление и льготный период после окончания оплаты.',
    },
    {
      icon: 'Users',
      title: 'Реферальная программа',
      description: 'Приглашения с вознаграждением за приведённых пользователей.',
    },
    {
      icon: 'LayoutDashboard',
      title: 'Веб-кабинет',
      description: 'Личный кабинет с подпиской, устройствами и историей платежей.',
    },
    {
      icon: 'Languages',
      title: 'Мультиязычность',
      description: 'Интерфейс бота вынесен в переводы и расширяется новыми языками.',
    },
  ],
  quickStart: {
    title: 'Быстрый старт',
    description: 'Четыре команды — и бот поднят на вашем сервере.',
    code: QUICK_START_CODE,
  },
  screenshotsTitle: 'Как это выглядит',
  footer: {
    docs: 'Документация',
    github: 'GitHub',
    telegram: 'Telegram',
    note: 'Открытый исходный код, лицензия MIT',
  },
};

const en: Landing = {
  hero: {
    title: 'A Telegram bot for selling VPN subscriptions',
    subtitle:
      'remnashop runs on top of Remnawave: it takes payments, grants access, and guides the customer from first launch to renewal.',
    primaryCta: 'Documentation',
    githubCta: 'GitHub',
    telegramCta: 'Telegram',
  },
  featuresTitle: 'Features',
  features: [
    {
      icon: 'Network',
      title: 'Remnawave integration',
      description: 'Granting and revoking access stays in sync with the Remnawave panel.',
    },
    {
      icon: 'CreditCard',
      title: '13 payment gateways',
      description: 'Telegram Stars, YooKassa, Cryptomus, CryptoPay and more, out of the box.',
    },
    {
      icon: 'CalendarClock',
      title: 'Subscriptions and trials',
      description: 'Trial periods, renewals, and a grace period once payment lapses.',
    },
    {
      icon: 'Users',
      title: 'Referral program',
      description: 'Invitations that reward users for everyone they bring in.',
    },
    {
      icon: 'LayoutDashboard',
      title: 'Web cabinet',
      description: 'A personal dashboard with subscription, devices, and payment history.',
    },
    {
      icon: 'Languages',
      title: 'Multilingual',
      description: 'All bot copy lives in translation files and extends to new languages.',
    },
  ],
  quickStart: {
    title: 'Quick start',
    description: 'Four commands and the bot is running on your server.',
    code: QUICK_START_CODE,
  },
  screenshotsTitle: 'What it looks like',
  footer: {
    docs: 'Documentation',
    github: 'GitHub',
    telegram: 'Telegram',
    note: 'Open source, MIT licensed',
  },
};

export function getLanding(lang: string) {
  return lang === 'en' ? en : ru;
}

export function getDocsHref(lang: string) {
  return withLocale(lang, '/docs');
}
