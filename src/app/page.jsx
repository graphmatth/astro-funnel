'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { logEvent } from '@/lib/amplitude';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/common/Button';

export default function Home() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    logEvent('PAGE_VIEW', { page: 'HOME' });

    if (canceled === 'true') {
      logEvent('CHECKOUT_QUIT');
    }
  }, []);

  return (
    <div className="grid min-h-dvh grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 text-center sm:items-start">
        <h1 className="text-2xl md:text-3xl">Discover Your Cosmic Journey</h1>
        <Button asChild>
          <Link
            className="bg-foreground mx-auto text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid px-4 text-sm sm:h-12 sm:min-w-44 sm:px-5 sm:text-base"
            href="onboarding"
          >
            Let&apos;s go
          </Link>
        </Button>
      </main>
    </div>
  );
}
