import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import ArtworkCard from "./components/ArtworkCard";
import { searchArtworks } from "./api/artworks";
import type { Artwork } from "./schemas/artwork.schema";
import { useGallery } from "./hooks/useGallery";
import Footer from "./components/Footer";

const HERO_ARTWORK_IDS = [27992, 28560, 14655, 16487, 20684];

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroImg, setHeroImg] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { gallery, addArtwork } = useGallery();

  useEffect(() => {
    const randomId = HERO_ARTWORK_IDS[Math.floor(Math.random() * HERO_ARTWORK_IDS.length)];
    fetch(`https://api.artic.edu/api/v1/artworks/${randomId}?fields=image_id`)
      .then((r) => r.json())
      .then((data) => {
        const imageId = data?.data?.image_id;
        if (imageId) {
          setHeroImg(`https://www.artic.edu/iiif/2/${imageId}/full/1686,/0/default.jpg`);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSearch(query: string) {
    setLoading(true);
    try {
      const data = await searchArtworks(query);
      setArtworks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0f0e0d", minHeight: "100vh", color: "#e8e0d0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />

      <div ref={heroRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          inset: "-20%",
          backgroundImage: heroImg ? `url(${heroImg})` : "none",
          backgroundColor: "#1a1410",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.4}px)`,
          willChange: "transform",
          filter: "brightness(0.45)",
          transition: "background-image 0.8s ease",
        }} />

        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "50%",
          background: "linear-gradient(to bottom, transparent, #0f0e0d)",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          gap: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: 60, height: 1, background: "#c9a84c", opacity: 0.6 }} />
            <span style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", opacity: 0.8 }}>
              Chicago · Est. 1879
            </span>
            <div style={{ width: 60, height: 1, background: "#c9a84c", opacity: 0.6 }} />
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "#f5ede0",
            margin: 0,
            textShadow: "0 2px 40px rgba(0,0,0,0.5)",
          }}>
            Art Institute
            <span style={{ display: "block", fontStyle: "italic", color: "#c9a84c" }}>
              Explorer
            </span>
          </h1>

          <p style={{ maxWidth: 480, fontSize: 15, lineHeight: 1.7, color: "#e8e0d0", opacity: 0.6, margin: 0 }}>
            Discover timeless masterpieces from one of the world's greatest art collections.
            Search, save, and build your personal museum.
          </p>

          {gallery.length > 0 && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 18px", borderRadius: 999,
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#c9a84c", fontSize: 12,
              letterSpacing: "0.15em", textTransform: "uppercase",
              background: "rgba(201,168,76,0.07)",
            }}>
              ✦ {gallery.length} {gallery.length === 1 ? "artwork" : "artworks"} saved
            </div>
          )}

          <div style={{ width: "100%", maxWidth: 560, marginTop: 8 }}>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div style={{
            position: "absolute", bottom: "2.5rem",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            opacity: 0.4, animation: "bounce 2s infinite",
          }}>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c" }}>scroll</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 9l5 5 5-5" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "3rem", opacity: 0.2 }}>
          <div style={{ flex: 1, height: 1, background: "#c9a84c" }} />
          <span style={{ color: "#c9a84c", fontSize: 14 }}>✦</span>
          <div style={{ flex: 1, height: 1, background: "#c9a84c" }} />
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <div style={{
              width: 32, height: 32, margin: "0 auto 1rem",
              border: "2px solid rgba(201,168,76,0.2)",
              borderTopColor: "#c9a84c",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }} />
            <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.4 }}>
              Curating artworks...
            </p>
          </div>
        )}

        {!loading && artworks.length === 0 && (
          <div style={{ textAlign: "center", padding: "6rem 0" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.25 }}>
              Search for an artist, artwork, or style
            </p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
          {artworks.map((art) => (
            <ArtworkCard key={art.id} artwork={art} onAdd={addArtwork} />
          ))}
        </div>

        <Footer />
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}

export default App;