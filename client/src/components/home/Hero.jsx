import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="px-4 pt-4 sm:px-6 lg:px-8 w-screen h-screen">
      <div className="relative mx-auto overflow-hidden rounded-2xl mt-12 h-[90vh]">
        <img
          src="https://images.openai.com/static-rsc-4/mk46jmg6if6vLkhpNp-zJLUXsk8n9M_3Gn_5_81fM-jT79hOKMgfPlbCghqvzz5jdp7ZbLnQo3-le751PMuFXuV5Ud0--MTpehw-ynxNH9bTktS36w9pxU4SAz4b2al99JcTWWc_QX9At5fxixmcunXF91ELUk41nFGatTO_sO8MpUDVeuVeSoUawZ8jXUX7?purpose=fullsize"
          alt="Modern smartphone"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-transparent" />

        <div className="relative flex items-center px-7 py-20 sm:px-12 lg:px-20">
          <div className="max-w-2xl text-white">
            <div className="mb-6  text-xs uppercase tracking-[0.2em] font-semibold">
              Smart tech. Better living.
            </div>

            <h1 className="text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-6xl lg:text-8xl">
              Technology
              <br />
              that fits
              <br />
              your everyday.
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-6 text-white sm:text-base">
              Thoughtfully selected gadgets designed to make everyday life
              smarter, simpler and more connected.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button className="btn-white group">
                Shop collection
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <button className="btn-black group">Explore gadgets</button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 hidden w-72 rounded-2xl border border-white/20 bg-white/10 p-3 text-white shadow-2xl backdrop-blur-xl lg:block">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85"
              alt="Wireless earbuds"
              className="h-36 w-full object-cover"
            />

            <div className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-black backdrop-blur-md">
              Trending
            </div>
          </div>

          <div className="flex items-center justify-between px-1 pt-3">
            <div>
              <p className="text-xs text-white/50">Wireless Audio</p>
              <p className="mt-1 text-sm font-medium">AirPods Pro</p>
            </div>

            <p className="text-sm font-medium">$249</p>
          </div>
        </div>
      </div>
    </section>
  );
}
