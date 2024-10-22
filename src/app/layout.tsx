import '@/styles/globals.css';
import '@/styles/_override.scss';
import 'remixicon/fonts/remixicon.css';
import type { Metadata, Viewport } from 'next';
import { Nunito } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ThemeProvider } from '@/_shared/theme-provider';

export const metadata: Metadata = {
  title: 'DMP',
  description: 'Simple Next App',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
};

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="max-w-[100vw]">
      <body className={nunito.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="dmp-theme-key"
          disableTransitionOnChange
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
