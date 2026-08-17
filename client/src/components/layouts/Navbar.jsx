import { Show, SignInButton, UserButton, useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import {
  LogInIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
} from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../store/cart";

export default function Navbar() {
  const { getToken, isSignedIn } = useAuth();
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiFetch("/api/user", { getToken }),
    enabled: isSignedIn,
  });

  const role = data?.user?.role;
  const cartCount = useCart((s) =>
    s.products.reduce((count, prod) => prod.quantity + count, 0),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 shadow-sm backdrop-blur-md flex justify-between items-center px-10">
      <Link to="/" className="flex items-center justify-center translate-y-1">
        <img src="logo.svg" alt="Nova logo" className="h-15" />
      </Link>
      <nav>
        <div className="flex gap-8 items-center">
          <Link className="nav-item">
            <ShoppingBagIcon /> Shop
          </Link>
          <Show when={"signed-in"}>
            <Link className="nav-item">
              <PackageIcon /> Orders
            </Link>
            {role === "admin" && (
              <Link className="nav-item">
                <SettingsIcon /> Admin
              </Link>
            )}
            <Link className="nav-item relative">
              <ShoppingCartIcon /> Cart{" "}
              {cartCount > 0 ? (
                <span className="px-2 py-1 font-sans text-xs bg-(--color-blue) text-white rounded-full absolute -top-4.5 -right-5">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              ) : null}
            </Link>
            <div className="flex items-center gap-2 border-l border-base-300 pl-3">
              <UserButton
                appearance={{
                  elements: { avatarBox: "h-10 w-10 ring-2 ring-base-300" },
                }}
              />
              {role === "support" || role === "admin" ? (
                <span className="btn-primary">{role}</span>
              ) : null}
            </div>
          </Show>

          <Show when={"signed-out"}>
            <SignInButton mode="modal">
              <button
                type="button"
                className="btn btn-primary btn-sm gap-1.5 px-3 shadow-md"
              >
                <LogInIcon className="size-4 drop-shadow-sm" aria-hidden />
                Sign in
              </button>
            </SignInButton>
          </Show>
        </div>
      </nav>
    </header>
  );
}
