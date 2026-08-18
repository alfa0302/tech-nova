import { ArrowUpRight } from "lucide-react";

const categoryImages = {
  Audio:
    "https://images.openai.com/static-rsc-4/g79RRQkYn95QzUBx-SYBu9Km6DGs7aaNLNz5xLirIysYPc5b6w6vE-e7kf7YEoNrhDa8fcIM4lRU1yCcz2Pt1KrCj6rcG1tOhMBH5IiaANacdDmva3VaFkT5G6qSp6syme9BhNRFaIOybX4-7LQmGJo6Ti-rYhiC4flMFnZRrJZYzm6XKcqbheMn2qSC-e64?purpose=fullsize",

  Accessories:
    "https://images.openai.com/static-rsc-4/FmQcMH-6dcgu_ArN-C3L0GD-VZW9XxkXzXNi_akq_QH_F0jKnpdVESu-Wx-YwXW7dTkQCjOTf14rfZPB3kNm0FjVEY0cGhFqdE2lEe2Wnvje1Koiqk1dXUOolbfns-uEQP3UvJRuv27JUtZWEZF_xCTPVlpmKSp1EWenuw9L7-ww-1NL7ROdziZSrudrqA2M?purpose=fullsize",

  Cameras:
    "https://images.openai.com/static-rsc-4/mM-DQ6mn6pthmIC-vxSn_L800M_TcIKix0GLDHOVgIgtKr8dALPE7LHiDdY9Dujf8lnniS2gY0sQSJAbMWujkLMlaI5xpin7OJmASiHulds-S_LC7_6fbbymGm8suMAoUQLtPgj1InQQRp1YmTVaO4EhtCsrPc3_tnxTeenii32estUzrFP7_Jz9139uCjD8?purpose=fullsize",
};

export default function Categories({ categories, loadingCategories }) {
  if (loadingCategories) {
    return (
      <section className="mx-auto max-w-[1500px] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="h-3 w-24 animate-pulse rounded bg-black/10" />

          <div className="mt-3 h-10 w-80 animate-pulse rounded bg-black/10" />
        </div>

        <div className="grid h-[520px] grid-cols-2 gap-3">
          <div className="animate-pulse rounded-2xl bg-black/10" />

          <div className="grid grid-rows-2 gap-3">
            <div className="animate-pulse rounded-2xl bg-black/10" />
            <div className="animate-pulse rounded-2xl bg-black/10" />
          </div>
        </div>
      </section>
    );
  }

  const featuredCategories = categories?.slice(0, 3) || [];

  return (
    <section className="section-padding bg-white">
      <div className="section-header">
        <div>
          <p className="section-label">Categories</p>

          <h2 className="section-heading">Find your next favorite.</h2>
        </div>

        <a href="/shop" className="section-nav-button">
          View all
          <ArrowUpRight size={17} />
        </a>
      </div>

      <div className="flex flex-wrap gap-2 justify-start">
        {categories.map((category, index) => (
          <a href="/shop" key={`${category}-${index}`} className="btn-label">
            {category}
          </a>
        ))}
      </div>

      <div className="mt-6 grid h-130 grid-cols-2 gap-3">
        {featuredCategories[0] && (
          <a
            href="/shop"
            className="group relative overflow-hidden rounded-2xl bg-black"
          >
            <img
              src={
                categoryImages[featuredCategories[0]] ||
                "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85"
              }
              alt={featuredCategories[0]}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white sm:bottom-8 sm:left-8 sm:right-8">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.15em] text-white/50">
                  Explore
                </p>

                <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                  {featuredCategories[0]}
                </h3>
              </div>

              <span className="grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </a>
        )}

        <div className="grid grid-rows-2 gap-3">
          {featuredCategories.slice(1, 3).map((category) => (
            <a
              href="/shop"
              key={category}
              className="group relative overflow-hidden rounded-2xl bg-black"
            >
              <img
                src={
                  categoryImages[category] ||
                  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85"
                }
                alt={category}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white sm:bottom-6 sm:left-6 sm:right-6">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.15em] text-white/50">
                    Explore
                  </p>

                  <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                    {category}
                  </h3>
                </div>

                <span className="grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
