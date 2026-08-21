import React from "react";

export default function HomeProducts() {
  return (
    <section className="bg-white">
      <div className="section-padding">
        <div className="section-header">
          <div>
            <div className="h-3 w-32 animate-pulse rounded bg-black/10" />
            <div className="mt-3 h-9 w-52 animate-pulse rounded bg-black/10" />
          </div>

          <div className="h-10 w-24 animate-pulse rounded bg-black/10" />
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="h-80 rounded-md bg-black/10" />

              <div className="pt-4">
                <div className="h-2.5 w-20 rounded bg-black/10" />
                <div className="mt-2 h-5 w-32 rounded bg-black/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
