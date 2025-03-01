'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { isIOS } from 'react-device-detect';
import { logEvent } from '@/lib/amplitude';

export default function Home() {
  useEffect(() => {
    logEvent('PAGE_VIEW', { page: 'HOME' });
  }, []);

  return (
    <div className="grid min-h-dvh grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 text-center sm:items-start">
        <h1 className="text-2xl md:text-3xl">Discover Your Cosmic Journey</h1>
        {!isIOS ? (
          <section className="rounded-4xl p-3.5">
            <h2 className="mt-4 mb-3 text-2xl md:text-3xl">Do you have an Iphone? 👀</h2>
            <div className="flex flex-row items-center justify-center gap-4">
              <Link
                className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm transition-colors hover:bg-[#383838] sm:min-w-44 sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
                href="onboarding"
              >
                YES
              </Link>
              <a
                className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdCjLvk05TYaZm_GCiBbIlvQxcvqgTp_arMdwmDVTj-BT-PmQ/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
              >
                NO
              </a>
            </div>
          </section>
        ) : (
          <span>
            <Link
              className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm transition-colors hover:bg-[#383838] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
              href="onboarding"
            >
              Let&apos;s go
            </Link>
          </span>
        )}
      </main>
    </div>
  );
}
