import Link from "next/link";
import { isIOS } from "react-device-detect";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-dvh p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center">
        <h1 className="text-2xl md:text-3xl">Discover Your Cosmic Journey</h1>
        {!isIOS ? (
        <section className="p-3.5 rounded-4xl">
          <h2 className="text-2xl md:text-3xl mb-3 mt-4" >Do you have an Iphone? 👀</h2>
          <div className="flex gap-4 items-center flex-row justify-center">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 px-4 sm:px-5 sm:min-w-44"
              href="onboarding"
              >
              YES
            </Link>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent h-10 text-sm sm:text-base  px-4 sm:px-5 sm:min-w-44"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdCjLvk05TYaZm_GCiBbIlvQxcvqgTp_arMdwmDVTj-BT-PmQ/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              >
              NO
            </a>
          </div>
        </section>

        ) : (<Link
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        href="onboarding"
        >
        Let&apos;s go
  </Link>)}

      </main>
    </div>
  );
}
