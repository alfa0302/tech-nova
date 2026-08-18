import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="section-padding">
        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              <Logo fill="white" className="h-12" logoClass="h-20" />
            </h2>

            <p className="text-sm text-white/40">
              Simple products. Better choices.
            </p>
          </div>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Nova. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
