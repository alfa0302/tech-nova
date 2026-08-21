import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Package,
  Truck,
} from "lucide-react";

const orders = [
  {
    id: "#NX-10482",
    date: "Aug 14, 2026",
    status: "Delivered",
    items: [
      {
        name: "AirPods Pro",
        quantity: 1,
        price: 249,
        image:
          "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=85",
      },
      {
        name: "Wireless Charger",
        quantity: 1,
        price: 69,
        image:
          "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=500&q=85",
      },
    ],
    total: 318,
  },
  {
    id: "#NX-10451",
    date: "Aug 09, 2026",
    status: "In transit",
    items: [
      {
        name: "Apple Watch",
        quantity: 1,
        price: 399,
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=85",
      },
    ],
    total: 399,
  },
  {
    id: "#NX-10398",
    date: "Jul 28, 2026",
    status: "Delivered",
    items: [
      {
        name: "Portable Speaker",
        quantity: 1,
        price: 129,
        image:
          "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=85",
      },
    ],
    total: 129,
  },
];

const statusStyles = {
  Delivered: "bg-[#e5f1e8] text-[#376044]",
  "In transit": "bg-[#edf0f5] text-[#45546a]",
  Processing: "bg-[#f4ead8] text-[#806331]",
};

export default function Orders() {
  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#171717]">
      {/* PAGE HEADER */}
      <section className="mx-auto max-w-[1200px] px-4 pb-12 pt-10 sm:px-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-black/40">
          Your account
        </p>

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-5xl font-semibold tracking-[-0.06em]">
              Your orders.
            </h1>

            <p className="mt-4 text-sm text-black/50">
              Keep track of your purchases and deliveries.
            </p>
          </div>

          <button className="flex w-fit items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
            Continue shopping
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      {/* ORDERS */}
      <section className="mx-auto max-w-[1200px] px-4 pb-20 sm:px-6">
        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              {/* ORDER TOP */}
              <div className="flex flex-col gap-4 border-b border-black/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-black/35">
                      Order
                    </p>

                    <p className="mt-1 text-sm font-medium">{order.id}</p>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-black/35">
                      Placed
                    </p>

                    <p className="mt-1 text-sm">{order.date}</p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-sm font-medium">${order.total}</p>
              </div>

              {/* ORDER CONTENT */}
              <div className="px-5 py-5 sm:px-7">
                <div className="flex flex-col gap-5">
                  {order.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-20 overflow-hidden rounded-xl bg-[#f5f5f2]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div>
                          <h2 className="text-sm font-medium">{item.name}</h2>

                          <p className="mt-1 text-xs text-black/40">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-medium">${item.price}</p>
                    </div>
                  ))}
                </div>

                {/* ORDER ACTIONS */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-black/10 pt-5">
                  {order.status === "In transit" && (
                    <button className="flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white">
                      <Truck size={14} />
                      Track package
                    </button>
                  )}

                  {order.status === "Delivered" && (
                    <button className="flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white">
                      <Check size={14} />
                      Buy again
                    </button>
                  )}

                  <button className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-xs font-medium transition hover:bg-black/5">
                    View order
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DELIVERY INFO */}
      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-4 py-8 sm:px-6">
          <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f5f5f2]">
            <Package size={19} />
          </div>

          <div>
            <h3 className="text-sm font-medium">Need help with an order?</h3>

            <p className="mt-1 text-xs text-black/45">
              Our support team is available to help with deliveries, returns and
              refunds.
            </p>
          </div>

          <button className="ml-auto hidden items-center gap-1 text-xs font-medium sm:flex">
            Contact support
            <ArrowUpRight size={14} />
          </button>
        </div>
      </section>
    </main>
  );
}
