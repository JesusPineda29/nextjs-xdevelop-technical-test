'use client';

import './styles.css';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from '@/components/Navigation';
import AuthInitializer from '@/components/AuthInitializer';
import { Toaster } from 'sonner';
import { useState } from 'react';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0, // Always refetch
        retry: 1,
      },
    },
  }));

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthInitializer />         
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster theme="light" />
        </QueryClientProvider>
      </body>
    </html>
  );
} 