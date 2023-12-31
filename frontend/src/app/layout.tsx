import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PostsProvider from '@/contexts/PostsProvider';
import UserProvider from '@/contexts/UserProvider';
import LayoutHeader from '@/components/layout/LayoutHeader';
import LayoutFooter from '@/components/layout/LayoutFooter';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'All Tech',
  description: 'Blog de tecnologia voltado ao segmento de desenvolvimento de softwares e aplicações.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <UserProvider>
          <PostsProvider>
            <LayoutHeader />
            {children}
            <LayoutFooter />
          </PostsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
