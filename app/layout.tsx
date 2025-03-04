import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provder';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryProvider } from '@/app/providers';

const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900',
});
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900',
});

export const metadata: Metadata = {
   title: 'Linkkistl',
   description: 'Save them all.',
};

export default function RootLayout({
                                      children,
                                   }: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning={true}>
      <body
         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ReactQueryProvider>
         <SessionProvider>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               {children}
            </ThemeProvider>
         </SessionProvider>
      </ReactQueryProvider>
      </body>
      </html>
   );
}
