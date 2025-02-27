'use client';
import AstroLayout from "../AstroLayout";


export default function Page({ children }) {

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
        <AstroLayout>
            {children}
        </AstroLayout>
    </div>
  );
}