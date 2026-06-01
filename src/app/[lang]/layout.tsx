import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@shared/ui/sonner';
import { Header } from '@widgets/header';
import { Footer } from '@widgets/footer';
import { getDictionary, hasLocale, locales } from '@shared/dictionaries';
import type { Locale } from '@shared/dictionaries';
import '../globals.css';

const geist = Geist({ subsets: ['latin'] });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={geist.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Header
              logoAlt={dict.header.logoAlt}
              navLabels={dict.nav}
              lang={locale}
            />
            <main className="flex-1">{children}</main>
            <Footer labels={dict.footer} />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
