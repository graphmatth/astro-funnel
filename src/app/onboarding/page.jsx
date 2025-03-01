'use client';
import AstroLayout from '../AstroLayout';

export default function Page({ children }) {
  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <AstroLayout>{children}</AstroLayout>
    </div>
  );
}
