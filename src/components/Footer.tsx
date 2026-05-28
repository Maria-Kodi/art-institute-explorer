export default function Footer() {
  return (
    <footer
      className="mt-24 py-10"
      style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* left */}
        <div>
          <h3
            className="text-sm font-normal tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif", color: "#f0e8d8" }}
          >
            Art Institute Explorer
          </h3>
          <p className="text-xs mt-1 opacity-45" style={{ color: "#e8e0d0" }}>
            A curated digital art experience powered by React and TypeScript
          </p>
        </div>

        {/* center */}
        <div className="flex items-center gap-3 text-xs opacity-55" style={{ color: "#c9a84c" }}>
          <div className="h-px w-8" style={{ background: "#c9a84c" }} />
          <span className="tracking-widest uppercase">Data from Art Institute of Chicago API</span>
          <div className="h-px w-8" style={{ background: "#c9a84c" }} />
        </div>

        {/* right */}
        <div className="text-xs opacity-45" style={{ color: "#e8e0d0" }}>
          © {new Date().getFullYear()} All rights reserved
        </div>

      </div>
    </footer>
  );
}