import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { centsToAED } from "../../utils/helper";
import HomeProducts from "../suspense/HomeProducts";
import { Link } from "react-router";

export default function FeaturedProducts({ products, loadingList }) {
  return (
    <section className="bg-white">
      <div className="section-padding">
        <div className="section-header">
          <div>
            <p className="section-label">Curated collection</p>
            <h2 className="section-heading">Featured gadgets.</h2>
          </div>
          <Link className="section-nav-button" to="/shop">
            Shop all
            <ArrowUpRight size={17} />
          </Link>
        </div>
        {loadingList ? (
          <HomeProducts />
        ) : (
          <div className="grid gap-6 md:grid-cols-4">
            {products.map((product) => (
              <Link to={`/product/${product.slug}`}>
                <article key={product.name} className="group relative">
                  <div className="relative overflow-hidden rounded-md bg-[#f3f3f0]">
                    <img
                      src="https://www.sigmaphoto.com/media/catalog/product/cache/10dc60829a207102a24eaa4dc5ab5500/f/p/fp_kit_img01.png"
                      alt={product.name}
                      className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <span className="grid size-10 place-items-center rounded-full bg-black text-white transition-all duration-300  absolute right-5 top-5">
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <div className="flex items-start justify-between pt-4 absolute bottom-5 left-5">
                    <div>
                      <p className="section-label">{product.category}</p>
                      <h3 className="mt-1 font-medium">{product.name}</h3>
                      {/* <p className="mt-1 font-medium">
                    {centsToAED(product.priceCents)}
                  </p> */}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
