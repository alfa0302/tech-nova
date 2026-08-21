import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Fast & free delivery",
    description: "Free delivery on orders over $75.",
  },
  {
    icon: ShieldCheck,
    title: "Secure shopping",
    description: "Your payments and information stay protected.",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description: "Changed your mind? Returns are simple.",
  },
];

export default function Benefits() {
  return (
    <section className="flex items-center justify-center bg-white">
      <div className=" max-w-7xl  grid w-full divide-y divide-black/10 px-4 py-10 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="flex gap-4 py-5 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              <Icon size={22} strokeWidth={1.5} className="mt-0.5 shrink-0" />

              <div>
                <h3 className="font-medium">{benefit.title}</h3>

                <p className="mt-1 text-sm leading-5 text-black/50">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
