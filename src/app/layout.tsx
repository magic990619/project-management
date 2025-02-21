'use client';

import './globals.css';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Sidebar from '../components/Sidebar';
import { ProjectProvider } from '../context/ProjectContext';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Identify the current path
  const pathname = usePathname();

  // If on home screen "/", do not show the sidebar
  const showSidebar = pathname !== '/';
  return (
    <html lang="en">
      <head>
        <title>Project Management App</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <ProjectProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <div className="flex min-h-screen">
                {showSidebar && <Sidebar />}
                <main className="flex-1 p-4">{children}</main>
              </div>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
